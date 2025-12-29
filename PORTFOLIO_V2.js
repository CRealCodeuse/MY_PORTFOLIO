// Sélectionner l'élément
const nomPrenom = document.querySelector('.NomPrenom'); // Sélectionner le lien dans l'élément avec la classe 'NomPrénom'
let clickCount = 0; // Initialisation du compteur de clics

// Fonction pour créer et afficher le toast
function showToast(message) { // Créer le toast
    const toast = document.createElement('div'); // Créer l'élément toast
    toast.textContent = message; // Définir le message
    toast.style.cssText = ` // Styles de base
        position: fixed; // Position fixe
        top: 20px; // Distance du haut
        right: 20px; // Distance de la droite
        background-color: #333; // Couleur de fond
        color: white; // Couleur du texte
        padding: 15px 20px; // Padding
        border-radius: 5px; // Bords arrondis
        box-shadow: 0 2px 5px rgba(0,0,0,0.3); // Ombre
        z-index: 1000; // Au-dessus des autres éléments
        animation: slideIn 0.3s ease-out; // Animation d'entrée
    `;
    
    // Ajouter au body
    document.body.appendChild(toast); // Ajouter le toast au corps du document
    
    // Retirer après 3 secondes
    setTimeout(() => { // Démarrer la suppression
        toast.style.animation = 'slideOut 0.3s ease-out'; // Animation de sortie
        setTimeout(() => toast.remove(), 300); // Supprimer après l'animation
    }, 3000);
}

// Ajouter l'écouteur d'événements
nomPrenom.addEventListener('click', (e) => {
    e.preventDefault(); // Empêche la navigation
    clickCount++; // Incrémenter le compteur de clics
    
    if (clickCount === 1) { // Vérifier le nombre de clics
        showToast(`🎉 Vous êtes dejà sur mon portfolio !`);
    }
    else if (clickCount === 3) { // Vérifier le nombre de clics
        showToast(`🎉 Ca n'a pas changé...`);
        clickCount = 0; // Réinitialiser le compteur
    }
});

// Ajouter les animations CSS
const style = document.createElement('style'); // Créer un élément style
style.textContent = ` // Ajouter les animations
    @keyframes slideIn { // Animation d'entrée
        from { // Départ
            transform: translateX(400px); // Déplacer vers la droite
            opacity: 0; // Invisible
        }
        to { // Fin
            transform: translateX(0); // Position normale
            opacity: 1; // Visible
        }
    }
    @keyframes slideOut { // Animation de sortie
        from { // Départ
            transform: translateX(0); // Position normale
            opacity: 1; // Visible
        }
        to { // Fin
            transform: translateX(400px); // Déplacer vers la droite
            opacity: 0; // Invisible
        }
    }
`;
document.head.appendChild(style); // Ajouter le style à l'en-tête