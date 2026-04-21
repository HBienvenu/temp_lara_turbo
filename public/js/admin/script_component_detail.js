// Fonction globale pour afficher les détails d'une entité
function showDetails(button) {
    const data = JSON.parse(button.dataset.details);
    const modalId = button.dataset.modal;

    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error(`Modal ${modalId} not found`);
        return;
    }

    // Parcourir tous les champs avec data-field et les remplir
    const fields = modal.querySelectorAll("[data-field]");
    fields.forEach((field) => {
        const fieldName = field.dataset.field;
        const fieldType = field.dataset.type || "text";

        if (data.hasOwnProperty(fieldName)) {
            updateDetailField(field, data[fieldName], fieldType);
        } else {
            // Si la donnée n'existe pas, afficher un tiret
            updateDetailField(field, null, fieldType);
        }
    });

    // Ouvrir le modal
    openModalFormSingle(modalId);
}

// Fonction pour mettre à jour un champ de détail selon son type
// Fonction pour mettre à jour un champ de détail selon son type
function updateDetailField(fieldElement, value, type) {
    const valueElement = fieldElement.querySelector("[data-field-value]");
    if (!valueElement) return;

    switch (type) {
        case "image":
            if (value) {
                valueElement.src = value;
                valueElement.classList.remove("hidden");
                valueElement.closest(".space-y-1")?.classList.remove("hidden");
            } else {
                valueElement.classList.add("hidden");
                valueElement.closest(".space-y-1")?.classList.add("hidden");
            }
            break;

        case "badge":
            // Récupérer le mapping depuis data-badge-map
            const badgeMap = fieldElement.dataset.badgeMap
                ? JSON.parse(fieldElement.dataset.badgeMap)
                : null;

            if (badgeMap) {
                // Normaliser la valeur pour gérer les booléens et les nombres
                let normalizedValue;

                if (
                    value === true ||
                    value === "true" ||
                    value === 1 ||
                    value === "1"
                ) {
                    normalizedValue = "1";
                } else if (
                    value === false ||
                    value === "false" ||
                    value === 0 ||
                    value === "0"
                ) {
                    normalizedValue = "0";
                } else {
                    normalizedValue = String(value);
                }

                // Chercher dans le badgeMap avec la valeur normalisée
                if (badgeMap[normalizedValue] !== undefined) {
                    valueElement.innerHTML = badgeMap[normalizedValue];
                } else {
                    valueElement.textContent = value || "-";
                }
            } else {
                valueElement.textContent = value || "-";
            }
            break;

        case "long-text":
            if (value) {
                valueElement.innerHTML = value.replace(/\n/g, "<br>");
                fieldElement.classList.remove("hidden");
            } else {
                valueElement.textContent = "-";
            }
            break;

        case "boolean":
            valueElement.textContent = value ? "Oui" : "Non";
            break;

        default: // text, email, phone, etc.
            valueElement.textContent = value || "-";
    }
}
