// translations.js
// Contains the language strings for the form.
// Must be loaded BEFORE form-logic.js

const translations = {
    en: {
        company_name: "Company Name",
        legal_form: "Legal Form",
        sector_activity: "Sector of Activity",
        agriculture: "Agriculture",
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
        inv_designation: "Investment description",
        inv_amount: "Amount (F CFA)",
        inv_year: "Acquisition year",
        inv_action: "Action",
        inv_add: "Add Investment",
        inv_delete: "Remove",
        inv_placeholder_designation: "Investment",
        inv_placeholder_amount: "Amount",
        inv_placeholder_year: "Year",
        presentation_sector: "Presentation of the Sector and Constraints",
        justification: "Reason for Need",
        presentation_customer: "Customer Portfolio Presentation",
        presentation_supply: "Supplier Portfolio Presentation",
        comments: "Comments",
        download_submit: "Download and Submit my Application",
        guide: "Fill in the fields, download and attach the file to the mail window",
        validation_error: "Please fill in all required fields highlighted in red.",
        email_subject: "Application Form",
        email_body: "Please find attached the completed application form.",
        email_alert: "The PDF has been generated. Please attach it manually to the email that will open.",
        agriculture: "Agriculture", // Added
        livestock: "Livestock", // Added
        Aqua: "Fishing and Aquaculture", // Added
        agro_food: "Agrofood", // Added
        wood: "Wood", // Added
        digital: "Digital", // Added
        per: "Permanents", // Added/Verified
        temp: "Temporary", // Added
        inv_designation: "Investment description", // Added
        inv_amount: "Amount (F CFA)", // Added
        inv_year: "Acquisition year", // Added
        inv_action: "Action", // Added
        inv_add: "Add Investment", // Added
        inv_delete: "Remove", // Added
        inv_placeholder_designation: "Investment", // Added
        inv_placeholder_amount: "Amount", // Added
        inv_placeholder_year: "Year", // Added
        guide: "Fill in the fields, download and attach the file to the mail window", // Added/Verified
        validation_error: "Please fill in all required fields highlighted in red.", // Added
        email_subject: "Application Form", // Added
        email_body: "Please find attached the completed application form.", // Added
        email_alert: "The PDF has been generated. Please attach it manually to the email that will open.", // Added
        switch_to_fr: "Utiliser la version Française", // Added for lang button
        company_name_placeholder: "Company name",
        legal_form_placeholder: "Ex: LLC, Inc., etc.",
        main_activity_placeholder: "Your main activity",
        headquarters_placeholder: "Headquarters address",
        contact_address_placeholder: "Address/Contact",
        employees_placeholder: "0", // Placeholder for number might not need translation
        revenue_placeholder_2022: "Revenue 2022",
        revenue_placeholder_2023: "Revenue 2023",
        revenue_placeholder_2024: "Revenue 2024",
        partner_placeholder: "Banking partners",
        presentation_sector_placeholder: "Describe the sector and its constraints",
        justification_placeholder: "Explain the need",
        presentation_customer_placeholder: "Describe your customer portfolio",
        presentation_supply_placeholder: "Describe your supplier portfolio", 
        comments_placeholder: "Other remarks",
    },
    fr: {
        company_name: "Nom de l’Entreprise",
        legal_form: "Forme juridique",
        sector_activity: "Secteur d’activité",
        agriculture: "Agriculture",
        livestock: "Élevage",
        Aqua: "Pêche & Aquaculture",
        agro_food: "Agroalimentaire",
        wood: "Bois",
        digital: "Numérique",
        main_activity: "Activité principale",
        headquarters: "Siège social / Zone d’activités",
        creation_date: "Date de création",
        contact_address: "Adresse / Contact",
        number_of_employees: "Nombre de salariés",
        revenue: "Chiffre d'affaires (F CFA)",
        partner: "Banques partenaires actuelles",
        inv: "Niveau d’investissements actuels",
        inv_designation: "Désignation des investissements",
        inv_amount: "Montant (F CFA)",
        inv_year: "Année d’acquisition",
        inv_action: "Action",
        inv_add: "Ajouter un investissement",
        inv_delete: "Supprimer",
        inv_placeholder_designation: "Investissement",
        inv_placeholder_amount: "Montant",
        inv_placeholder_year: "Année",
        presentation_sector: "Présentation du secteur d’activité et des contraintes",
        justification: "Justification du besoin",
        presentation_customer: "Présentation du portefeuille clients",
        presentation_supply: "Présentation du portefeuille fournisseurs",
        comments: "Commentaires",
        download_submit: "Télécharger et Soumettre ma candidature",
        guide: "Remplir les champs, telecharger et joindre le fichier à la fenetre mail",
        validation_error: "Veuillez remplir tous les champs obligatoires en rouge.",
        email_subject: "Formulaire de Candidature",
        email_body: "Veuillez trouver ci-joint le formulaire de candidature rempli.",
        email_alert: "Le PDF a été généré. Veuillez l'attacher manuellement à l'e-mail qui va s'ouvrir.",
        agriculture: "Agriculture", // Added
        livestock: "Élevage", // Added
        Aqua: "Pêche & Aquaculture", // Added
        agro_food: "Agroalimentaire", // Added
        wood: "Bois", // Added
        digital: "Numérique", // Added
        per: "Permanents", // Added/Verified
        temp: "Temporaires", // Added
        inv_designation: "Désignation des investissements", // Added
        inv_amount: "Montant (F CFA)", // Added
        inv_year: "Année d’acquisition", // Added
        inv_action: "Action", // Added
        inv_add: "Ajouter un investissement", // Added
        inv_delete: "Supprimer", // Added
        inv_placeholder_designation: "Investissement", // Added
        inv_placeholder_amount: "Montant", // Added
        inv_placeholder_year: "Année", // Added
        guide: "Remplir les champs, telecharger et joindre le fichier à la fenetre mail", // Added/Verified
        validation_error: "Veuillez remplir tous les champs obligatoires en rouge.", // Added
        email_subject: "Formulaire de Candidature", // Added
        email_body: "Veuillez trouver ci-joint le formulaire de candidature rempli.", // Added
        email_alert: "Le PDF a été généré. Veuillez l'attacher manuellement à l'e-mail qui va s'ouvrir.", // Added
        switch_to_en: "Switch to english version", // Added for lang button
        company_name_placeholder: "Nom de l'entreprise",
        legal_form_placeholder: "Ex: SARL, SA, etc.",
        main_activity_placeholder: "Votre activité principale",
        headquarters_placeholder: "Adresse du siège social",
        contact_address_placeholder: "Adresse/Contact",
        employees_placeholder: "0", // Placeholder for number might not need translation
        revenue_placeholder_2022: "Chiffre d'affaires 2022",
        revenue_placeholder_2023: "Chiffre d'affaires 2023",
        revenue_placeholder_2024: "Chiffre d'affaires 2024",
        partner_placeholder: "Banques partenaires",
        presentation_sector_placeholder: "Décrivez le secteur et ses contraintes",
        justification_placeholder: "Expliquez le besoin",
        presentation_customer_placeholder: "Décrivez votre portefeuille clients",
        presentation_supply_placeholder: "Décrivez votre portefeuille fournisseurs", 
        comments_placeholder: "D'autres remarques",
    }
};
