// Gestion générique des sous-menus déroulants avec jQuery
// Gestion générique des sous-menus déroulants (compatible Turbo)
document.addEventListener("click", function (e) {
    const btn = e.target.closest(".submenu-btn");
    if (!btn) return;

    const targetId = btn.dataset.target;
    const submenu = document.getElementById(targetId);
    const arrow = btn.querySelector("svg");

    // Fermer les autres sous-menus
    document.querySelectorAll(".submenu-btn").forEach((otherBtn) => {
        if (otherBtn !== btn) {
            const otherTarget = otherBtn.dataset.target;
            const otherSubmenu = document.getElementById(otherTarget);
            if (otherSubmenu) otherSubmenu.style.maxHeight = "0px";
            otherBtn.querySelector("svg")?.classList.remove("rotate-180");
        }
    });

    // Toggle sous-menu courant
    if (submenu.style.maxHeight && submenu.style.maxHeight !== "0px") {
        submenu.style.maxHeight = "0px";
        arrow.classList.remove("rotate-180");
    } else {
        submenu.style.maxHeight = submenu.scrollHeight + "px";
        arrow.classList.add("rotate-180");
    }
});

// Fermer la sidebar mobile quand un lien est cliqué
$("#sidebar a").click(function () {
    if ($(window).width() < 768) {
        // si écran mobile
        $("#sidebar").addClass("mobile-hidden"); // cache la sidebar
        $("#mobile-overlay").removeClass("active"); // retire l'overlay
    }
});

// Gestion menu utilisateur (profil)
function toggleUserMenu() {
    const $menu = $("#userMenu");
    if ($menu.hasClass("opacity-0")) {
        $menu
            .removeClass("opacity-0 scale-95 pointer-events-none")
            .addClass("opacity-100 scale-100");
    } else {
        $menu
            .addClass("opacity-0 scale-95 pointer-events-none")
            .removeClass("opacity-100 scale-100");
    }
}

// Gestion du mode sombre
document.addEventListener("turbo:load", () => {
    // Empêche de redéclarer plusieurs fois les mêmes variables
    // if (window.__DARK_MODE_INITIALIZED__) return;
    // window.__DARK_MODE_INITIALIZED__ = true;

    const $html = $("html");
    const $icon = $("#darkModeIcon");

    if (!$icon.length) return;

    function setDarkMode(isDark) {
        if (isDark) {
            $html.addClass("dark");
            $icon.html(`
                <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
                <path stroke="currentColor" stroke-width="2"
                    d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42
                       M18.36 18.36l1.42 1.42M1 12h2M21 12h2
                       M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            `);
        } else {
            $html.removeClass("dark");
            $icon.html(`
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 12.79A9 9 0 1111.21 3 
                       7 7 0 0021 12.79z"/>
            `);
        }
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    const theme = localStorage.getItem("theme");
    setDarkMode(theme === "dark");

    $("#darkModeToggle")
        .off("click")
        .on("click", () => {
            setDarkMode(!$html.hasClass("dark"));
        });
});

// Reduction et affichage sidebar sur grand écran
function toggleSidebarDesktop() {
    document.getElementById("sidebar").classList.toggle("collapsed");
}

// Gestion de la sidebar mobile
function toggleSidebar() {
    $("#sidebar").toggleClass("mobile-hidden");
    $("#mobile-overlay").toggleClass("active");
}

// Gere le chargement de page lente apres une periode d'inactivite
// let lastActivity = Date.now();
// const MAX_IDLE = 60 * 1000; // 1 minute

// document.addEventListener("mousemove", () => (lastActivity = Date.now()));
// document.addEventListener("keydown", () => (lastActivity = Date.now()));

// document.addEventListener("turbo:click", (event) => {
//     if (Date.now() - lastActivity > MAX_IDLE) {
//         event.preventDefault();
//         const link = event.target.closest("a");
//         if (link) window.location.href = link.href;
//     }
// });
