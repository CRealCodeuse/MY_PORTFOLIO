
/****************FORMULAIRE DE CONTACT****************/

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