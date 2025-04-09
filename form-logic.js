// form-logic.js
// Contains the JavaScript logic for the form (add/remove rows, PDF generation, language switching).
// Must be loaded AFTER translations.js and form-structure.js

// Assumes 'translations' object is globally available from translations.js
// Assumes jsPDF and html2canvas libraries are loaded

let currentLang = 'fr'; // Default language

/**
 * Adds a new row to the investment table.
 */
function addRow() {
    console.log("addRow called");
    const tableBody = document.getElementById('investissementTable')?.getElementsByTagName('tbody')[0];
    if (!tableBody) {
        console.error("Investment table body not found!");
        return;
    }
    const rowCount = tableBody.rows.length + 1; // Use tableBody.rows.length for accuracy
    const row = tableBody.insertRow(); // Insert into tbody

    // Get translations using optional chaining and providing fallbacks
    const placeholderDesignation = translations[currentLang]?.['inv_placeholder_designation'] || `Investment ${rowCount}`;
    const placeholderAmount = translations[currentLang]?.['inv_placeholder_amount'] || `Amount ${rowCount}`;
    const placeholderYear = translations[currentLang]?.['inv_placeholder_year'] || `Year ${rowCount}`;
    const deleteButtonText = translations[currentLang]?.['inv_delete'] || 'Remove';

    // Set innerHTML for the new row, ensuring the remove button has the 'btn' class
    row.innerHTML = `
        <td><input type="text" name="investissement_${rowCount}" data-placeholder-key="inv_placeholder_designation" placeholder="${placeholderDesignation}"></td>
        <td><input type="number" name="montant_${rowCount}" data-placeholder-key="inv_placeholder_amount" placeholder="${placeholderAmount}"></td>
        <td><input type="number" name="annee_${rowCount}" data-placeholder-key="inv_placeholder_year" placeholder="${placeholderYear}"></td>
        <td>
            <button type="button" class="remove-row-btn btn" onclick="removeRow(this)">${deleteButtonText}</button>
        </td>
    `;
}

/**
 * Removes the table row containing the clicked button.
 * @param {HTMLButtonElement} button - The remove button that was clicked.
 */
function removeRow(button) {
    console.log("removeRow called");
    const row = button.closest('tr'); // Find the closest parent table row
    if (row) {
        row.remove();
    } else {
        console.error("Could not find row to remove.");
    }
}

/**
 * Validates all required fields in the form.
 * Highlights invalid fields using CSS classes and shows an alert.
 * @returns {boolean} - True if the form is valid, false otherwise.
 */
function validateForm() {
    const form = document.getElementById('contactForm');
    if (!form) {
        console.error("Validation failed: Form element not found");
        return false;
    }
    const requiredInputs = form.querySelectorAll('[required]');
    let isValid = true;
    let firstInvalidElement = null;

    console.log(`Validating ${requiredInputs.length} required inputs.`);

    // --- Reset previous validation states ---
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    form.querySelectorAll('.group-error').forEach(el => el.classList.remove('group-error'));

    requiredInputs.forEach(input => {
        let isInputValid = true;
        let elementToFocus = input; // Default to the input itself

        if (input.type === 'checkbox' && input.name.endsWith('[]')) {
            const groupName = input.name;
            const groupContainer = input.closest('div[style*="flex-wrap"]'); // Find the container
            // Only validate the group once
            if (groupContainer && !groupContainer.dataset.validated) {
                 const checkedInGroup = form.querySelectorAll(`input[name="${groupName}"]:checked`).length > 0;
                 if (!checkedInGroup) {
                     isInputValid = false;
                     groupContainer.classList.add('group-error'); // Add error class to container
                     elementToFocus = groupContainer; // Focus the container or first checkbox
                     console.log(`Validation failed for checkbox group: ${groupName}`);
                 }
                 groupContainer.dataset.validated = true; // Mark as validated for this run
            } else if (!groupContainer) {
                 // Fallback if container not found - check individual checkbox (less ideal)
                 if (!input.checked && form.querySelectorAll(`input[name="${input.name}"]:checked`).length === 0) {
                     isInputValid = false;
                     // Cannot easily add class to label without more complex structure
                     console.log(`Validation failed for checkbox: ${input.value}`);
                 }
            } else {
                // Group already validated or checkbox is checked, do nothing here for this specific checkbox
                isInputValid = form.querySelectorAll(`input[name="${groupName}"]:checked`).length > 0;
            }

        } else if (!input.value.trim()) { // Check other required inputs
            isInputValid = false;
            input.classList.add('input-error'); // Add error class to input/textarea
            console.log(`Validation failed for input: ${input.name || input.type}`);
        }

        if (!isInputValid) {
            isValid = false;
            if (!firstInvalidElement) {
                firstInvalidElement = elementToFocus; // Track the first invalid element/group
            }
        }
    });

    // --- Cleanup validation markers for checkbox groups ---
    form.querySelectorAll('div[data-validated]').forEach(el => delete el.dataset.validated);

    // --- Handle validation outcome ---
    if (!isValid) {
        const errorMsg = translations[currentLang]?.['validation_error'] || 'Please fill in all required fields highlighted.';
        alert(errorMsg);
        if (firstInvalidElement) {
             firstInvalidElement.focus(); // Focus the first invalid field/group
             // Optionally scroll to it if it's off-screen
             // firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    console.log("Validation result:", isValid);
    return isValid;
}


/**
 * Generates a PDF from the form content using html2canvas and jsPDF,
 * then prompts the user to attach it to an email.
 */
function generatePDFandSubmit() {
    console.log("generatePDFandSubmit called");
    if (!validateForm()) {
        console.log("PDF generation stopped due to validation failure.");
        return; // Stop if validation fails
    }

    // Ensure libraries are loaded
    if (typeof window.jspdf === 'undefined' || typeof window.html2canvas === 'undefined') {
         console.error("jsPDF or html2canvas library not loaded!");
         alert("Error: Required PDF generation library not found.");
         return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    const form = document.getElementById('contactForm');
    const addButton = document.getElementById('addInvestmentBtn');
    const actionColumnHeader = form.querySelector('#investissementTable th:nth-child(4)'); // Action column header
    const actionColumnCells = form.querySelectorAll('#investissementTable td:nth-child(4)'); // Action column cells
    const bottomButtonContainer = document.querySelector('.form-actions'); // Use class selector

    if (!form) {
        console.error("Cannot generate PDF: Form element not found.");
        alert("An error occurred: Form element missing.");
        return;
    }

    // --- Store original display styles and hide elements NOT needed in PDF ---
    const elementsToHide = [addButton, actionColumnHeader, bottomButtonContainer, ...actionColumnCells];
    const originalDisplays = new Map();

    elementsToHide.forEach(el => {
        if (el) {
            originalDisplays.set(el, el.style.display); // Store original inline style
            el.style.setProperty('display', 'none', 'important');
        }
    });

    // --- Generate PDF ---
    console.log("Starting html2canvas...");
    html2canvas(form, {
        scale: 2,
        useCORS: true,
        logging: false, // Disable verbose logging unless debugging html2canvas itself
        windowWidth: form.scrollWidth,
        windowHeight: form.scrollHeight
     }).then(canvas => {
        console.log("html2canvas finished.");
        const imgData = canvas.toDataURL('image/png');
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth() - 20; // A4 width in mm minus margins
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        const pageHeight = doc.internal.pageSize.getHeight() - 20; // A4 height minus margins

        let heightLeft = pdfHeight;
        let position = 10; // Initial top margin

        doc.addImage(imgData, 'PNG', 10, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = position - pageHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 10, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;
        }

        console.log("PDF saving...");
        doc.save('formulaire_candidature.pdf');
        console.log("PDF saved.");

        // --- Restore hidden elements ---
        elementsToHide.forEach(el => {
            if (el) {
                el.style.display = originalDisplays.get(el) || ''; // Restore original or default
            }
        });

        // --- Prepare and open email client ---
        const subject = encodeURIComponent(translations[currentLang]?.['email_subject'] || 'Application Form');
        const body = encodeURIComponent(translations[currentLang]?.['email_body'] || 'Please find attached the completed application form.');
        const mailtoLink = `mailto:rodrigue.mengue@laregionalebank.com?subject=${subject}&body=${body}`;

        const alertMsg = translations[currentLang]?.['email_alert'] || 'The PDF has been generated. Please attach it manually to the email that will open.';
        alert(alertMsg);

        window.location.href = mailtoLink;

    }).catch(error => {
        console.error("Error generating PDF:", error);
        alert("An error occurred while generating the PDF. Please check the console for details.");

        // --- Restore hidden elements even if there's an error ---
         elementsToHide.forEach(el => {
            if (el) {
                el.style.display = originalDisplays.get(el) || ''; // Restore original or default
            }
        });
    });
}

/**
 * Switches the display language of the form based on the 'translations' object.
 */
function switchLanguage() {
    console.log("switchLanguage called. Current:", currentLang);
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    console.log("Switching to:", currentLang);

    // Update elements with data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        const translation = translations[currentLang]?.[key];
        if (translation !== undefined) {
            el.textContent = translation;
        } else {
            console.warn(`Translation key "${key}" not found for language "${currentLang}"`);
        }
    });

    // Update placeholders with data-placeholder-key
    document.querySelectorAll('[data-placeholder-key]').forEach(el => {
        const key = el.getAttribute('data-placeholder-key');
        const translation = translations[currentLang]?.[key];
        if (translation !== undefined) {
            el.placeholder = translation;
        } else {
             console.warn(`Placeholder key "${key}" not found for language "${currentLang}"`);
        }
    });

    // Update language switch button text
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        const switchKey = currentLang === 'fr' ? 'switch_to_en' : 'switch_to_fr';
        // Provide more explicit fallbacks for button text
        langBtn.textContent = translations[currentLang]?.[switchKey] || (currentLang === 'fr' ? 'Switch to english version' : 'Utiliser la version Française');
    }

    // Update dynamically added "Remove" button text
    document.querySelectorAll('#investissementTable .remove-row-btn').forEach(btn => {
        btn.textContent = translations[currentLang]?.['inv_delete'] || 'Remove';
    });

    // Note: "Add Investment" button text is handled by the [data-key] on its inner span

     console.log("Language switched to:", currentLang);
}

/**
 * Applies the translations for the given language.
 * @param {string} lang - The language code ('fr' or 'en').
 */
function applyTranslations(lang) {
    console.log(`Applying translations for: ${lang}`);
    currentLang = lang; // Set the current language

     // Update elements with data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        const translation = translations[currentLang]?.[key];
        if (translation !== undefined) {
            el.textContent = translation;
        } else {
            console.warn(`Translation key "${key}" not found for language "${currentLang}"`);
        }
    });

    // Update placeholders with data-placeholder-key
    document.querySelectorAll('[data-placeholder-key]').forEach(el => {
        const key = el.getAttribute('data-placeholder-key');
        const translation = translations[currentLang]?.[key];
        if (translation !== undefined) {
            el.placeholder = translation;
        } else {
             console.warn(`Placeholder key "${key}" not found for language "${currentLang}"`);
        }
    });

    // Update language switch button text
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        // Determine the text based on the *target* language (the one we just set)
        const switchKey = currentLang === 'fr' ? 'switch_to_en' : 'switch_to_fr';
        langBtn.textContent = translations[currentLang]?.[switchKey] || (currentLang === 'fr' ? 'Switch to english version' : 'Utiliser la version Française');
    }

    // Update dynamically added "Remove" button text
    document.querySelectorAll('#investissementTable .remove-row-btn').forEach(btn => {
        btn.textContent = translations[currentLang]?.['inv_delete'] || 'Remove';
    });
}


// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded. Initializing language.");
    if (typeof translations !== 'undefined') {
        // Apply the default language ('fr') translations directly on load
        applyTranslations('fr');
    } else {
        console.error("Translations object not found on DOMContentLoaded!");
        // Maybe display a default error message or disable language switching
    }
});
