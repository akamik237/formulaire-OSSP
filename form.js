document.getElementById("form-container").innerHTML = `
    <form>
        </tr>
        <table>
            <th><span data-key="company_name">Nom de l’Entreprise</span></th>
            <td><input type="text" name="nom_entreprise" placeholder="Entrez le nom de l'entreprise" required></td>
            </tr>
            <tr>
                <th><span data-key="legal_form">Forme juridique</span></th>
                <td><input type="text" name="forme_juridique" placeholder="Ex: SARL, SA, etc." required></td>
            </tr>
            <tr>
                <th><span data-key="sector_activity">Secteur d’activité</span></th>
                <td>
                    <div style="display: flex; gap: 20px;">
                        <label><input type="checkbox" name="secteur[]" value="Agriculture"> Agriculture</label>
                        <label><input type="checkbox" name="secteur[]" value="Élevage"> Élevage</label>
                        <label><input type="checkbox" name="secteur[]" value="Pêche & Aquaculture"> Pêche &Aquaculture</label>
                        <label><input type="checkbox" name="secteur[]" value="Agroalimentaire"> Agroalimentaire</label>
                        <label><input type="checkbox" name="secteur[]" value="Bois"> Bois</label>
                        <label><input type="checkbox" name="secteur[]" value="Numérique"> Numérique</label>
                    </div>
                </td>
            </tr>

            <tr>
                <th><span data-key="main_activity">Activité principale</span></th>
                <td><input type="text" name="activite_principale" placeholder="Décrivez votre activité principale"required></td>
            </tr>
            <tr>
                <th><span data-key="headquarters">Siège social / Zone d’activités</span></th>
                <td><input type="text" name="siege_social" placeholder="Adresse du siège social" required></td>
            </tr>
            <tr>
                <th><span data-key="creation_date">Date de création</span></th>
                <td><input type="date" name="date_creation" required></td>
            </tr>
            <tr>
                <th><span data-key="contact_address">Adresse / Contact</span></th>
                <td><input type="text" name="adresse_contact" placeholder="Adresse ou numéro de contact" required></td>
            <tr>
                <th><span data-key="number_of_employees">Nombre de salariés</span></th>
                <td>
                    <div style="display: flex; gap: 20px;">
                        <div>
                            <label data-key="per" >Permanent :</label>
                            <input type="number" name="nombre_salaries_permanent" placeholder="01, 2, 3, ..." required>
                        </div>
                        <div>
                            <label>Temporaires :</label>
                            <input type="number" name="nombre_salaries_temporaire" placeholder="01, 2, 3, ..." required>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <th><span data-key="revenue">Chiffre d'affaires (F CFA)</span></th>
                <td>
                    <div style="display: flex; gap: 20px;">
                        <div>
                            <label>2022 :</label>
                            <input type="number" name="chiffre_affaires_2022" placeholder="Chiffre d'affaires 2022"
                                required>
                        </div>
                        <div>
                            <label>2023 :</label>
                            <input type="number" name="chiffre_affaires_2023" placeholder="Chiffre d'affaires 2023"
                                required>
                        </div>
                        <div>
                            <label>2024 :</label>
                            <input type="number" name="chiffre_affaires_2024" placeholder="Chiffre d'affaires 2024"
                                required>
                        </div>
                    </div>
                </td>
            </tr>
            <th><span data-key="partner">Banques partenaires actuelles</span></th>
            <td><input type="text" name="banques_partenaires" placeholder="Nom des banques partenaires" required>
            </td>
            </tr>
            <tr>
             <th><span data-key="inv">Niveau d’investissements actuels<span></th>
                <td>
                    <table id="investissementTable">
                        <thead>
                            <tr>
                                <th>Désignation des investissements</th>
                                <th>Montant (F CFA)</th>
                                <th>Année d’acquisition</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" name="investissement_1" placeholder="Investissement 1"></td>
                                <td><input type="number" name="montant_1" placeholder="Montant 1"></td>
                                <td><input type="date" name="annee_1" placeholder="Année 1"></td>
                                <td><button type="button" onclick="removeRow(this)">Supprimer</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="submit-btn">
                        <button type="button" onclick="addRow()">Ajouter un investissement</button>
                    </div>
                </td>
            </tr>
            <tr>
                <th><span data-key="presentation_sector">Présentation du secteur d’activité et des contraintes<span></th>
                <td><textarea name="presentation_secteur" placeholder="Décrivez le secteur et ses contraintes"
                 required></textarea></td>
            </tr>
            <tr>
                <th><span data-key="justification">Justification du besoin<span></th>
                <td><textarea name="justification_besoin" placeholder="Expliquez le besoin" required></textarea></td>
            </tr>
            <tr>
                <th><span data-key="presentation_customer">Présentation du portefeuille clients<span></th>
                <td><textarea name="presentation_clients" placeholder="Décrivez votre portefeuille clients" required></textarea></td>
            </tr>
            <tr>
                <th><span data-key="presentation_supply">Présentation du portefeuille fournisseurs <span></th>
                <td><textarea name="presentation_fournisseurs" placeholder="Décrivez votre portefeuille fournisseurs" required></textarea></td>
            </tr>
            <tr>
                <th><span data-key="comments">Commentaires<span> </th>
                <td><textarea name="commentaires" placeholder="D'autres remarques ou commentaires"></textarea></td>
            </tr>
        </table>
    </form>

    <div class="submit-btn">
        <button type="button" onclick="generatePDFandSubmit()"> <span data-key="download_submit">Télécharger et Soumettre ma candidature</button>
    </div>
`;

// JavaScript logic (génération PDF, ajout/suppression de lignes, changement langue)
function addRow() {
    const table = document.getElementById('investissementTable').getElementsByTagName('tbody')[0];
    const rowCount = table.rows.length + 1;
    const row = table.insertRow();
    row.innerHTML = `
        <td><input type="text" name="investissement_${rowCount}" placeholder="Investissement ${rowCount}"></td>
        <td><input type="number" name="montant_${rowCount}" placeholder="Montant ${rowCount}"></td>
        <td><input type="date" name="annee_${rowCount}" placeholder="Année ${rowCount}"></td>
        <td><button type="button" onclick="removeRow(this)">Supprimer</button></td>
    `;
}

function removeRow(button) {
    const row = button.closest('tr');
    row.remove();
}

function generatePDFandSubmit() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    const addButton = document.querySelector('button[onclick="addRow()"]');
    const downButton = document.querySelector('button[onclick="generatePDFandSubmit()"]');
    const actionColumn = document.querySelectorAll('#investissementTable th:nth-child(4), #investissementTable td:nth-child(4)');

    actionColumn.forEach(cell => cell.style.display = 'none');
    addButton?.classList.add('hide-button');
    downButton?.classList.add('hide-button');

    const form = document.getElementById('contactForm');
    const images = document.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => new Promise(resolve => img.complete ? resolve() : img.onload = resolve));

    Promise.all(imagePromises).then(() => {
        html2canvas(form, { foreignObjectRendering: true }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'JPEG', 10, 10, 190, 0);
            doc.save('formulaire_candidature.pdf');

            addButton?.classList.remove('hide-button');
            downButton?.classList.remove('hide-button');
            actionColumn.forEach(cell => cell.style.display = '');

            const subject = encodeURIComponent("Formulaire de Candidature");
            const body = encodeURIComponent("Veuillez trouver ci-joint le formulaire de candidature.");
            window.location.href = `mailto:rodrigue.mengue@laregionalebank.com?subject=${subject}&body=${body}`;

            alert("Le PDF a été généré. Il est maintenant prêt à être envoyé.");
        });
    });
}

// Traduction
let currentLang = 'fr';
const translations = {
    en: {
        company_name: "Company Name",
        legal_form: "Legal Form",
        sector_activity: "Sector of Activity",
        livestock: "Livestock",
        Aqua: "Fishing and Aquaculture",
        agro_food: "Agrofood",
        wood: "Wood",
        digital: "Digital",
        main_activity: "Main Activity",
        headquarters: "Headquarters / Business Zone",
        creation_date: "Date of Creation",
        contact_address: "Address / Contact",
        number_of_employees: "Number of Employees",
        revenue: "Revenue (F CFA)",
        partner: "Current Bank partners",
        inv: "Current Investment Level",
        presentation_sector: "Présentation du secteur d’activité et des contraintes",
        justification: "Reason for Necess",
        presentation_customer: "Customer Chain Presentation",
        presentation_supply: "Supply Chain Presentation",
        comments: "Comments",
        download_submit: "Download and Submit my Application",
    },
    fr: {
        company_name: "Nom de l’Entreprise",
        legal_form: "Forme juridique",
        sector_activity: "Secteur d’activité",
        main_activity: "Activité principale",
        headquarters: "Siège social / Zone d’activités",
        creation_date: "Date de création",
        contact_address: "Adresse / Contact",
        number_of_employees: "Nombre de salariés",
        revenue: "Chiffre d'affaires (F CFA)",
        partner: "Banques partenaires actuelles",
        inv: "Niveau d’investissements actuels",
        presentation_sector: "Présentation du secteur d’activité et des contraintes",
        justification: "Justification du besoin",
        presentation_customer: "Présentation du portefeuille clients",
        presentation_supply: "Présentation du portefeuille fournisseurs",
        comments: "Commentaires",
        download_submit: "Télécharger et Soumettre ma candidature",
    }
};

function switchLanguage() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        el.textContent = translations[currentLang][key] || el.textContent;
    });
    document.getElementById('langBtn').textContent = currentLang === 'fr' ? 'English' : 'Français';
}
