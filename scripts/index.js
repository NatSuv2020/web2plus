const personen=[
    {
        voornaam: 'Jan',
        familienaam: 'Janssens',
        geboorteDatum: new Date('2010-10-10'),
        email: 'jan@example.com',
        aantalKinderen: 0
    },
    {
        voornaam: 'Mieke',
        familienaam: 'Mickelsen',
        geboorteDatum: new Date('1980-01-01'),
        email: 'mieke@example.com',
        aantalKinderen: 1
    },
    {
        voornaam: 'Piet',
        familienaam: 'Pieters',
        geboorteDatum: new Date('1970-12-31'),
        email: 'piet@example.com',
        aantalKinderen: 2
    }
];
const contactList = document.getElementById("lijstPersonen");
const inputVoornaaam = document.getElementById("firstName");
const inputFamilienaam = document.getElementById("lastName");
const inputgeboorteDatum = document.getElementById("dateOfBirth");
const inputEmail = document.getElementById("email");
const inputAantalKinderen = document.getElementById("children");
const buttonNewPerson= document.getElementById("addNewPerson");
const buttonSave = document.getElementById("savePerson");

const regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let selectedPerson = -1;

const  initialize = () => {
    personen.forEach((person, index) => {
        createOption(person.voornaam, person.familienaam, index);
    } )
    buttonSave.addEventListener("click", saveOption);
    buttonNewPerson.addEventListener("click", clearForm );
}
const createOption = (firstName, lastName, index)=>{
    let opt = document.createElement('option');
    contactList.appendChild(opt);
    opt.innerHTML = firstName + " " + lastName;
    opt.addEventListener("click", () => editOption(index));
}
const editOption =(index)=>{selectedPerson=index;
   const person = personen[index];
   inputVoornaaam.value = person.voornaam;
   inputFamilienaam.value = person.familienaam;
   inputEmail.value = person.email;
   inputgeboorteDatum.value = person.geboorteDatum.toISOString().slice(0,10);
   inputAantalKinderen.value = person.aantalKinderen;
}
const clearForm = () =>{
    inputVoornaaam.value = "";
    inputFamilienaam.value = "";
    inputEmail.value = "";
    inputgeboorteDatum.value = "";
    inputAantalKinderen.value = "";
    selectedPerson = -1;
    contactList.selectedIndex = -1;
}
const saveOption = () =>{
    if(!inputVoornaaam.value.trim()){
        alert("First name must be filled");
        return;
    }
    if(!inputFamilienaam.value.trim()) {
        alert("Last name must be filled");
        return;
    }
        if(!isValidDate(inputgeboorteDatum.value)){
            alert("Birthdate is not correct");
            return;
    }
    if(!regexpEmail.test(inputEmail.value)){
        alert("Email is not correct");
        return;
    }
    if(isNaN(inputAantalKinderen.value)){
        alert("Amount must be a number");
        return;
    }
    const person = selectedPerson >-1? personen[selectedPerson] : { };
    person.voornaam = inputVoornaaam.value;
    person.familienaam = inputFamilienaam.value;
    person.aantalKinderen = inputAantalKinderen.value;
    person.geboorteDatum =new Date(inputgeboorteDatum.value);
    person.email = inputEmail.value;

    if(selectedPerson > -1 ){
        console.log(selectedPerson);
        const option = contactList.getElementsByTagName("option")[selectedPerson];
        option.innerHTML= person.voornaam+" "+person.familienaam;
        personen[selectedPerson].familienaam= inputFamilienaam.value;
        personen[selectedPerson].email=inputEmail.value;
        personen[selectedPerson].geboorteDatum=new Date(inputgeboorteDatum.value);
        personen[selectedPerson].aantalKinderen=inputAantalKinderen.value;
        personen[selectedPerson].voornaam= inputVoornaaam.value;
        clearForm();
        return;
    }
    personen.push(person);
   createOption(person.voornaam, person.familienaam, personen.length-1);
   clearForm();
}
function isValidDate(dateString) {
    let regExpBirthday = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
    if (!regExpBirthday.test(dateString)) {
        return false;
    }
    let parts = dateString.split("-");
    let day = parseInt(parts[2], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[0], 10);
    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
        return false;
    }
    let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    }
    return day > 0 && day <= monthLength[month - 1];
};
window.addEventListener("load", initialize);


