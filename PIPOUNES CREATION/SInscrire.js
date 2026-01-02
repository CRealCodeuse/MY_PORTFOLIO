function SInscrire ()
{
    var name = document.forms["SInscrire"]["nom"];
    var surname = document.forms["SInscrire"]["Prenom"];
    var birthdate = document.forms["SInscrire"]["datedenaissance"];
    var email = document.forms["SInscrire"]["email"];
    var phone = document.forms["SInscrire"]["Telephone"];
    var adress = document.forms["SInscrire"]["Adresse Postale"];
    var password = document.forms["SInscrire"]["motdepasse"];

    if (surname.value == " " )
    {
        alert("Mettez votre prénom.");
        surname.focus();
        return false; 
    }

    // if (name.value == " " )
    // {
    //     alert("Mettez votre nom.");
    //     name.focus();
    //     return false; 
    // }
}

