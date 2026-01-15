//BARRE DE NAVIGATION
const Hamburger = document.querySelector('.Hamburger');
const LiensNavigation = document.querySelector('.LiensNavigation');

Hamburger.addEventListener('click', () => {
    LiensNavigation.classList.toggle('active');
});

//BOUTONS ALLOCATAIRES ET PROFESSIONNELS
const Allocataires = document.querySelector('.SectionAllocataires');
const Professionnels = document.querySelector('.SectionProfessionnels');
const LiensAllocataires = document.querySelector('.LiensAllocataires');
const LiensProfessionnels = document.querySelector('.LiensProfessionnels');

if (Allocataires && LiensAllocataires) {
    Allocataires.addEventListener('click', () => {
        LiensAllocataires.classList.toggle('active');
        LiensProfessionnels.classList.remove('active');
    });
}

if (Professionnels && LiensProfessionnels) {
    Professionnels.addEventListener('click', () => {
        LiensProfessionnels.classList.toggle('active');
        LiensAllocataires.classList.remove('active');
    });
}

////////////////////////////////////////////////////////////////

//VARIABLES DES BOUTONS DU FORMULAIRE DE CONTACT
const Connexion = document.querySelector('.BoutonConnexion');
const PopUp = document.querySelector('.PopUpConnexion');
const Fermer = document.querySelector('.FermerConnexion');
const FormulaireConnexion = document.querySelector('.FormulaireConnexion');

//OUVRIR POP UP DE CONTACT
Connexion.addEventListener('click', () => {
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

/////////////////////VERIFIER SI MARCHE CORRECTEMENT/////////////////

//AFFICHAGE DU BOUTON AUTOMATIQUE SELON SECTION SELECTIONNEE
const nomFichier = window.location.pathname.split('/').pop();

// Si le nom du fichier contient "Allocataire"
if (Allocataires && nomFichier.toLowerCase().includes('allocataire')) {
    Allocataires.classList.add('active-section');
}

// Si le nom du fichier contient "Professionnel"
if (Professionnels && nomFichier.toLowerCase().includes('professionnel')) {
    Professionnels.classList.add('active-section');
}

///////////////POP UP CONGE NAISSANCE /////////////////

//VARIABLES DES BOUTONS DU FORMULAIRE DE CONTACT
const CongeNaissance = document.querySelector('.Information1');
const PopUpCongeNaissance = document.querySelector('.PopUpCongeNaissance');
const FermerCongeNaissance = document.querySelector('.FermerCongeNaissance');

//OUVRIR POP UP DE CONTACT
CongeNaissance.addEventListener('click', () => {
    PopUpCongeNaissance.style.display = 'block';   
});

//FERMER POP UP DE CONTACT
FermerCongeNaissance.addEventListener('click', () => {
   PopUpCongeNaissance.style.display = 'none'; 
});

//FERMER POP UP EN CLIQUANT EN DEHORS DE CELLE-CI
window.addEventListener('click', (e) => {
    if (e.target === PopUpCongeNaissance) {
        PopUpCongeNaissance.style.display = 'none';
    }
});

////////////POP AIDES 2026 /////////////////////////

const Aides2026 = document.querySelector('.Information2');
const PopUpAides2026 = document.querySelector('.PopUpAides2026');
const FermerAides2026 = document.querySelector('.FermerAides2026');

//OUVRIR POP UP DE CONTACT
Aides2026.addEventListener('click', () => {
    PopUpAides2026.style.display = 'block';   
});

//FERMER POP UP DE CONTACT
FermerAides2026.addEventListener('click', () => {
   PopUpAides2026.style.display = 'none'; 
});

//FERMER POP UP EN CLIQUANT EN DEHORS DE CELLE-CI
window.addEventListener('click', (e) => {
    if (e.target === PopUpAides2026) {
        PopUpAides2026.style.display = 'none';
    }
});

////////////POP UP PRIMES NOEL 2025////////////////////////

const PrimeNoel2025 = document.querySelector('.Information3');
const PopUpPrimeNoel2025 = document.querySelector('.PopUpPrimeNoel2025');
const FermerPrimeNoel2025 = document.querySelector('.FermerPrimeNoel2025');

//OUVRIR POP UP DE CONTACT
PrimeNoel2025.addEventListener('click', () => {
    PopUpPrimeNoel2025.style.display = 'block';   
});

//FERMER POP UP DE CONTACT
FermerPrimeNoel2025.addEventListener('click', () => {
   PopUpPrimeNoel2025.style.display = 'none'; 
});

//FERMER POP UP EN CLIQUANT EN DEHORS DE CELLE-CI
window.addEventListener('click', (e) => {
    if (e.target === PopUpPrimeNoel2025) {
        PopUpPrimeNoel2025.style.display = 'none';
    }
});

////////////////POP UP CYBERATTAQUE////////////////////

const Cyberattaque = document.querySelector('.Information4');
const PopUpCyberattaque = document.querySelector('.PopUpCyberattaque');
const FermerCyberattaque = document.querySelector('.FermerCyberattaque');

//OUVRIR POP UP DE CONTACT
Cyberattaque.addEventListener('click', () => {
    PopUpCyberattaque.style.display = 'block';   
});

//FERMER POP UP DE CONTACT
FermerCyberattaque.addEventListener('click', () => {
   PopUpCyberattaque.style.display = 'none'; 
});

//FERMER POP UP EN CLIQUANT EN DEHORS DE CELLE-CI
window.addEventListener('click', (e) => {
    if (e.target === PopUpCyberattaque) {
        PopUpCyberattaque.style.display = 'none';
    }
});

////////////////FAQ DETTE////////////////////////////////////

const QuestionDette = document.querySelector('.FaqQuestionDette');
const FaqReponseDette = document.querySelector('.FaqReponseDette');
const QuestionAides = document.querySelector('.FaqQuestionAides');
const FaqReponseAides = document.querySelector('.FaqReponseAides');
const QuestionDocument = document.querySelector('.FaqQuestionDocument');
const FaqReponseDocument = document.querySelector('.FaqReponseDocument');
const QuestionDemarches = document.querySelector('.FaqQuestionDemarches');
const FaqReponseDemarches = document.querySelector('.FaqReponseDemarches');

//OUVRIR REPONSES
QuestionDette.addEventListener('click', () => {
    FaqReponseDette.style.display = 'block';
    FaqReponseAides.style.display = 'none';
    FaqReponseDocument.style.display = 'none';
    FaqReponseDemarches.style.display = 'none';
});

QuestionAides.addEventListener('click', () => {
    FaqReponseDette.style.display = 'none';
    FaqReponseAides.style.display = 'block';
    FaqReponseDocument.style.display = 'none';
    FaqReponseDemarches.style.display = 'none';
});

QuestionDocument.addEventListener('click', () => {
    FaqReponseDette.style.display = 'none';
    FaqReponseAides.style.display = 'none';
    FaqReponseDocument.style.display = 'block';
    FaqReponseDemarches.style.display = 'none';
});

QuestionDemarches.addEventListener('click', () => {
    FaqReponseDette.style.display = 'none';
    FaqReponseAides.style.display = 'none';
    FaqReponseDocument.style.display = 'none';
    FaqReponseDemarches.style.display = 'block';
});
