//TRADUCTION FRANCAIS/ANGLAIS
const button = document.querySelector('.English');
let isTranslated = false;

button.addEventListener('click', function() {
    const translations = {
        // Header
        'English': 'Français',
        
        // Sections
        'Bachelor Développeur Web': 'Developer Web Bachelor',
        'langages de programmation': 'programming languages',
        'BTS Services Informatiques aux Organisations': 'IT Services for Organizations BTS',
        'de manière autodidacte': 'in a self-taught way',
        'compétences': 'skills',
        'développement Fullstack': 'Fullstack development',
        'projets': ' projects ',
        'développés': 'developed',
        'niveau de compétences': 'skill level',
        "D'autres projets": "Other projects",
        "apprentissage": "apprenticeship",
        'Langages utilisés': 'Used languages',
        'Points positifs': 'Positive points',
        'Points négatifs': 'Negative points',
        'TO DO LIST': 'TO DO LIST',
        'Fonctionnalités': 'Features',
        'TIC TAC TOE - En construction': 'TIC TAC TOE - Under construction',
        'COMPETENCES': 'SKILLS',
        'Maîtrise sur 5': 'Knowledge out of 5',
        'OUTILS INFORMATIQUES': 'COMPUTER TOOLS',
        'A VENIR': 'COMING SOON',

        // Présentation
        'Bienvenue sur mon portfolio !': 'Welcome on my portfolio!',
        "Je m'appelle Elise, j'ai 29 ans et je suis actuellement en": "My name is Elise, I am 29 years old and I am currently in a",
        "en alternance.": "in work-study.",
        "Concernant les": "Regarding",
        ", j'ai pu apprendre le": " I learned",
        "et le": "and",
        "lors de mon début de formation en": "at the beginning of my training in",
        ". Par la suite, j'ai appris": ". Subsequently, I learned ",
        "le": "the", 
        "et bien d'autres afin d'apprendre toutes les compétences nécessaires au": "and many others to learn all the skills necessary for", 
        "nécessaires au": "necessary for", 
        "Ici, vous pourrez voir les": "Here, you will be able to see the ", 
        "que j'ai": "I have", 
        ", qui vous permettront de comprendre mon": ", which will allow you to understand my", 
        "viendront s'ajouter au fur et à mesure de mon": "will be added as I progress in my ",
        'Bonne visite !': 'Enjoy your visit!',
        
        // Projets
        'MES PROJETS :': 'MY PROJECTS:',

        //PIPOUNES CREATION VERSION BTS
        'PIPOUNES CREATION VERSION BTS': 'PIPOUNES CREATION BTS VERSION',
        "C'est un site que j'ai créé au début du BTS SIO pour m'entraîner à coder un site de A à Z, avec seulement les bases apprises, mais pas complètes.": "This is a website that I created at the beginning of the BTS SIO to practice coding a website from A to Z, with only the basics learned, but not complete.",
        '- Tous les liens redirigent vers leur page correspondante.': '- Every links redirect to their corresponding page.',
        "- Il est possible de s'inscrire à la Newsletter du site via un formulaire d'inscription.": "- It is possible to subscribe to the site's Newsletter via a registration form.",
        '- Un endroit pour se connecter ou créer un compte client.': '- A place to log in or create a customer account.',
        '- Code basique, manque de structure et de lisibilité.': '- Basic code, lack of structure and readability.',
        
        // ToDoList
        'TO DO LIST': 'TO DO LIST',
        "Pour gérer tes tâches du quotidien avec facilité, encouragements et mignonnerie, quoi de mieux ?": "To manage your daily tasks easily, with encouragement and cuteness, what else?",
        "Que ce soit pour le travail, les courses, ou même les projets personnels, elle est faite pour toi !": "Whether it's for work, shopping or even personal projects, it's made for you!",
        'Langages utilisés': 'Used languages',
        'Fonctionnalités': 'Features',
        '- Toutes les cases sont modifiables.': '- All boxes are editable.',
        '- Possibilité de cocher les tâches effectuées.': '- Possibility to check off completed tasks.',
        '- Possibilité de remettre le tableau à neuf.': '- Possibility to reset the table.',
        '- Anglais et Français disponibles.': '- English and French available.',
        '- Mode clair et mode sombre disponibles.': '- Light and dark mode available.',
        '- Félicitations si tâches effectuées.': '- Congratulations if tasks completed.',
        '- Rappels de tâches non remplies avant remise à zéro du tableau.': '- Reminders of uncompleted tasks before resetting the table.',

        // Tic Tac Toe
        "Si jamais l'envie te prends de jouer au Tic Tac Toe, fonce !": "If you ever feel like playing Tic Tac Toe, go for it!",
        '- Toutes les cases sont vides au départ.': '- All boxes are empty at the start.',
        "- Il n'est pas possible d'écrire deux fois dans la même case ou de modifier la valeur d'une case.": "- It is not possible to write twice in the same box or to modify the value of a box.",
        '- Un alignement de 3 symboles identiques fait gagner son joueur.': '- Aligning 3 identical symbols makes the player win.',
        "- Facile à coder et utiliser.": '- Easy to code and use.',

        //REFONTE SITE CAF
        'REFONTE SITE CAF - En construction': 'CAF SITE REDESIGN - Under construction',
        "Je ne trouve pas le site de la CAF très ergonomique, j'ai donc décidé de le refaire à ma façon.": "I don't find the CAF website very user-friendly, so I decided to redo it my way.",
        '- Site plus ergonomique.': '- More user-friendly site.',
        '- Navigation plus fluide.': '- Smoother navigation.',
        '- Design plus moderne.': '- More modern design.',
        
        // Compétences
        'Dans différents projets.': 'In various projects.',
        'Dans la ToDoList et dans des projets à venir.': 'In the ToDoList and in upcoming projects.',
        'Appris en autodidacte.': 'Self-taught.',
        'Appris en autodidacte.': 'Self-taught.',
        'Quelques bases apprises en BTS SIO puis en autodidacte.': 'Some basics learned in BTS SIO then self-taught.',
        
        
        
        // Outils
        'Coder mes projets.': 'To code my projects.',
        'Apprendre différents langages de programmation.': 'To learn different programming languages.',
        'Créer/modifier divers documents, bases de données futures.': 'To create/modify various documents, future databases.',
        'Suivre des développeurs et partager mes projets.': 'To follow developers and share my projects.',

        //Footer
        'Rejoins-moi sur': 'Join me on',
        'et': 'and',
    };

    // Créer l'objet inverse
    const reverseTranslations = {};
    for (const key in translations) {
        reverseTranslations[translations[key]] = key;
    }

    const dictionary = isTranslated ? reverseTranslations : translations;

    // Fonction pour traduire TOUS les nœuds texte récursivement
    function translateAllTextNodes(node) {
        // Si c'est un nœud texte
        if (node.nodeType === 3) {
        let text = node.textContent.trim();
        // Normaliser les espaces multiples
        text = text.replace(/\s+/g, ' ');
        
        if (text && dictionary[text]) {
            // Préserver les espaces originaux avant/après
            const leadingSpace = node.textContent.match(/^\s*/)[0];
            const trailingSpace = node.textContent.match(/\s*$/)[0];
            node.textContent = leadingSpace + dictionary[text] + trailingSpace;
        }
    }
        // Si c'est un élément, parcourir ses enfants
        else if (node.nodeType === 1) {
            // Ne pas traduire le bouton ni le nom
            if (node === button || node.classList.contains('NomPrenom')) {
                return;
            }
            
            // Parcourir tous les enfants
            node.childNodes.forEach(child => {
                translateAllTextNodes(child);
            });
        }
    }

    // Démarrer la traduction depuis le body
    translateAllTextNodes(document.body);

    // Changer le texte du bouton
    button.textContent = isTranslated ? 'English' : 'Français';
    
    isTranslated = !isTranslated;
});