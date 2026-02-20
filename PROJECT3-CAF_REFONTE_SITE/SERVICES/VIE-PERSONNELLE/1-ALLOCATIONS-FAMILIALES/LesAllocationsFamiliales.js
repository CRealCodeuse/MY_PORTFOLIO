/**************************FAQ DETTE****************************/

const FaqQuestionEnfantTravaille = document.querySelector('.FaqQuestionEnfantTravaille');
const FaqReponseEnfantTravaille = document.querySelector('.FaqReponseEnfantTravaille');
const Question3Enfants = document.querySelector('.FaqQuestion3Enfants');
const FaqReponse3Enfants = document.querySelector('.FaqReponse3Enfants');
const QuestionSeparation = document.querySelector('.FaqQuestionSeparation');
const FaqReponseSeparation = document.querySelector('.FaqReponseSeparation');
const QuestionFoyer = document.querySelector('.FaqQuestionFoyer');
const FaqReponseFoyer = document.querySelector('.FaqReponseFoyer');
const QuestionTemps = document.querySelector('.FaqQuestionTemps');
const FaqReponseTemps = document.querySelector('.FaqReponseTemps');

//OUVRIR REPONSES
FaqQuestionEnfantTravaille.addEventListener('click', () => {
    FaqReponseEnfantTravaille.style.display = 'block';
    FaqReponse3Enfants.style.display = 'none';
    FaqReponseSeparation.style.display = 'none';
    FaqReponseFoyer.style.display = 'none';
    FaqReponseTemps .style.display = 'none';
});

Question3Enfants.addEventListener('click', () => {
    FaqReponseEnfantTravaille.style.display = 'none';
    FaqReponse3Enfants.style.display = 'block';
    FaqReponseSeparation.style.display = 'none';
    FaqReponseFoyer.style.display = 'none';
    FaqReponseTemps.style.display = 'none';
});

QuestionSeparation.addEventListener('click', () => {
    FaqReponseEnfantTravaille.style.display = 'none';
    FaqReponse3Enfants.style.display = 'none';
    FaqReponseSeparation.style.display = 'block';
    FaqReponseFoyer.style.display = 'none';
    FaqReponseTemps.style.display = 'none';
});

QuestionFoyer.addEventListener('click', () => {
    FaqReponseEnfantTravaille.style.display = 'none';
    FaqReponse3Enfants.style.display = 'none';
    FaqReponseSeparation.style.display = 'none';
    FaqReponseFoyer.style.display = 'block';
    FaqReponseTemps.style.display = 'none';
});

QuestionTemps.addEventListener('click', () => {
    FaqReponseEnfantTravaille.style.display = 'none';
    FaqReponse3Enfants.style.display = 'none';
    FaqReponseSeparation.style.display = 'none';
    FaqReponseFoyer.style.display = 'none';
    FaqReponseTemps.style.display = 'block';
});

/*****************************************/