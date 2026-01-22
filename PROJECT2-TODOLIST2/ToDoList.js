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
        
        // Liste de toutes les valeurs par défaut (anglais + français)
        const defaultValues = [ // Valeurs par défaut
            '...', // Texte par défaut
            'Buy tomatoes', // Texte par défaut
            'Review the math lesson', // Texte par défaut
            'Wash the dishes', // Texte par défaut
            "Do the project's template", // Texte par défaut
            'Acheter des tomates', // Texte par défaut
            'Réviser la leçon de maths', // Texte par défaut
            'Faire la vaisselle', // Texte par défaut
            'Faire le brouillon du projet' // Texte par défaut
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
cell.addEventListener('click', function(e) { // Au clic dans la cellule
    const checkbox = this.querySelector('.checkbox'); // Récupérer la checkbox
    
    if (checkbox && e.target !== checkbox) { // Si la checkbox existe et le clic n'est pas sur elle
        const selection = window.getSelection(); // Récupérer la sélection
        const range = document.createRange(); // Créer une nouvelle plage
        const textOnly = this.textContent.trim(); // Récupérer le texte
        
        
        // Définir les valeurs par défaut selon la langue
        const defaultValues = isFrench ? [ // Si français
            '...', // Texte par défaut
            'Acheter des tomates', // Texte par défaut
            'Réviser la leçon de maths', // Texte par défaut
            'Faire la vaisselle', // Texte par défaut
            'Faire le brouillon du projet' // Texte par défaut
        ] : [
            '...', // Texte par défaut
            'Buy tomatoes', // Texte par défaut
            'Review the math lesson', // Texte par défaut
            'Wash the dishes', // Texte par défaut
            'Do the project\'s template' // Texte par défaut
        ];
        // Si jamais modifiée ET contient un texte par défaut
        if (!hasBeenModified && defaultValues.includes(textOnly)) {
            // Vider uniquement le texte, garder la checkbox
            this.innerHTML = ''; // Vider la cellule
            if (checkbox) { // Si la checkbox existe
                this.appendChild(checkbox); // Ajouter la checkbox
            }
        }
        
        if (isModified) { 
            // Cellule modifiée : placer le curseur à la fin du texte
            range.selectNodeContents(this); // Sélectionner tout le contenu
            range.collapse(false); // false = à la fin
        } else {
            // Cellule non modifiée : placer le curseur après la checkbox
            range.setStartAfter(checkbox); // Définir le début après la checkbox
            range.collapse(true); // Collapser la plage
        }
        
        selection.removeAllRanges(); // Supprimer les plages existantes
        selection.addRange(range); // Ajouter la nouvelle plage
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

Vider.addEventListener('click', function() { // Au clic sur le bouton
    // VÉRIFIER LA LANGUE EN PREMIER
    const frenchButton = document.querySelector('.Francais'); // Sélectionner le bouton "Francais"
    const isFrench = frenchButton && frenchButton.classList.contains('clicked'); // Vérifier si le bouton a la classe 'clicked'
    // Définir les valeurs par défaut SELON LA LANGUE
    const defaultValues = isFrench ? [ // Si français
        'Acheter des tomates', // Texte par défaut
        'Réviser la leçon de maths', // Texte par défaut
        'Faire la vaisselle', // Texte par défaut
        'Faire le modèle du site', // Texte par défaut
        '...' // Texte par défaut
    ] : [
        'Buy tomatoes', // Texte par défaut
        'Review the math lesson', // Texte par défaut
        'Wash the dishes', // Texte par défaut
        'Do the site\'s template', // Texte par défaut
        '...' // Texte par défaut
    ];
    
    // Vérifier si des tâches modifiées ne sont pas cochées
    let hasUnfinishedTasks = false;
    
    cells.forEach(cell => { // Pour chaque cellule
        const checkbox = cell.querySelector('.checkbox'); // Récupérer la checkbox
        const textContent = cell.textContent.trim(); // Récupérer le texte
        
        // Si modifié ET non coché
        if (textContent !== '' && !defaultValues.includes(textContent) && checkbox && !checkbox.checked) { // Si modifié et non coché
            hasUnfinishedTasks = true; // Marquer comme ayant des tâches non terminées
        }
    });
    
    // Afficher le toast SELON LA LANGUE
    if (hasUnfinishedTasks) { // Si des tâches non terminées existent
        const message = isFrench ? //  Vérifier la langue
            "Tu n'as pas fini toutes tes tâches !" : // Message en français
            "You haven't finished all your tasks!"; // Message en anglais
        
        showToast(message, 'error'); // Afficher le message d'erreur
        return; // Sortir de la fonction sans réinitialiser
    }
    
    // Sinon, réinitialiser toutes les cellules
    cells.forEach((cell, index) => { // Pour chaque cellule
        // Récupérer ou créer la checkbox
        let checkbox = cell.querySelector('.checkbox'); // Chercher la checkbox existante
        
        if (!checkbox) { 
            // Si pas de checkbox, en créer une
            checkbox = document.createElement('input'); // Créer une nouvelle checkbox
            checkbox.type = 'checkbox'; // Définir le type
            checkbox.className = 'checkbox'; // Définir la classe
            checkbox.title = 'checkbox'; // Définir le titre
            checkbox.contentEditable = 'false'; // Rendre non éditable
            checkbox.onclick = function(event) {  // Empêcher la propagation du clic
                event.stopPropagation(); // Empêcher la propagation
            };
        }
        
        // Réinitialiser l'état de la checkbox (décochée)
        checkbox.checked = false; // Décocher la checkbox
        
        // Réinitialiser le contenu de la cellule
        const defaultText = defaultValues[index] || '...'; // Texte par défaut selon l'index
        cell.innerHTML = ''; // Vider la cellule
        cell.appendChild(checkbox); // Ajouter la checkbox
        cell.appendChild(document.createTextNode(defaultText)); // Ajouter le texte par défaut
    });
    
    // Afficher un Toast de succès
    const successMessage = isFrench ? // Vérifier la langue
        "Génial ! De nouvelles tâches arrivent !" : // Message en français
        "Good Job! New tasks incoming!"; // Message en anglais
    showToast(successMessage, 'success'); // Afficher le message
});

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
const English = document.querySelector('button[class="English"]'); // Sélectionner le bouton "English"

let isTranslated = false; // Variable pour suivre l'état de traduction

English.addEventListener('click', function() { // Au clic sur le bouton
    const translations = { // Dictionnaire de traduction (anglais → Francais)
        '...': '...',
        'Que dois-je faire aujourd\'hui ?':'What should I do today ?',
        'Acheter des tomates':'Buy tomatoes',
        'Réviser la leçon de maths':'Review the math lesson',
        'Faire la vaisselle':'Wash the dishes',
        'Faire le brouillon du projet':'Do the project\'s template',
        'Bienvenue !':'Welcome !',
        'Voici une To Do List où tu peux écrire toutes tes tâches à accomplir.':'Here is a simple to-do list where you can write down your tasks for today (or for the week).',
        "Clique sur une cellule pour l'éditer et ajouter la tâche à faire. Tu peux aussi modifier les cases en tête de colonne si besoin.":"Click on a cell to edit it and add your task. You also can edit the head cells if needed.",
        "Quand tu as fini, clique sur le bouton en dessous du tableau pour l'effacer afin d'en écrire d'autres.":'When you\'re done, click on the button underneath the array to clear it and start fresh.',
        'Courses':'Groceries',
        'École':'School',
        'Maison':'Home',
        'Projets':'Projects',
        'Vider les tâches':'Empty the tasks',
        'English': 'Français',
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
        // Passage au français
        this.classList.add('clicked'); // Ajouter la classe
    }
    
    // Inverser l'état
    isTranslated = !isTranslated; // Changer l'état de traduction

    if (isDarkMode) {
    Theme.textContent = isTranslated ? 'Light mode':"Thème clair";
    } else {
    Theme.textContent = isTranslated ? 'Dark mode':'Thème sombre';
}
});

//THEME SOMBRE/CLAIR
const Theme = document.querySelector('button[class="Theme"]'); // Sélectionner le bouton "Thème"

let isDarkMode = false; // Variable pour suivre l'état du thème

Theme.addEventListener('click', function() { // Au clic sur le bouton
    if (!isDarkMode) { // Si le mode sombre n'est pas activé
        document.body.style.backgroundColor = '#121212'; // Couleur de fond sombre
        document.body.style.color = '#FFFFFF'; // Couleur de texte claire
        
        // Garder le header en noir
        const header = document.querySelector('header'); // Sélectionner le header
        if (header) { // Si le header existe
            header.style.color = '#000000'; // Couleur de texte noire
        }
        
        // Changer les cellules blanches en grises
        const cells = document.querySelectorAll('td'); // Sélectionner toutes les cellules
        cells.forEach(cell => { // Pour chaque cellule
            cell.style.backgroundColor = '#c5c5c5ff'; // Gris foncé
        });
        
        Theme.textContent = isTranslated ? 'Thème clair' : 'Light mode'; // Changer le texte du bouton selon la traduction
    } else { // Si le mode sombre est activé
        document.body.style.backgroundColor = ''; // Réinitialiser au CSS original
        document.body.style.color = ''; // Réinitialiser au CSS original
        
        // Réinitialiser le header
        const header = document.querySelector('header'); // Sélectionner le header
        if (header) { // Si le header existe
            header.style.color = ''; // Réinitialiser au CSS original
        }
        
        // Réinitialiser les cellules
        const cells = document.querySelectorAll('td, th'); // Sélectionner toutes les cellules et en-têtes
        cells.forEach(cell => { // Pour chaque cellule
            cell.style.backgroundColor = ''; // Réinitialiser au CSS original
        });
        
        Theme.textContent = isTranslated ? 'Thème sombre' : 'Dark mode'; // Changer le texte du bouton selon la traduction
        
    }
    isDarkMode = !isDarkMode; // Inverser l'état du thème

});
