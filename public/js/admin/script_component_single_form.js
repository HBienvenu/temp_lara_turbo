// Ouvrir le modal
function openModalFormSingle(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const modalContent = modal.querySelector('.modal-content');
    
    // Afficher le modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Animation d'apparition
    requestAnimationFrame(() => {
        modal.classList.remove('opacity-0');
        modal.classList.add('opacity-100');
        
        if (modalContent) {
            modalContent.classList.remove('scale-95', 'translate-y-4', 'opacity-0');
            modalContent.classList.add('scale-100', 'translate-y-0', 'opacity-100');
        }
    });
    
    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
}

// Fermer le modal
function closeModalForm(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const modalContent = modal.querySelector('.modal-content');
    
    // Animation de fermeture
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    
    if (modalContent) {
        modalContent.classList.remove('scale-100', 'translate-y-0', 'opacity-100');
        modalContent.classList.add('scale-95', 'translate-y-4', 'opacity-0');
    }
    
    // Cacher complètement après l'animation
    setTimeout(() => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Réinitialiser le formulaire si besoin
        const form = modal.querySelector('form');
        if (form) form.reset();
    }, 300);
}
