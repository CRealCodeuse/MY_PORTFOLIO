//VARIABLES DES BOUTONS DU FORMULAIRE DE CONTACT
const BoutonContact = document.querySelector('.BoutonContact');
const PopUp = document.querySelector('.PopUp');
const Fermer = document.querySelector('.Fermer');
const FormulaireContact = document.querySelector('.FormulaireContact')

//OUVRIR POP UP DE CONTACT
BoutonContact.addEventListener('click', () => {
   PopUp.style.display = 'block'; 
});

//FERMER POP UP DE CONTACT
Fermer.addEventListener('click', () => {
   PopUp.style.display = 'none'; 
});

//FERMER POP UP EN CLIQUANT EN DEHORS DE CELLE-CI
window.addEventListener('click', (e) => {
    if (e.target === PopUp) {
        PopUp.style.display = 'none';
    }
});

//ENVOI DU FORMULAIRE
FormulaireContact.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupérer les valeurs
    const nom = document.querySelector('.Nom').value;
    const prenom = document.querySelector('.Prenom').value;
    const email = document.querySelector('.Email').value;
    const message = document.querySelector('.Message').value;
    
    // Créer le lien mailto
    const mailtoLink = `mailto:elise.degardin.mtd@gmail.com?body=${encodeURIComponent(
        `Nom: ${nom}\nPrénom: ${prenom}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    
    // Ouvrir le client mail
    window.location.href = mailtoLink;
    
    // Fermer la pop-up et réinitialiser le formulaire
    PopUp.style.display = 'none';
    FormulaireContact.reset();

});

//VARIABLES TRADUCTION FRANCAIS/ANGLAIS
const button = document.querySelector('.English');
let isTranslated = false;

//ACTIONS DU BOUTON DE TRADUCTION
button.addEventListener('click', function() {
    const translations = {
        // Header
        'English': 'Français',
        
        // Sections
        'Me contacter':'Contact me',
        'Bachelor Développeur Web': 'Developer Web Bachelor',
        'langages de programmation': 'programming languages',
        'BTS Services Informatiques aux Organisations': 'IT Services for Organizations BTS',
        'de manière autodidacte': 'in a self-taught way',
        'compétences': 'skills',
        'développement Fullstack': 'Fullstack development',
        'projets': 'projects',
        'Projet 1:':'1st project:',
        'Projet 2:':'2nd project:',
        'Projet 3:':'3rd project:',
        'développés': 'developed',
        'niveau de compétences': 'skill level',
        "D'autres projets": "Other projects",
        "apprentissage": "apprenticeship",
        'Langages utilisés :': 'Used languages :',
        'Points positifs :': 'Positive points :',
        'Points négatifs :': 'Negative points :',
        'TO DO LIST': 'TO DO LIST',
        'Fonctionnalités :': 'Features :',
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
        ", j'ai pu apprendre le": ", I learned",
        "et le": "and",
        "lors de mon début de formation en": "at the beginning of my training in",
        "Par la suite, j'ai appris": "Subsequently, I learned",
        "le": "the", 
        "et bien d'autres afin d'acquérir toutes les compétences nécessaires au": "and many others to learn all the skills necessary for", 
        "nécessaires au": "necessary for", 
        "Ici, vous pourrez voir les": "Here, you will be able to see the", 
        "que j'ai": "I have", 
        ", qui vous permettront de comprendre mon": ", which will allow you to understand my", 
        "viendront s'ajouter au fur et à mesure de mon": "will be added as I progress in my",
        "Les photos et les titres des projets vous mèneront directement à leurs pages.":"Captures and titles will lead you directly to their pages.",
        'Bonne visite !': 'Enjoy your visit!',
        
        // Projets
        'MES PROJETS :': 'MY PROJECTS:',
        'CE QUE J\'UTILISE :':'WHAT I\'M USING :',

        //PIPOUNES CREATION VERSION BTS
        'PIPOUNES CREATION VERSION BTS - Laissé tel quel': 'PIPOUNES CREATION BTS VERSION - Left as is',
        "C'est un site que j'ai créé au début du BTS SIO pour m'entraîner à coder un site de A à Z, avec seulement les bases apprises, mais pas complètes.": "This is a website that I created at the beginning of the BTS SIO to practice coding a website from A to Z, with only the basics learned, but not complete.",
        '- Tous les liens redirigent vers leur page correspondante.': '- Every links redirect to their corresponding page.',
        "- Il est possible de s'inscrire à la Newsletter du site via un formulaire d'inscription.": "- It is possible to subscribe to the site's Newsletter via a registration form.",
        '- Un endroit pour se connecter ou créer un compte client.': '- A place to log in or create a customer account.',
        '- Code basique, manque de structure et de lisibilité.': '- Basic code, lack of structure and readability.',
        
        // ToDoList
        'TO DO LIST - Terminé': 'TO DO LIST - Complete',
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

        //REFONTE SITE CAF
        'REFONTE DU SITE DE LA CAF - En construction':'CAF WEBSITE REDESIGN - Under construction',
        "Je ne trouve pas le site de la CAF très ergonomique, j'ai donc décidé de le refaire à ma façon.": "I don't find the CAF website very user-friendly, so I decided to redo it my way.",
        '- Site plus ergonomique.': '- More user-friendly site.',
        '- Navigation plus fluide.': '- Smoother navigation.',
        '- Design plus moderne.': '- More modern design.',
        
        // Compétences
        'Compétences':'Skills',
        'Dans différents projets (Portfolio, Pipounes Création, ToDoList, Refonte Site Caf).': 'In various projects (Portfolio, Pipounes Création, ToDoList, Refonte Site Caf).',
        'Dans différents projets (Portfolio, ToDoList, Refonte Site Caf).': 'In various projects (Portfolio, ToDoList, Refonte Site Caf).',
        'Appris en autodidacte.': 'Self-taught.',
        'Appris en autodidacte.': 'Self-taught.',
        'Quelques bases apprises en BTS SIO puis en autodidacte.': 'Some basics learned in BTS SIO then self-taught.',
        
        // Outils
        'Outils informatiques':'Tech tools',
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

    // Changer le texte du bouton AVEC IMAGE DE DRAPEAU
    button.innerHTML = isTranslated 
        ? '<img src="PorfImages/Flag - England.png" alt="UK" width="20px" height="15px"> English' 
        : '<img src="PorfImages/Flag - France.svg.png" alt="FR" width="20px" height="15px"> Français';
    
    isTranslated = !isTranslated;
});