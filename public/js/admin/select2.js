function initSelect2() {
    // 1. Détruire toutes les anciennes instances
    $('.select2').each(function() {
        if ($(this).hasClass('select2-hidden-accessible')) {
            $(this).select2('destroy');
        }
    });

    // 2. Réinitialiser tous les selects
    $('.select2').each(function() {
        const isMultiple = this.multiple;

        $(this).select2({
            placeholder: $(this).data("placeholder") || "Sélectionner...",
            allowClear: true,
            width: "100%",
            closeOnSelect: !isMultiple,
            tags: $(this).data("tags") === true,
            maximumSelectionLength: $(this).data("max") ?? null,
            dropdownParent: $(this).closest('.modal, body'),

            language: {
                maximumSelected: function (args) {
                    return "Vous ne pouvez sélectionner que " + args.maximum + " éléments";
                },
                noResults: function () {
                    return "Aucun résultat trouvé";
                },
            },
        });
    });
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', function() {
    initSelect2();
});

// Réinitialisation avec Turbo
document.addEventListener('turbo:load', function() {
    initSelect2();
});

document.addEventListener('turbo:frame-load', function() {
    initSelect2();
});

// Nettoyage avant cache Turbo
document.addEventListener('turbo:before-cache', function() {
    $('.select2').each(function() {
        if ($(this).hasClass('select2-hidden-accessible')) {
            $(this).select2('destroy');
        }
    });
});