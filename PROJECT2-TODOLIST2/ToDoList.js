// Sélectionner toutes les cellules éditables
const cells = document.querySelectorAll('td[contenteditable="true"]');

// GÉRER L'ÉDITION DES CELLULES
cells.forEach(cell => { // Pour chaque cellule
    // Marquer si la cellule a été modifiée
    let hasBeenModified = false; // Initialement non modifiée
    
    // Au focus (clic sur la cellule)
    cell.addEventListener('focus', function() { // Au focus
        const checkbox = this.querySelector('.checkbox'); // Récupérer la checkbox
        const textOnly = this.textContent.trim(); // Récupérer uniquement le texte
        
        // Liste de toutes les valeurs par défaut (anglais + Français)
        const defaultValues = [ // Valeurs par défaut
            '...', // Texte par défaut
            'Acheter des tomates', // Texte par défaut
            'Réviser la leçon de maths', // Texte par défaut
            'Faire la vaisselle', // Texte par défaut
            "Faire le brouillon du projet", // Texte par défaut
            'Buy tomatoes', // Texte par défaut
            'Review the math lesson', // Texte par défaut
            'Wash the dishes', // Texte par défaut
            "Do the project's template" // Texte par défaut
        ];
        
        // Normaliser le texte en remplaçant les apostrophes courbes par des droites
        const normalizedText = textOnly.replace(/'/g, "'");

        // Si jamais modifiée ET contient un texte par défaut
        if (!hasBeenModified && defaultValues.includes(textOnly)) {
            // Vider uniquement le texte, garder la checkbox
            this.innerHTML = ''; // Vider la cellule
            if (checkbox) { // Si la checkbox existe
                this.appendChild(checkbox); // Ajouter la checkbox
            }
        }
    });
    
    // Empêcher la suppression de la checkbox lors de l'édition
    cell.addEventListener('input', function() { // Au changement de contenu
        const checkbox = this.querySelector('.checkbox'); // Récupérer la checkbox
        
        // Si la checkbox a disparu, la recréer
        if (!checkbox) { // Si pas de checkbox
            const newCheckbox = document.createElement('input'); // Créer une nouvelle checkbox
            newCheckbox.type = 'checkbox'; // Définir le type
            newCheckbox.className = 'checkbox'; // Définir la classe
            newCheckbox.title = 'checkbox'; // Définir le titre
            newCheckbox.contentEditable = 'false'; // Rendre non éditable
            newCheckbox.onclick = function(event) { // Empêcher la propagation du clic
                event.stopPropagation(); // Empêcher la propagation
            };
            
            // Insérer la checkbox au début
            this.insertBefore(newCheckbox, this.firstChild); 
        }
    });

//FORCER LE CURSEUR APRÈS LA CHECKBOX AU CLIC
cell.addEventListener('click', function(e) {
    const checkbox = this.querySelector('.checkbox');
    
    if (checkbox && e.target !== checkbox) {
        const selection = window.getSelection();
        const range = document.createRange();
        const textOnly = this.textContent.trim();
        
        // ✅ Vérifier la langue
        const AnglaisButton = document.querySelector('.Anglais');
        const isEnglish = AnglaisButton && AnglaisButton.classList.contains('clicked');
        
        // ✅ CORRECTION : Inverser la logique
        const defaultValues = isEnglish ? [
            // Si ANGLAIS
            '...',
            'Buy tomatoes',
            'Review the math lesson',
            'Wash the dishes',
            "Do the project's template"
        ] : [
            // Si FRANÇAIS
            '...',
            'Acheter des tomates',
            'Réviser la leçon de maths',
            'Faire la vaisselle',
            'Faire le brouillon du projet'
        ];
        
        if (!hasBeenModified && defaultValues.includes(textOnly)) {
            this.innerHTML = '';
            if (checkbox) {
                this.appendChild(checkbox);
            }
        }
        
        // ✅ CORRECTION : hasBeenModified au lieu de isModified
        if (hasBeenModified) {
            range.selectNodeContents(this);
            range.collapse(false);
        } else {
            range.setStartAfter(checkbox);
            range.collapse(true);
        }
        
        selection.removeAllRanges();
        selection.addRange(range);
    }
});

//EMPECHER L'ÉCRITURE AVANT LA CHECKBOX
cell.addEventListener('keydown', function(e) {  // Au keydown
    const checkbox = this.querySelector('.checkbox'); // Récupérer la checkbox
    const selection = window.getSelection(); // Récupérer la sélection
    
    if (checkbox && selection.anchorOffset === 0) { 
        // Si on est à la position 0 (avant la checkbox)
        
        // TRAITER ENTER EN PREMIER (avant de le bloquer)
        if (e.key === 'Enter') { // Si Enter
            e.preventDefault(); // Empêcher le retour à la ligne
            
            // Trouver l'index de la cellule actuelle
            const currentCell = this; // Cellule actuelle
            const currentIndex = Array.from(cells).indexOf(currentCell); // Index de la cellule actuelle
            
            // Calculer l'index de la cellule en dessous (même colonne, ligne suivante)
            const columnsPerRow = 4; // Nombre de colonnes dans le tableau
            const nextIndex = currentIndex + columnsPerRow; // Index de la cellule en dessous
            
            // Si la cellule suivante existe
            if (nextIndex < cells.length) { // Si la cellule en dessous existe
                const nextCell = cells[nextIndex]; // Récupérer la cellule en dessous
                nextCell.focus(); // Placer le focus sur la cellule en dessous
                
                // Placer le curseur après la checkbox de la cellule suivante
                const nextCheckbox = nextCell.querySelector('.checkbox'); // Récupérer la checkbox de la cellule suivante
                const range = document.createRange(); // Créer une nouvelle plage
                const newSelection = window.getSelection(); // Récupérer la sélection
                
                if (nextCheckbox) { // Si la checkbox existe
                    range.setStartAfter(nextCheckbox); // Définir le début après la checkbox
                } else { // Si pas de checkbox (au cas où)
                    range.selectNodeContents(nextCell); // Sélectionner tout le contenu de la cellule
                }
                range.collapse(true); // Collapser la plage
                newSelection.removeAllRanges(); // Supprimer les plages existantes
                newSelection.addRange(range); // Ajouter la nouvelle plage
            }
            return; // Sortir de la fonction
        }
        
        // Bloquer TOUTE autre saisie de caractères (lettres, chiffres, symboles, espace, etc.)
        if (e.key.length === 1 || e.key === ' ') { // Si une touche de caractère ou espace
            e.preventDefault(); // Empêcher l'écriture
            
            // Replacer le curseur après la checkbox
            const range = document.createRange(); // Créer une nouvelle plage
            range.setStartAfter(checkbox); // Définir le début après la checkbox
            range.collapse(true); // Collapser la plage
            selection.removeAllRanges(); // Supprimer les plages existantes
            selection.addRange(range); // Ajouter la nouvelle plage
            return;
        }
        
        // Bloquer les mouvements et suppressions
        if (e.key === 'ArrowLeft' || e.key === 'Home' || e.key === 'Backspace' || e.key === 'Delete') {
            e.preventDefault(); // Bloquer le mouvement
            
            // Replacer le curseur après la checkbox
            const range = document.createRange(); // Créer une nouvelle plage
            range.setStartAfter(checkbox); // Définir le début après la checkbox
            range.collapse(true); // Collapser la plage
            selection.removeAllRanges(); // Supprimer les plages existantes
            selection.addRange(range); //
        }
    }
    
    // Gérer Enter même si on n'est PAS à la position 0
    if (e.key === 'Enter') { // Si Enter
        e.preventDefault(); // Empêcher le retour à la ligne
        
        const currentCell = this; // Cellule actuelle
        const currentIndex = Array.from(cells).indexOf(currentCell); // Index de la cellule actuelle
        const columnsPerRow = 4; // Nombre de colonnes dans le tableau
        const nextIndex = currentIndex + columnsPerRow; // Index de la cellule en dessous
        
        if (nextIndex < cells.length) { // Si la cellule en dessous existe
            const nextCell = cells[nextIndex]; // Récupérer la cellule en dessous
            nextCell.focus(); // Placer le focus sur la cellule en dessous
            
            const nextCheckbox = nextCell.querySelector('.checkbox'); // Récupérer la checkbox de la cellule suivante
            const range = document.createRange(); // Créer une nouvelle plage
            const newSelection = window.getSelection(); // Récupérer la sélection
            
            if (nextCheckbox) { // Si la checkbox existe
                range.setStartAfter(nextCheckbox); // Définir le début après la checkbox
            } else { // Si pas de checkbox (au cas où)
                range.selectNodeContents(nextCell); // Sélectionner tout le contenu de la cellule
            }
            range.collapse(true); // Collapser la plage
            newSelection.removeAllRanges(); // Supprimer les plages existantes
            newSelection.addRange(range); // Ajouter la nouvelle plage
        }
    }
}); // Accolade fermante ajoutée

    // Marquer comme modifiée dès qu'on tape quelque chose
    cell.addEventListener('input', function() { // Au changement de contenu
        hasBeenModified = true; // Marquer comme modifiée
    });
    
    // Si l'utilisateur quitte la cellule vide, remettre "..."
    cell.addEventListener('blur', function() { // Au blur (quitter la cellule)
    if (this.textContent.trim() === '') { // Si vide
        // Récupérer ou créer la checkbox
        let checkbox = this.querySelector('.checkbox'); // Chercher la checkbox existante
        
        if (!checkbox) { // Si pas de checkbox, en créer une
            checkbox = document.createElement('input'); // Créer une nouvelle checkbox
            checkbox.type = 'checkbox'; // Définir le type
            checkbox.className = 'checkbox'; // Définir la classe
            checkbox.title = 'checkbox'; // Définir le titre
            checkbox.contentEditable = 'false'; // Rendre non éditable
            checkbox.onclick = function(event) { // Empêcher la propagation du clic
                event.stopPropagation(); // Empêcher la propagation
            };
        }
        
        // Vider et restaurer avec checkbox + texte par défaut
        this.innerHTML = ''; // Vider la cellule
        this.appendChild(checkbox); // Ajouter la checkbox
        this.appendChild(document.createTextNode('...'));
        
        hasBeenModified = false; // Réinitialiser pour permettre un nouveau clic
    }
});
});

// BOUTON VIDER LES TÂCHES
const Vider = document.querySelector('button[class="Vider"]'); // Sélectionner le bouton "Vider"

if (Vider) { // ✅ Vérifier que le bouton existe
    Vider.addEventListener('click', function() {
        // VÉRIFIER LA LANGUE EN PREMIER
        const AnglaisButton = document.querySelector('.Anglais');
        const isEnglish = AnglaisButton && AnglaisButton.classList.contains('clicked');
        
        // ✅ CORRECTION : Inverser la logique
        const defaultValues = isEnglish ? [ 
            // Si ANGLAIS (isEnglish = true)
            'Buy tomatoes',
            'Review the math lesson',
            'Wash the dishes',
            "Do the project's template",
            '...'
        ] : [
            // Si FRANÇAIS (isEnglish = false)
            'Acheter des tomates',
            'Réviser la leçon de maths',
            'Faire la vaisselle',
            'Faire le brouillon du projet',
            '...'
        ];
        
        // Vérifier si des tâches modifiées ne sont pas cochées
        let hasUnfinishedTasks = false;
        
        cells.forEach(cell => {
            const checkbox = cell.querySelector('.checkbox');
            const textContent = cell.textContent.trim();
            
            if (textContent !== '' && !defaultValues.includes(textContent) && checkbox && !checkbox.checked) {
                hasUnfinishedTasks = true;
            }
        });
        
        // ✅ CORRECTION : Inverser les messages
        if (hasUnfinishedTasks) {
            const message = isEnglish ?
                "You haven't finished all your tasks!" : // Anglais
                "Tu n'as pas fini toutes tes tâches !"; // Français
            
            showToast(message, 'error');
            return;
        }
        
        // Sinon, réinitialiser toutes les cellules
        cells.forEach((cell, index) => {
            let checkbox = cell.querySelector('.checkbox');
            
            if (!checkbox) {
                checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'checkbox';
                checkbox.title = 'checkbox';
                checkbox.contentEditable = 'false';
                checkbox.onclick = function(event) {
                    event.stopPropagation();
                };
            }
            
            checkbox.checked = false;
            
            const defaultText = defaultValues[index] || '...';
            cell.innerHTML = '';
            cell.appendChild(checkbox);
            cell.appendChild(document.createTextNode(defaultText));
        });
        
        // ✅ CORRECTION : Inverser les messages de succès
        const successMessage = isEnglish ?
            "Good Job! New tasks incoming!" : // Anglais
            "Génial ! De nouvelles tâches arrivent !"; // Français
        showToast(successMessage, 'success');
    });
}

// Fonction pour afficher un Toast
function showToast(message, type = 'info') { // Afficher un toast 
    const toast = document.createElement('div'); // Créer un élément div pour le toast
    toast.textContent = message; // Définir le message
    
    // Styles de base
    toast.style.position = 'fixed'; // Position fixe
    toast.style.top = '20px'; // Distance du haut
    toast.style.right = '20px'; // Distance de la droite
    toast.style.padding = '15px 20px'; // Padding
    toast.style.borderRadius = '8px'; // Bords arrondis
    toast.style.color = 'white'; // Couleur du texte
    toast.style.fontWeight = 'bold'; // Texte en gras
    toast.style.zIndex = '9999'; // Au-dessus des autres éléments
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)'; // Ombre
    toast.style.fontSize = '14px'; // Taille de la police
    toast.style.maxWidth = '300px'; // Largeur maximale
    toast.style.opacity = '0'; // Initialement invisible
    toast.style.transform = 'translateX(400px)'; // Position initiale à droite
    toast.style.transition = 'all 0.3s ease'; // Transition pour l'animation
    
    // Couleurs selon le type
    if (type === 'success') { // Si succès
        toast.style.backgroundColor = '#4caf50'; // Vert
    } else if (type === 'error') { // Si erreur
        toast.style.backgroundColor = '#f44336'; // Rouge
    } else if (type === 'warning') { // Si avertissement
        toast.style.backgroundColor = '#ff9800'; // Orange
    } else { // Info par défaut
        toast.style.backgroundColor = '#2196f3'; // Bleu
    }
    
    document.body.appendChild(toast); // Ajouter le toast au corps de la page
    
    // Animation d'entrée
    setTimeout(() => { // Petit délai pour permettre le rendu initial
        toast.style.opacity = '1'; // Rendre visible
        toast.style.transform = 'translateX(0)'; // Position normale
    }, 10); // Délai minimal
    
    // Animation de sortie et suppression
    setTimeout(() => { // Après 3 secondes
        toast.style.opacity = '0'; // Rendre invisible
        toast.style.transform = 'translateX(400px)'; // Déplacer à droite
        setTimeout(() => toast.remove(), 300); // Supprimer après l'animation
    }, 3000); // Durée d'affichage
}

//TRADUCTION Francais/ANGLAIS
const Anglais = document.querySelector('button[class="Anglais"]'); // Sélectionner le bouton "Anglais"

let isTranslated = false; // Variable pour suivre l'état de traduction

Anglais.addEventListener('click', function() { // Au clic sur le bouton
    const translations = {
    '...': '...',
    'Que dois-je faire aujourd\'hui ?': 'What should I do today?',
    'Acheter des tomates': 'Buy tomatoes',
    'Réviser la leçon de maths': 'Review the math lesson',
    'Faire la vaisselle': 'Wash the dishes',
    'Faire le brouillon du projet': "Do the project's template",
    'Bienvenue !': 'Hey there!',
    'Voici une To Do List où tu peux écrire toutes tes tâches à accomplir.': 'Here is a To Do List where you can write down all your tasks to complete.',
    "Clique sur une cellule pour l'éditer et ajouter la tâche à faire. Tu peux aussi modifier les cases en tête de colonne si besoin.": 'Click on a cell to edit it and add your tasks to complete. You also can edit the head cells if needed.',
    "Quand tu as finis, clique sur le bouton en dessous du tableau pour l'effacer afin d'en réécrire d'autres.": 'When you\'re done, you can click the button below to clear all the tasks and start fresh.',
    'Courses': 'Groceries',
    'École': 'School',
    'Maison': 'Home',
    'Projets': 'Projects',
    'Vider les tâches': 'Empty the tasks', // ✅ Enlevez le doublon
    'English': 'Français',
    'Thème sombre': 'Dark theme',
};
    
    // Créer un objet inverse pour la traduction retour (Francais → anglais)
    const reverseTranslations = {}; // Dictionnaire inverse
    for (let key in translations) { // Parcourir les clés du dictionnaire original
        reverseTranslations[translations[key]] = key; // Inverser clé et valeur
    }
    
    // Choisir le dictionnaire approprié selon l'état
    const dictionary = isTranslated ? reverseTranslations : translations; // Dictionnaire à utiliser
    
    // Parcourir et traduire les éléments
    document.querySelectorAll('*').forEach(element => { // Pour chaque élément
        if (element.childNodes.length > 0) { // S'il a des nœuds enfants
            element.childNodes.forEach(node => { // Pour chaque nœud enfant
                if (node.nodeType === 3) { // Node de texte
                    const text = node.textContent.trim(); // Texte du nœud
                    if (dictionary[text]) { // Si le texte est dans le dictionnaire
                        node.textContent = dictionary[text]; // Traduire le texte
                    }
                }
            });
        }
    });

    // AJOUTER/RETIRER LA CLASSE 'clicked'
    if (isTranslated) {
        // Retour à l'anglais
        this.classList.remove('clicked'); // Retirer la classe
    } else { 
        // Passage au anglais
        this.classList.add('clicked'); // Ajouter la classe
    }
    
    // Inverser l'état
    isTranslated = !isTranslated; // Changer l'état de traduction
});

//THEME SOMBRE/CLAIR
const Theme = document.querySelector('button[class="Theme"]'); // Sélectionner le bouton "Thème"

let isDarkMode = false; // Variable pour suivre l'état du thème

Theme.addEventListener('click', function() {
    // Vérifier la langue actuelle
    const AnglaisButton = document.querySelector('.Anglais');
    const isEnglish = AnglaisButton && AnglaisButton.classList.contains('clicked');
    
    if (!isDarkMode) { // Activer le mode sombre
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#FFFFFF';
        
        // Garder le header en noir
        const header = document.querySelector('header');
        if (header) {
            header.style.color = '#000000';
        }
        
        // Changer les cellules blanches en grises
        const cells = document.querySelectorAll('td');
        cells.forEach(cell => {
            cell.style.backgroundColor = '#c5c5c5ff';
        });
        
        // Adapter le texte selon la langue
        Theme.textContent = isEnglish ? 'Light theme' : 'Thème clair';
        
    } else { // Désactiver le mode sombre
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        
        // Réinitialiser le header
        const header = document.querySelector('header');
        if (header) {
            header.style.color = '';
        }
        
        // Réinitialiser les cellules
        const cells = document.querySelectorAll('td, th');
        cells.forEach(cell => {
            cell.style.backgroundColor = '';
        });
        
        // Adapter le texte selon la langue
        Theme.textContent = isEnglish ? 'Dark theme' : 'Thème sombre';
    }
    
    isDarkMode = !isDarkMode;
});