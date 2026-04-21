class ModalHandler {
    constructor() {
        this.currentModal = null;
        this.currentForm = null;
        this.currentEditData = null;
        this.init();
    }

    init() {
        this.setupTurboListeners();
        this.setupClickListeners();
    }

    // ==================== GESTION DES MODALES DE FORMULAIRE ====================

    // Ouverture modal formulaire
    openFormModal(id, isCreation = true) {
        const modal = document.getElementById(id);
        if (!modal) return;

        const form = modal.querySelector("form");

        // Nettoyer les erreurs avant d'ouvrir
        if (form) {
            this.clearFormErrors(form);
        }

        // Si c'est une création, réinitialiser le formulaire et les données d'édition
        if (isCreation) {
            this.resetForm(id);
            this.currentEditData = null;
        }

        this.disableBodyScroll();
        modal.classList.remove("hidden");
        modal.classList.add("flex");

        setTimeout(() => {
            modal.classList.remove("opacity-0");
            const content = modal.querySelector(".modal-content");
            if (content) {
                content.classList.remove(
                    "opacity-0",
                    "scale-95",
                    "translate-y-4",
                );
            }
        }, 10);
    }

    // Nettoyage des erreurs de formulaire
    clearFormErrors(form) {
        if (!form) return;

        // Supprimer les messages d'erreur
        form.querySelectorAll(".text-red-500, .text-xs.text-red-500").forEach(
            (msg) => msg.remove(),
        );

        // Retirer les bordures rouges
        form.querySelectorAll(".border-red-500").forEach((input) => {
            input.classList.remove("border-red-500");
        });
    }

    // Fermeture modal formulaire
    closeFormModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;

        modal.classList.add("opacity-0");
        const content = modal.querySelector(".modal-content");
        if (content) {
            content.classList.add("opacity-0", "scale-95", "translate-y-4");
        }

        setTimeout(() => {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
            this.enableBodyScroll();

            // Réinitialiser le formulaire après fermeture
            // this.resetForm(id);

            // Réinitialiser les données d'édition
            this.currentEditData = null;
        }, 300);
    }

    // ==================== GESTION DU CHARGEMENT DES DONNÉES ====================

    // Charge les données dans le modal pour modification
    loadFormData(modalId, data) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const form = modal.querySelector("form");
        if (!form) return;

        //Sauvegarder les donnees de la modification en cours
        this.currentEditData = {
            modalId: modalId,
            action: data._action,
            method: data._method,
            title: data._title,
            confirmText: data._confirmText,
        };

        // Nettoyer les erreurs d'abord
        this.clearFormErrors(form);

        // Mettre à jour le titre du modal
        const titleElement = modal.querySelector(".modal-title");
        if (titleElement && data._title) {
            titleElement.textContent = data._title;
        }

        // Mettre à jour l'action du formulaire
        if (data._action) {
            form.action = data._action;
        }

        // Mettre à jour ou créer le champ _method
        if (data._method) {
            let methodField = form.querySelector('[name="_method"]');
            if (methodField) {
                methodField.value = data._method;
            } else {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = "_method";
                input.value = data._method;
                form.appendChild(input);
            }
        }

        // Mettre à jour le texte du bouton de confirmation
        const confirmBtn = form.querySelector(".confirm-submit-btn");
        if (confirmBtn && data._confirmText) {
            const textSpan = confirmBtn.querySelector(".confirm-text");
            if (textSpan) {
                textSpan.textContent = data._confirmText;
                confirmBtn.dataset.originalText = data._confirmText;
            }
        }

        // Remplir tous les champs du formulaire
        Object.keys(data).forEach((key) => {
            // Ignorer les clés spéciales qui commencent par _
            if (key.startsWith("_")) return;

            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === "checkbox") {
                    field.checked = Boolean(Number(data[key]));
                } else if (field.type === "radio") {
                    const radio = form.querySelector(
                        `[name="${key}"][value="${data[key]}"]`,
                    );
                    if (radio) radio.checked = true;
                } else if (field.tagName === "SELECT") {
                    field.value = data[key];
                    // Déclencher l'événement change pour les selects personnalisés
                    field.dispatchEvent(new Event("change", { bubbles: true }));
                } else {
                    field.value = data[key] || "";
                }
            }
        });

        // Ouvrir le modal en mode MODIFICATION (isCreation = false)
        this.openFormModal(modalId, false);
    }

    // Amélioration de la fonction clearAllFields pour gérer les toggles
    clearAllFields(form) {
        if (!form) return;

        // Parcourir tous les éléments du formulaire
        Array.from(form.elements).forEach((element) => {
            // Ignorer les boutons et les champs cachés système
            if (
                element.type === "button" ||
                element.type === "submit" ||
                element.name === "_token" ||
                element.name === "_method"
            ) {
                return;
            }

            // Ignorer les inputs cachés qui servent de fallback aux checkboxes
            if (
                element.type === "hidden" &&
                form.querySelector(
                    `input[type="checkbox"][name="${element.name}"]`,
                )
            ) {
                return;
            }

            // Vider selon le type
            if (element.type === "checkbox" || element.type === "radio") {
                element.checked = false;
            } else if (element.tagName === "SELECT") {
                element.selectedIndex = 0;
            } else if (
                element.tagName === "TEXTAREA" ||
                element.tagName === "INPUT"
            ) {
                element.value = "";
            }
        });
    }

    // Réinitialise le formulaire (pour mode création)
    resetForm(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const form = modal.querySelector("form");
        if (!form) return;

        // Nettoyer les erreurs visuelles
        this.clearFormErrors(form);

        // Vider tous les champs manuellement
        this.clearAllFields(form);

        // Restaurer l'action et la méthode par défaut
        const originalAction = form.dataset.originalAction;
        const originalMethod = form.dataset.originalMethod || "POST";

        if (originalAction) {
            form.action = originalAction;
        }

        // Supprimer le champ _method si c'est un POST
        if (originalMethod === "POST") {
            const methodField = form.querySelector('[name="_method"]');
            if (methodField) {
                methodField.remove();
            }
        }

        // Restaurer le titre par défaut
        const titleElement = modal.querySelector(".modal-title");
        const originalTitle = modal.dataset.originalTitle;
        if (titleElement && originalTitle) {
            titleElement.textContent = originalTitle;
        }

        // Restaurer le texte du bouton par défaut
        const confirmBtn = form.querySelector(".confirm-submit-btn");
        const originalConfirmText = modal.dataset.originalConfirmText;
        if (confirmBtn && originalConfirmText) {
            const textSpan = confirmBtn.querySelector(".confirm-text");
            if (textSpan) {
                textSpan.textContent = originalConfirmText;
                confirmBtn.dataset.originalText = originalConfirmText;
            }
        }
    }

    // ==================== GESTION DES MODALES DE CONFIRMATION ====================

    openConfirmModal(id, button) {
        const form = button.closest("form");
        if (!form) return;

        // Validation personnalisée si définie
        if (typeof runCustomValidation === "function") {
            if (!runCustomValidation(form)) {
                form.reportValidity();
                return;
            }
        }

        // Validation HTML5
        if (!form.reportValidity()) {
            return;
        }

        const modal = document.getElementById(id);
        if (!modal) return;

        modal.__form = form;
        modal.classList.remove("hidden");
        modal.classList.add("flex");

        setTimeout(() => {
            modal.classList.remove("opacity-0");
            const content = modal.querySelector(".modal-content");
            if (content) {
                content.classList.remove(
                    "opacity-0",
                    "scale-95",
                    "translate-y-4",
                );
                content.classList.add(
                    "opacity-100",
                    "scale-100",
                    "translate-y-0",
                );
            }
        }, 10);
    }

    closeConfirmModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;

        modal.classList.add("opacity-0");
        const content = modal.querySelector(".modal-content");
        if (content) {
            content.classList.add("opacity-0", "scale-95", "translate-y-4");
        }

        setTimeout(() => {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
        }, 300);
    }

    reopenModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        this.disableBodyScroll();
        modal.classList.remove("hidden");
        modal.classList.add("flex");

        setTimeout(() => {
            modal.classList.remove("opacity-0");
            const content = modal.querySelector(".modal-content");
            if (content) {
                content.classList.remove(
                    "scale-95",
                    "translate-y-4",
                    "opacity-0",
                );
            }
        }, 10);

        const form = modal.querySelector("form");
        if (form) {
            this.hideLoader(form);

            // Restaurer les métadonnées de modification si elles existent
            if (
                this.currentEditData &&
                this.currentEditData.modalId === modalId
            ) {
                // Restaurer l'action
                if (this.currentEditData.action) {
                    form.action = this.currentEditData.action;
                }

                // Restaurer ou créer le champ _method
                if (this.currentEditData.method) {
                    let methodField = form.querySelector('[name="_method"]');
                    if (methodField) {
                        methodField.value = this.currentEditData.method;
                    } else {
                        const input = document.createElement("input");
                        input.type = "hidden";
                        input.name = "_method";
                        input.value = this.currentEditData.method;
                        form.appendChild(input);
                    }
                }

                // Restaurer le titre
                if (this.currentEditData.title) {
                    const titleElement = modal.querySelector(".modal-title");
                    if (titleElement) {
                        titleElement.textContent = this.currentEditData.title;
                    }
                }

                // Restaurer le texte du bouton
                if (this.currentEditData.confirmText) {
                    const confirmBtn = form.querySelector(
                        ".confirm-submit-btn",
                    );
                    if (confirmBtn) {
                        const textSpan =
                            confirmBtn.querySelector(".confirm-text");
                        if (textSpan) {
                            textSpan.textContent =
                                this.currentEditData.confirmText;
                            confirmBtn.dataset.originalText =
                                this.currentEditData.confirmText;
                        }
                    }
                }
            }
        }
    }

    // ==================== GESTION DU LOADER ====================

    showLoader(form) {
        const btn = form.querySelector(".confirm-submit-btn");
        if (!btn) return;

        const text = btn.querySelector(".confirm-text");
        const loader = btn.querySelector(".confirm-loader");

        btn.disabled = true;
        btn.classList.add("opacity-70", "cursor-not-allowed");

        if (text) text.textContent = "Traitement...";
        if (loader) loader.classList.remove("hidden");
    }

    hideLoader(form) {
        const btn = form.querySelector(".confirm-submit-btn");
        if (!btn) return;

        const text = btn.querySelector(".confirm-text");
        const loader = btn.querySelector(".confirm-loader");
        const originalText = btn.dataset.originalText || "Enregistrer";

        btn.disabled = false;
        btn.classList.remove("opacity-70", "cursor-not-allowed");

        if (text) text.textContent = originalText;
        if (loader) loader.classList.add("hidden");
    }

    // ==================== GESTION DU SCROLL ====================

    disableBodyScroll() {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = this.getScrollbarWidth() + "px";
    }

    enableBodyScroll() {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        document.documentElement.style.overflow = "";
        document.documentElement.style.height = "";
    }

    getScrollbarWidth() {
        const outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.overflow = "scroll";
        document.body.appendChild(outer);

        const inner = document.createElement("div");
        outer.appendChild(inner);

        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
        outer.parentNode.removeChild(outer);

        return scrollbarWidth;
    }

    // ==================== ÉVÉNEMENTS TURBO ====================

    setupTurboListeners() {
        document.addEventListener("turbo:submit-start", (event) => {
            const form = event.target;
            const modalId = form.dataset.modalForm;

            if (modalId) {
                this.currentModal = modalId;
                this.currentForm = form;
                this.showLoader(form);
            }
        });

        document.addEventListener("turbo:submit-end", (event) => {
            const form = event.target;
            this.hideLoader(form);
        });

        document.addEventListener("turbo:frame-load", (event) => {
            if (event.target.id === "main_content") {
                this.handleSuccess();
            }
        });

        document.addEventListener("turbo:frame-render", (event) => {
            if (event.target.id === "main_content") {
                const frame = event.target;
                
                // Vérifier d'abord s'il y a un message de succès
                const hasSuccess = frame.querySelector('.alert-success, [data-success-message]');
                
                // Vérifier les erreurs de validation uniquement (ignorer les messages alert-danger génériques)
                const hasValidationErrors = frame.querySelector(
                    'input.border-red-500, select.border-red-500, textarea.border-red-500, .invalid-feedback'
                );

                if (hasSuccess) {
                    // Si succès, fermer le modal et nettoyer
                    if (this.currentModal) {
                        this.closeFormModal(this.currentModal);
                        this.currentModal = null;
                        this.currentForm = null;
                        this.currentEditData = null;
                    }
                    this.enableBodyScroll();
                } else if (hasValidationErrors && this.currentModal) {
                    // Réouvrir uniquement s'il y a des erreurs de validation
                    setTimeout(() => {
                        this.reopenModal(this.currentModal);
                    }, 100);
                } else {
                    // Pas d'erreurs de validation, fermer le modal
                    if (this.currentModal) {
                        this.closeFormModal(this.currentModal);
                        this.currentModal = null;
                        this.currentForm = null;
                        this.currentEditData = null;
                    }
                    this.enableBodyScroll();
                }
            }
        });
    }

    handleSuccess() {
        if (!this.currentModal) return;

        const successMessage = document.querySelector("[data-success-message]");
        const alertSuccess = document.querySelector(".alert-success");

        if (successMessage || alertSuccess) {
            const message =
                successMessage?.dataset.successMessage ||
                alertSuccess?.textContent.trim() ||
                "Opération effectuée avec succès !";

            this.closeFormModal(this.currentModal);

            setTimeout(() => {
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        icon: "success",
                        title: "Succès !",
                        text: message,
                        timer: 3000,
                        showConfirmButton: false,
                        toast: true,
                        position: "top-end",
                    });
                }
            }, 300);

            this.currentModal = null;
            this.currentForm = null;
            this.currentEditData = null;
        }
    }

    // ==================== GESTION DES CLICS ====================

    setupClickListeners() {
        document.addEventListener("click", (e) => {
            const confirmBtn = e.target.closest(".confirm-submit-btn");
            if (confirmBtn) {
                this.handleConfirmButtonClick(e, confirmBtn);
            }
        });
    }

    handleConfirmButtonClick(e, btn) {
        const modal = btn.closest("[id]");
        const form = modal?.__form;

        if (form && modal && btn.disabled === false) {
            const text = btn.querySelector(".confirm-text");
            const loader = btn.querySelector(".confirm-loader");

            btn.disabled = true;
            btn.classList.add("opacity-70", "cursor-not-allowed");

            if (text) text.textContent = "Traitement...";
            if (loader) loader.classList.remove("hidden");

            form.requestSubmit();
            return;
        }

        const parentForm = btn.closest("form");
        if (!parentForm || btn.disabled) return;

        e.preventDefault();

        const confirmModalId =
            btn.dataset.confirmModal ||
            parentForm.querySelector('[id*="confirmModal"]')?.id;

        if (confirmModalId) {
            this.openConfirmModal(confirmModalId, btn);
        } else {
            parentForm.requestSubmit();
        }
    }
}

// ==================== INITIALISATION ====================

document.addEventListener("DOMContentLoaded", () => {
    window.modalHandler = new ModalHandler();

    // Exposer les méthodes globalement
    window.openModalForm = (id) => window.modalHandler.openFormModal(id);
    window.closeModalForm = (id) => window.modalHandler.closeFormModal(id);
    window.openConfirmModal = (id, btn) =>
        window.modalHandler.openConfirmModal(id, btn);
    window.closeConfirmModal = (id) =>
        window.modalHandler.closeConfirmModal(id);
    window.loadFormData = (modalId, data) =>
        window.modalHandler.loadFormData(modalId, data);
    window.resetForm = (modalId) => window.modalHandler.resetForm(modalId);
});

document.addEventListener("turbo:load", () => {
    // if (!window.modalHandler) {
    //     window.modalHandler = new ModalHandler();
    // }

    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.documentElement.style.overflow = "";
});

document.addEventListener("turbo:render", () => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.documentElement.style.overflow = "";
});


// Fonction globale pour éditer n'importe quelle entité
function editEntity(button) {
    const data = JSON.parse(button.dataset.edit);
    const modal = button.dataset.modal;
    window.modalHandler.loadFormData(modal, data);
}
window.editEntity = editEntity;