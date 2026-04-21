$(function () {
    let currentStep = 1;
    const totalSteps = 3;

    // ==============================================================
    // Gestion des étapes
    // ==============================================================
    function showStep(step) {
        $(".step").each(function (index) {
            const isVisible = index + 1 === step;
            $(this)
                .toggleClass("hidden", !isVisible)
                .find("input, select, textarea")
                .prop("disabled", !isVisible);
        });

        $("#prevBtn").toggleClass("hidden", step === 1);
        $("#nextBtn").toggleClass("hidden", step === totalSteps);
        $("#submitBtn").toggleClass("hidden", step !== totalSteps);

        updateStepHeader(step);
    }

    function nextStep() {
        attachLiveClearers($("#step" + currentStep));
        const { valid, firstInvalid } = validateCurrentStep();

        if (!valid) {
            if (firstInvalid) {
                $("html, body").animate(
                    {
                        scrollTop: $(firstInvalid).offset().top - 100,
                    },
                    400
                );
                firstInvalid.focus();
            }
            return;
        }

        if (currentStep < totalSteps) {
            currentStep++;
            if (currentStep === 3) generateCycles();
            showStep(currentStep);
            attachLiveClearers($("#step" + currentStep));
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    }

    // ==============================================================
    // Gestion des erreurs
    // ==============================================================
    function showFieldError($field, message) {
        removeFieldError($field);
        $field.addClass("border-red-500 ring-1 ring-red-300");
        $(
            '<p class="text-sm text-red-600 mt-1" data-error="true">' +
                message +
                "</p>"
        ).insertAfter($field);
    }

    function removeFieldError($field) {
        $field
            .removeClass("border-red-500 ring-1 ring-red-300")
            .parent()
            .find('[data-error="true"]')
            .remove();
    }

    function validateCurrentStep() {
        const $step = $("#step" + currentStep);
        const $controls = $step.find("input, select, textarea");
        let firstInvalid = null;
        let allValid = true;

        $controls.each(function () {
            const $c = $(this);
            removeFieldError($c);

            if ($c.is(":disabled") || $c.attr("type") === "hidden") return;

            if (
                $c.attr("type") === "file" &&
                $c.prop("required") &&
                this.files.length === 0
            ) {
                showFieldError($c, "Ce fichier est requis.");
                allValid = false;
                if (!firstInvalid) firstInvalid = this;
                return;
            }

            if (!this.checkValidity()) {
                showFieldError($c, this.validationMessage || "Champ invalide.");
                allValid = false;
                if (!firstInvalid) firstInvalid = this;
            }
        });

        return {
            valid: allValid,
            firstInvalid,
        };
    }

    function attachLiveClearers($container) {
        $container.find("input, select, textarea").each(function () {
            const $c = $(this);
            if ($c.data("listenerAttached")) return;
            $c.on("input change", function () {
                removeFieldError($c);
            });
            $c.data("listenerAttached", true);
        });
    }

    // ==============================================================
    // Gestion dynamique des sites
    // ==============================================================
    $("#add-site").on("click", function () {
        const $container = $("#sites-container");
        const index = $container.find(".site-item").length;

        const newSite = $(`
                    <div class="p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50 relative site-item mt-4">
                        <button type="button" class="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm remove-site">✕</button>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            ${createInput(
                                "Nom du site",
                                `sites[${index}][name]`,
                                `Annexe ${index + 1}`,
                                true
                            )}
                            ${createInput(
                                "Localisation",
                                `sites[${index}][localisation]`,
                                "Quartier Akpakpa, Cotonou"
                            )}
                            ${createInput(
                                "Téléphone",
                                `sites[${index}][telephone]`,
                                "+229 65 00 00 00",
                                true
                            )}
                            ${createInput(
                                "Email",
                                `sites[${index}][email]`,
                                `contact@annexe${index + 1}.com`,
                                false,
                                "email"
                            )}
                            ${createInput(
                                "Responsable du site",
                                `sites[${index}][responsable]`,
                                "Mme KOUASSI Sarah",
                                true
                            )}
                            <div class="flex items-center mt-2 space-x-2">
                                <input type="checkbox" name="sites[${index}][active]" value="1" checked class="accent-blue-600 h-5 w-5 rounded">
                                <label class="text-gray-700 text-sm">Site actif</label>
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Description du site</label>
                                <textarea name="sites[${index}][description]" rows="3"
                                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                    placeholder="Ex: Site réservé au secondaire..."></textarea>
                            </div>
                        </div>
                    </div>
                `);

        $container.append(newSite);
        attachLiveClearers(newSite);

        newSite.find(".remove-site").on("click", function () {
            newSite.remove();
        });
    });

    function createInput(
        label,
        name,
        placeholder,
        required = false,
        type = "text"
    ) {
        return `
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        ${label}${required ? ' <span class="text-red-500">*</span>' : ""}
                    </label>
                    <input type="${type}" name="${name}" ${required ? "required" : ""}
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        placeholder="Ex: ${placeholder}">
                </div>`;
    }

    // ==============================================================
    // Génération automatique des cycles
    // ==============================================================
    function generateCycles() {
        const $container = $("#cycles-container").empty();

        $("#sites-container .site-item").each(function (index) {
            const siteName =
                $(this).find(`input[name="sites[${index}][name]"]`).val() ||
                `Site ${index + 1}`;

            const $block = $(`
                        <div class="p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50 space-y-4">
                            <h3 class="text-lg font-medium text-gray-700">Cycles pour ${siteName}</h3>
                            <div class="flex flex-wrap gap-4">
                                ${createCycle(index, "maternelle", "Maternelle")}
                                ${createCycle(index, "primaire", "Primaire")}
                                ${createCycle(index, "secondaire", "Secondaire")}
                                ${createCycle(index, "lycee", "Lycée")}
                                ${createCycle(index, "universsite", "Universsité")}
                            </div>
                        </div>
                    `);
            $container.append($block);
        });
    }

    function createCycle(index, value, label) {
        return `
                <label class="flex items-center space-x-2">
                    <input type="checkbox" name="sites[${index}][cycles][]" value="${value}" class="accent-blue-600">
                    <span>${label}</span>
                </label>`;
    }

    // ==============================================================
    // Header étapes
    // ==============================================================
    function updateStepHeader(step) {
        for (let i = 1; i <= totalSteps; i++) {
            const $circle = $(`#step${i}-circle`);
            const $label = $circle.next();

            if (i === step) {
                $circle
                    .removeClass("bg-gray-300 text-gray-600")
                    .addClass("bg-blue-600 text-white");
                $label.removeClass("text-gray-600").addClass("text-blue-600");
            } else if (i < step) {
                $circle
                    .removeClass("bg-gray-300 text-gray-600")
                    .addClass("bg-blue-100 text-blue-600");
                $label.removeClass("text-gray-600").addClass("text-blue-600");
            } else {
                $circle
                    .removeClass(
                        "bg-blue-600 bg-blue-100 text-white text-blue-600"
                    )
                    .addClass("bg-gray-300 text-gray-600");
                $label.removeClass("text-blue-600").addClass("text-gray-600");
            }
        }
    }

    // ==============================================================
    // Initialisation
    // ==============================================================
    $("#nextBtn").on("click", nextStep);
    $("#prevBtn").on("click", prevStep);

    attachLiveClearers($("#multiStepForm"));
    showStep(currentStep);

    // ==============================================================
    // On desactive a la fin les champs disabled pour l'envoie du formulaire
    // ==============================================================
    $("#multiStepForm").on("submit", function () {
        $(this).find(":disabled").prop("disabled", false);
    });
});
