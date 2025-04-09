// form-structure.js
// Defines the HTML structure of the form.
// Must be loaded AFTER translations.js and BEFORE form-logic.js

document.getElementById("form-container").innerHTML = `
 <!-- Added class="btn" -->
  <button id="langBtn" type="button" class="btn" onclick="switchLanguage()"><span data-key="switch_to_en">Switch to english version</span></button> <!-- Use span for translation -->
    <form id="contactForm">
        <table>
            <tbody> <!-- Added tbody for proper structure -->
                <tr> <!-- Wrapped first row -->
                    <th><span data-key="company_name">Nom de l’Entreprise</span></th>
                    <td><input type="text" name="nom_entreprise" data-placeholder-key="company_name_placeholder" placeholder="Nom de l'entreprise" required></td>
                </tr>
                <tr>
                    <th><span data-key="legal_form">Forme juridique</span></th>
                    <td><input type="text" name="forme_juridique" data-placeholder-key="legal_form_placeholder" placeholder="Ex: SARL, SA, etc." required></td>
                </tr>
                <tr>
                    <th><span data-key="sector_activity">Secteur d’activité</span></th>
                    <td>
                        <div style="display: flex; flex-wrap: wrap; gap: 15px;"> <!-- Added flex-wrap -->
                            <label><input type="checkbox" name="secteur[]" value="Agriculture"><span data-key="agriculture">Agriculture</span></label>
                            <label><input type="checkbox" name="secteur[]" value="Élevage"><span data-key="livestock">Élevage</span></label>
                            <label><input type="checkbox" name="secteur[]" value="Pêche & Aquaculture"><span data-key="Aqua">Pêche & Aquaculture</span></label>
                            <label><input type="checkbox" name="secteur[]" value="Agroalimentaire"><span data-key="agro_food">Agroalimentaire</span></label>
                            <label><input type="checkbox" name="secteur[]" value="Bois"><span data-key="wood">Bois</span></label>
                            <label><input type="checkbox" name="secteur[]" value="Numérique"><span data-key="digital">Numérique</span></label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th><span data-key="main_activity">Activité principale</span></th>
                    <td><input type="text" name="activite_principale" data-placeholder-key="main_activity_placeholder" placeholder="Votre activité principale" required></td>
                </tr>
                <tr>
                    <th><span data-key="headquarters">Siège social/Zone d’activités</span></th>
                    <td><input type="text" name="siege_social" data-placeholder-key="headquarters_placeholder" placeholder="Adresse du siège social" required></td>
                </tr>
                <tr>
                    <th><span data-key="creation_date">Date de création</span></th>
                    <td><input type="date" name="date_creation" required></td> <!-- Date placeholder is browser/OS dependent -->
                </tr>
                <tr>
                    <th><span data-key="contact_address">Adresse / Contact</span></th>
                    <td><input type="text" name="adresse_contact" data-placeholder-key="contact_address_placeholder" placeholder="Adresse/Contact" required></td>
                </tr>
                <tr>
                    <th><span data-key="number_of_employees">Nombre de salariés</span></th>
                    <td>
                        <div style="display: flex; gap: 20px;">
                            <div>
                                <label><span data-key="per">Permanent</span> :</label>
                                <input type="number" name="nombre_salaries_permanent" data-placeholder-key="employees_placeholder" placeholder="0" required>
                            </div>
                            <div>
                                <label><span data-key="temp">Temporaires</span> :</label>
                                <input type="number" name="nombre_salaries_temporaire" data-placeholder-key="employees_placeholder" placeholder="0" required>
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
                                <input type="number" name="chiffre_affaires_2022" data-placeholder-key="revenue_placeholder_2022" placeholder="Chiffre d'affaires 2022" required>
                            </div>
                            <div>
                                <label>2023 :</label>
                                <input type="number" name="chiffre_affaires_2023" data-placeholder-key="revenue_placeholder_2023" placeholder="Chiffre d'affaires 2023" required>
                            </div>
                            <div>
                                <label>2024 :</label>
                                <input type="number" name="chiffre_affaires_2024" data-placeholder-key="revenue_placeholder_2024" placeholder="Chiffre d'affaires 2024" required>
                            </div>
                        </div>
                    </td>
                </tr>
                 <tr>
                    <th><span data-key="partner">Banques partenaires actuelles</span></th>
                    <td><input type="text" name="banques_partenaires" data-placeholder-key="partner_placeholder" placeholder="Banques partenaires" required></td>
                </tr>
                <tr>
                    <th><span data-key="inv">Niveau d’investissements actuels</span></th>
                    <td>
                        <table id="investissementTable">
                            <thead>
                                <tr>
                                    <th><span data-key="inv_designation">Désignation des investissements</span></th>
                                    <th><span data-key="inv_amount">Montant (F CFA)</span></th>
                                    <th><span data-key="inv_year">Année d’acquisition</span></th>
                                    <th><span data-key="inv_action">Action</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Initial row -->
                                <tr>
                                    <td><input type="text" name="investissement_1" data-placeholder-key="inv_placeholder_designation" placeholder="Investissement"></td>
                                    <td><input type="number" name="montant_1" data-placeholder-key="inv_placeholder_amount" placeholder="Montant"></td>
                                    <td><input type="date" name="annee_1" data-placeholder-key="inv_placeholder_year" placeholder="Année"></td>
                                    <td>
                                        <!-- Added class="btn" -->
                                        <button type="button" class="remove-row-btn btn" onclick="removeRow(this)"><span data-key="inv_delete">Supprimer</span></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div> <!-- Removed submit-btn class, using btn directly -->
                             <!-- Added class="btn" -->
                             <button type="button" id="addInvestmentBtn" class="btn" onclick="addRow()"><span data-key="inv_add">Ajouter un investissement</span></button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th><span data-key="presentation_sector">Présentation du secteur d’activité et des contraintes</span></th>
                    <td><textarea name="presentation_secteur" data-placeholder-key="presentation_sector_placeholder" placeholder="Décrivez le secteur et ses contraintes" required></textarea></td>
                </tr>
                <tr>
                    <th><span data-key="justification">Justification du besoin</span></th>
                    <td><textarea name="justification_besoin" data-placeholder-key="justification_placeholder" placeholder="Expliquez le besoin" required></textarea></td>
                </tr>
                <tr>
                    <th><span data-key="presentation_customer">Présentation du portefeuille clients</span></th>
                    <td><textarea name="presentation_clients" data-placeholder-key="presentation_customer_placeholder" placeholder="Décrivez votre portefeuille clients" required></textarea></td>
                </tr>
                <tr>
                    <th><span data-key="presentation_supply">Présentation du portefeuille fournisseurs</span></th>
                    <td><textarea name="presentation_fournisseurs" data-placeholder-key="presentation_supply_placeholder" placeholder="Décrivez votre portefeuille fournisseurs" required></textarea></td>
                </tr>
                <tr>
                    <th><span data-key="comments">Commentaires</span></th>
                    <td><textarea name="commentaires" data-placeholder-key="comments_placeholder" placeholder="D'autres remarques"></textarea></td>
                </tr>
            </tbody>
        </table>
    </form>

    <!-- Container for bottom buttons - Added class="form-actions" -->
    <!-- Removed inline styles as they are now handled by .form-actions in CSS -->
    <div class="form-actions">
        <!-- Removed redundant submit-btn div -->
        <!-- Added class="btn" -->
        <button id="submitBtn" type="button" class="btn" onclick="generatePDFandSubmit()"><span data-key="download_submit">Télécharger et Soumettre ma candidature</span></button>
    </div>
`;

// Note: The addRow function definition at the end of the original form.js
// should ideally be ONLY in form-logic.js. I've removed it from here
// as form-logic.js already defines it correctly.
