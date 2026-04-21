function initDataTables() {
    document.querySelectorAll(".datatable").forEach((table) => {
        // Vérifie si la table n'est pas déjà initialisée
        if (!$.fn.DataTable.isDataTable(table)) {
            const dataTable = $(table).DataTable({
                language: {
                    url: "https://cdn.datatables.net/plug-ins/2.3.2/i18n/fr-FR.json",
                    paginate: {
                        previous: "<",
                        next: ">",
                    },
                },
                responsive: {
                    details: {
                        type: "column",
                        target: 0, // la première colonne
                    },
                },
                pageLength: 10,
                lengthMenu: [10, 25, 50, 100],
                autoWidth: false,
                scrollX: true,
                columnDefs: [
                    {
                        targets: 0,
                        className: "dt-control",
                        orderable: false,
                        searchable: false,
                        width: "30px",
                    },
                    {
                        targets: [1, 2, 3, -1], // -1 = dernière colonne (Actions)
                        responsivePriority: 1, // Toujours visible
                    },
                    {
                        targets: function (idx, data, node) {
                            // Cache tout sauf colonne 0, 1, 2, 3 et la dernière
                            const totalCols = node.length;
                            return idx >= 4 && idx < totalCols - 1;
                        },
                        className: "none",
                    },
                ],
            });

            // SOLUTION : Force le recalcul après initialisation
            setTimeout(() => {
                dataTable.columns.adjust().responsive.recalc();
            }, 100);
        }
    });
}

// Initialisation lors du chargement initial
document.addEventListener("DOMContentLoaded", initDataTables);

// Réinitialisation automatique à chaque rendu Turbo
document.addEventListener("turbo:load", initDataTables);

// Correction DataTable lors du toggle sidebar
function toggleSidebarDesktop() {
    document.getElementById("sidebar").classList.toggle("collapsed");

    setTimeout(function () {
        if ($.fn.DataTable) {
            $(".dataTable").each(function () {
                var table = $(this).DataTable();
                if (table) {
                    table.columns.adjust();
                    table.responsive.recalc();
                }
            });
        }
    }, 410);
}
