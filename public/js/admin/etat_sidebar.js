// // Gere l'état du sidebar (ouvert/fermé) et le lien actif avec localStorage même après rechargement ou navigation Turbo avec reload partiel
// document.addEventListener("DOMContentLoaded", function () {
//     const sidebar = document.getElementById("sidebar");
//     const toggleBtn = document.querySelector("[data-sidebar-toggle]");

//     // Restaurer l'état au chargement
//     const sidebarState = localStorage.getItem("sidebarState");
//     if (sidebarState === "closed") {
//         sidebar?.classList.add("closed");
//     } else {
//         sidebar?.classList.remove("closed");
//     }

//     // Sauvegarder l'état lors du toggle
//     toggleBtn?.addEventListener("click", function () {
//         const isClosed = sidebar?.classList.contains("closed");
//         localStorage.setItem("sidebarState", isClosed ? "open" : "closed");
//     });

//     // Restaurer le lien actif
//     const currentPath = window.location.pathname;
//     const sidebarLinks = document.querySelectorAll("#sidebar a[href]");

//     sidebarLinks.forEach((link) => {
//         if (link.getAttribute("href") === currentPath) {
//             link.classList.add("active");
//             // Ouvrir le parent si c'est un sous-menu
//             const parentMenu = link.closest("[data-submenu]");
//             if (parentMenu) {
//                 parentMenu.classList.add("open");
//             }
//         } else {
//             link.classList.remove("active");
//         }
//     });
// });

// // Persister aussi pendant la navigation Turbo
// document.addEventListener("turbo:load", function () {
//     const sidebar = document.getElementById("sidebar");
//     const sidebarState = localStorage.getItem("sidebarState");

//     if (sidebarState === "closed") {
//         sidebar?.classList.add("closed");
//     } else {
//         sidebar?.classList.remove("closed");
//     }
// });
