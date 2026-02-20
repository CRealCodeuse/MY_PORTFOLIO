/**************************FAQ DETTE****************************/

const FaqQuestionAdoption = document.querySelector('.FaqQuestionAdoption');
const FaqReponseAdoption = document.querySelector('.FaqReponseAdoption');
const FaqQuestionNaissance = document.querySelector('.FaqQuestionNaissance');
const FaqReponseNaissance = document.querySelector('.FaqReponseNaissance');
const FaqQuestionGrossesse = document.querySelector('.FaqQuestionGrossesse');
const FaqReponseGrossesse = document.querySelector('.FaqReponseGrossesse');
const FaqQuestionPrepare = document.querySelector('.FaqQuestionPrepare');
const FaqReponsePrepare = document.querySelector('.FaqReponsePrepare');
const FaqQuestionActivite = document.querySelector('.FaqQuestionActivite');
const FaqReponseActivite = document.querySelector('.FaqReponseActivite');

//OUVRIR REPONSES
FaqQuestionAdoption.addEventListener('click', () => {
    FaqReponseAdoption.style.display = 'block';
    FaqReponseNaissance.style.display = 'none';
    FaqReponseGrossesse.style.display = 'none';
    FaqReponsePrepare.style.display = 'none';
    FaqReponseActivite.style.display = 'none';
});

FaqQuestionNaissance.addEventListener('click', () => {
    FaqReponseAdoption.style.display = 'none';
    FaqReponseNaissance.style.display = 'block';
    FaqReponseGrossesse.style.display = 'none';
    FaqReponsePrepare.style.display = 'none';
    FaqReponseActivite.style.display = 'none';
});

FaqQuestionGrossesse.addEventListener('click', () => {
    FaqReponseAdoption.style.display = 'none';
    FaqReponseNaissance.style.display = 'none';
    FaqReponseGrossesse.style.display = 'block';
    FaqReponsePrepare.style.display = 'none';
    FaqReponseActivite.style.display = 'none';
});

FaqQuestionPrepare.addEventListener('click', () => {
    FaqReponseAdoption.style.display = 'none';
    FaqReponseNaissance.style.display = 'none';
    FaqReponseGrossesse.style.display = 'none';
    FaqReponsePrepare.style.display = 'block';
    FaqReponseActivite.style.display = 'none';
});

FaqQuestionActivite.addEventListener('click', () => {
    FaqReponseAdoption.style.display = 'none';
    FaqReponseNaissance.style.display = 'none';
    FaqReponseGrossesse.style.display = 'none';
    FaqReponsePrepare.style.display = 'none';
    FaqReponseActivite.style.display = 'block';
});

/*****************************************/