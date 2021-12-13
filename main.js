// Hämtar alla element från HTML:en och sparar i variabler 

let studentList = document.querySelector("#leftList");
let outputList = document.querySelector("#rightList")
let sortEdu = document.querySelector("#sortE");
let getEdu = document.querySelector("#getEdu");
let sortAgeUpBtn = document.querySelector("#sortAu");
let sortAgeDownBtn = document.querySelector("#sortAd");
let sortFirstUpBtn = document.querySelector("#sortFirstu");
let sortFirstDownBtn = document.querySelector("#sortFirstd"); 
let sortLastUpBtn = document.querySelector("#sortLastu");
let sortLastDownBtn = document.querySelector("#sortLastd");
let searchInput = document.querySelector("#search");
let searchButton = document.querySelector("#searchbutton");

// Färgar bakgrunden
document.body.style.background = "lightblue";

// Hämtar student-data och Skriver ut i DOM:en. Detta visas från från start 
async function getStudents() {
  let response = await fetch("https://api.mocki.io/v2/01047e91/students");
  let data = await response.json();
  data.forEach((student) => {
    createInputCard(student);
  });
}

// Sökknappen. Rensar outputlistan och anropar findstudent(). Visar i outpulistan
searchButton.addEventListener(("click"), () => {
  outputList.textContent = "";
  findStudent();
})

// När man valt en utbildning i dropdownen så trycker man på knappen Sort-education. 
// Rensar då outputlistan och anropar sortByEducation().
getEdu.addEventListener(("click"), () => {
  outputList.textContent = "";
  sortByEducation();
});

// Rensar outputlistan och anropar sortAgeUp(). Visar sortering med yngst först i outputlistan .
sortAgeUpBtn.addEventListener(("click"), () => {
    outputList.textContent = "";
    sortByAgeUp();
});

// Rensar outputlistan och anropar sortAgeDown(). Visar sortering med äldst först i outputlistan .
sortAgeDownBtn.addEventListener(("click"), () => {
  outputList.textContent = "";
  sortByAgeDown();
});

// Rensar outputlistan och anropar sortByFirstNameUp(). Visar sortering av förnamn i alfabetisk ordning stigande i outputlistan
sortFirstUpBtn.addEventListener(("click"), () => {
    outputList.textContent = "";
    sortByFirstNameUp();
});

// Rensar outputlistan och anropar sortByFirstNameDown(). Visar sortering av förnamn i alfabetisk ordning fallande i outputlistan 
sortFirstDownBtn.addEventListener(("click"), () => {
  outputList.textContent = "";
  sortByFirstNameDown();
});

// Rensar outputlistan och anropar sortByLastNameUp(). Visar sortering av efternamn i alfabetisk ordning stigande i outputlistan
sortLastUpBtn.addEventListener(("click"), () => {
    outputList.textContent = "";
    sortByLastNameUp();
});

// Rensar outputlistan och anropar sortByLastNameDown(). Visar sortering av efternamn i alfabetisk ordning fallande i outputlistan
sortLastDownBtn.addEventListener(("click"), () => {
  outputList.textContent = "";
  sortByLastNameDown();
});

// Hämtar data från API:et. Hämtar in värdet som skrivs i textfältet och omvandlar det till små bokstäver.
// Loopar sen igenom varje student, varpå man hämtar ut förnamn, efternamn och program.
// Skapar även en array för att spara studentens hobbys. Kontrollerar därefter om någon av studentens hobbys 
// överensstämmer med inputvärdet. Allt som hämtas från API:et görs även om till små bokstäver
let findStudent = async () => {
  let response = await fetch("https://api.mocki.io/v2/01047e91/students");
  let data = await response.json();
  
  let input = searchInput.value.toLowerCase();
  
  data.forEach((student) =>{
    let hobbies = student.hobbies;
   if(input === student.firstName.toLowerCase()){
     createOutPutCard(student);
   }
   else if(input === student.lastName.toLowerCase()){
     createOutPutCard(student);
   }
   else if(input === student.programme.toLowerCase()){
     createOutPutCard(student);
   }
   else if(input === hobbies[0] || input === hobbies[1] || input === hobbies[2]){
     createOutPutCard(student);
   }
  })
}
// Hämtar data från API:et.
// Loopar igenom datan. Kontrollerar om varje students programval överensstämmer med värdet som hämtats
// från dropdownen. Anropar createOutPutCard() och skapar listan med studenter
let sortByEducation = async () =>{
  let response = await fetch("https://api.mocki.io/v2/01047e91/students");
  let data = await response.json();
  data.forEach((person) =>{
    let programme = person.programme;
      if(programme === sortEdu.value){
        createOutPutCard(person);
      }
  })
}
// Hämtar data från API:et.
// Använder array-metoden sort på den hämtade datan genom att kontrollera .age. Den sorterar datan i samma array.
// Anropar createOutPutCard() och skriver ut den sorterade listan
let sortByAgeUp = async () =>{
     let response = await fetch("https://api.mocki.io/v2/01047e91/students");
     let data = await response.json();
     data.sort((a, b) => a.age - b.age);
     data.forEach((person) => {
        createOutPutCard(person);
     })
}
// Hämtar data från API:et.
// Använder array-metoden sort på den hämtade datan genom att kontrollera .age. 
// Här vänder man på sorteringsvillkoret/ordningen. Den sorterar datan i samma array.
// Anropar createOutPutCard() och skriver ut den sorterade listan
let sortByAgeDown = async () =>{
  let response = await fetch("https://api.mocki.io/v2/01047e91/students");
  let data = await response.json();
  data.sort((a, b) => b.age - a.age);
  data.forEach((person) => {
     createOutPutCard(person);
  })
}
// Hämtar data från API:et.
// Använder array-metoden sort på den hämtade datan. Hämtar förnamnen och anropar toUpperCase() för att göra om namnet
// till stora bokstäver. Om sedan nameA är mindre än nameB så sorteras den in i elementet före nameB. Görs genom att 
// kontrollera värdet som returneras. 1 = större, -1 = mindre och 0 = samma namn(värde)-behåller ordningen. 
// Jämförelsen sker beroende på värdena i ASCII-tabellen där stort A kommer före B osv.
// Skapar sen outputen genom anrop av createOutPutCard() av varje student. 
let sortByFirstNameUp = async () =>{
    let response = await fetch("https://api.mocki.io/v2/01047e91/students");
    let data = await response.json();
    data.sort((a, b) => {
        let nameA = a.firstName.toUpperCase(); 
        let nameB = b.firstName.toUpperCase(); 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    data.forEach((person) => {
        createOutPutCard(person);
     });
}
// Hämtar data från API:et.
// Använder array-metoden sort på den hämtade datan. Hämtar förnamnen och anropar toUpperCase() för att göra om namnet
// till stora bokstäver. Om sedan nameA är mindre än nameB så sorteras den in i elementet efter nameB. Görs genom att 
// kontrollera värdet som returneras. 1 = större, -1 = mindre och 0 = samma namn(värde)-behåller ordningen. 
// Jämförelsen sker beroende på värdena i ASCII-tabellen där stort A kommer före B osv. Har vänt på villkoren i if() här.
// Skapar sen outputen genom anrop av createOutPutCard() av varje student. 
let sortByFirstNameDown = async () =>{
  let response = await fetch("https://api.mocki.io/v2/01047e91/students");
  let data = await response.json();
  data.sort((a, b) => {
      let nameA = a.firstName.toUpperCase(); 
      let nameB = b.firstName.toUpperCase(); 
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
  data.forEach((person) => {
      createOutPutCard(person);
   });
}
// Hämtar data från API:et.
// Använder array-metoden sort på den hämtade datan. Hämtar efternamnen och anropar toUpperCase() för att göra om namnet
// till stora bokstäver. Om sedan nameA är mindre än nameB så sorteras den in i elementet före nameB. Görs genom att 
// kontrollera värdet som returneras. 1 = större, -1 = mindre och 0 = samma namn(värde)-behåller ordningen. 
// Jämförelsen sker beroende på värdena i ASCII-tabellen där stort A kommer före B osv.
// Skapar sen outputen genom anrop av createOutPutCard() av varje student. 
let sortByLastNameUp = async () =>{
    let response = await fetch("https://api.mocki.io/v2/01047e91/students");
    let data = await response.json();
    data.sort((a, b) => {
        let nameA = a.lastName.toUpperCase(); 
        let nameB = b.lastName.toUpperCase(); 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    data.forEach((person) => {
        createOutPutCard(person);
     });
}
// Hämtar data från API:et.
// Använder array-metoden sort på den hämtade datan. Hämtar efternamnen och anropar toUpperCase() för att göra om namnet
// till stora bokstäver. Om sedan nameA är mindre än nameB så sorteras den in i elementet efter nameB. Görs genom att 
// kontrollera värdet som returneras. 1 = större, -1 = mindre och 0 = samma namn(värde)-behåller ordningen. 
// Jämförelsen sker beroende på värdena i ASCII-tabellen där stort A kommer före B osv. Har vänt på villkoren i if() här.
// Skapar sen outputen genom anrop av createOutPutCard() av varje student. 
let sortByLastNameDown = async () =>{
  let response = await fetch("https://api.mocki.io/v2/01047e91/students");
  let data = await response.json();
  data.sort((a, b) => {
      let nameA = a.lastName.toUpperCase(); 
      let nameB = b.lastName.toUpperCase(); 
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
  data.forEach((person) => {
      createOutPutCard(person);
   });
}
// Skickar med student.programme = programme och student.hobbies = hobbies som inparametrar. Hämtar data från API:et. 
// Skapar 3 arrayer av medskickade hobbies, alla skolors school.programmes och scholl.activities.
// Loopar igenom varje skola och Skapar sedan "kortet" med varje skolas attribut. 
// Färgar "kortet" rött och lägger till sist i listan.
 let getSchools = async (programme, hobbies) =>{
   let response = await fetch("https://api.mocki.io/v2/01047e91/schools");
     let schools = await response.json();
      let studentHobbies = hobbies;
      
      schools.forEach((school) =>{
        let allProgrammes = school.programmes;
        let allActivities = school.activities;
        
        let card = document.createElement("div");
        card.id = "card";
        card.style.background = "white";
         let name = document.createElement("li");
         name.textContent = "Name: " + school.name;
         let activities = document.createElement("li");
         activities.textContent = "Activities: " + school.activities;
         let programmes = document.createElement("li");
         programmes.textContent = "Programmes: " + school.programmes;
         name.style.color = "red";
         card.appendChild(name);
         card.appendChild(activities);
         card.appendChild(programmes);
         outputList.insertBefore(card, outputList.childNodes[outputList.length -1]);

// Kontrollerar sedan om studentens programval är varje skolas utbildning 1 eller utbildning 2
// Loppar sedan igenom alla studentens hobbys och kontrollerar om den finns med på skolans aktiviteter med includes()
// Skapar en boolean hasActivities som styrvariabel. Kontrollerar sedan om variabeln ändrats, om minst en hobby finns som aktivitet
// Ändrar då skolans namn-attribut till gul färg.
// Lägger sen till överst i listan med childNodes[0].
            if(allProgrammes[0] === programme || allProgrammes[1] === programme){
              let hasActivity = false;
              studentHobbies.forEach((hobby) =>{
                 if(allActivities.includes(hobby)){
                   hasActivity = true;
                 };
              });
             if(hasActivity === true){
               name.style.color = "#fff700";
               yellow = true;
               card.appendChild(name);
               card.appendChild(activities);
               card.appendChild(programmes);
               outputList.insertBefore(card, outputList.childNodes[0]);
             }
            }

// Kontrollerar även här om studentens programval är varje skolas utbildning 1 eller utbildning 2
// Skapar en boolean hasAll för att kolla om skolan har alla studentens hobbys.
// Loopar sedan igenom studentens alla hobbys och använder indexOf() som returnerar -1 om hobbyn inte finns med 
// i skolans aktivitets-array. Om man upptäcker att en hobby inte finns med i allActivities
// så ändras hasAll till false. Kollar sedan om hasAll fortfarande är true efter man loppat igenom alla hobbys. 
// Ändrar då skolans namn till färgen grön. 
// Denna if() ligger efter den första if(). Om villkoret nedan uppfylls så upfylls alltid villkoret ovan.
// Har utbildningen alla studentens aktiviteter så har den alltid även en aktivitet. 
// Så först färgas skolnamnet gult ovan för att sedan färgas grönt om nedan villkor uppfylls. 
// Om detta villkoret uppfylls så läggs detta element som det nya översta.
          if(allProgrammes[0] === programme || allProgrammes[1] === programme){
              let hasAll = true;
            for(let i = 0; i < studentHobbies.length; i++){
              if((allActivities.indexOf(studentHobbies[i]) === -1)){
                  hasAll = false;
                }
              }
            if(hasAll === true){
                name.style.color = "green";
                green = true;
                card.appendChild(name);
                card.appendChild(activities);
                card.appendChild(programmes);
                outputList.insertBefore(card, outputList.childNodes[0]);
             }
            }
           
         });
        }
         
// Här skapar man upp alla HTML-element som man lägger i ett kort för att presentera alla studenter
// från start när man går in på sidan. 
// Lägger även till en EventListener till varje kort som anropar getSchools() och skickar med studentens 
// programval och studentens hobbys. Vid varje klick på en student så rensar man outPutListan innan man skapar de
// nya skolkorten.
  let createInputCard = (student) => {

    let card = document.createElement("div")
    card.id = "card";
    card.style.background = "white";

    let name = document.createElement("li");
    name.textContent = "Firstname: " + student.firstName;
    name.style.color = "red";
    let lastName = document.createElement("li");
    lastName.textContent = "Lastname: " + student.lastName;
    lastName.style.color = "green";
    let age = document.createElement("li");
    age.textContent = "Age: " + student.age;
    age.style.color = "blue"
    let hobbies = document.createElement("li");
    hobbies.textContent = "Hobbies: " + student.hobbies;
    hobbies.style.color = "brown";
    let programme = document.createElement("li");
    programme.textContent = "Programme: " + student.programme;

    card.appendChild(name);
    card.appendChild(lastName);
    card.appendChild(age);
    card.appendChild(hobbies);
    card.appendChild(programme);

    card.addEventListener(("click"), () =>{
      outputList.textContent = "";
      getSchools(student.programme, student.hobbies);
    });
    studentList.appendChild(card);
}

// Här skapar man upp alla HTML-element som man lägger i ett kort för att presentera alla studenter
// Skapar listelement och lägger in alla attribut i kortet (card)
// Anropas sedan av varje knapp på sidan för att skriva ut alla studenter, sorterat på alla möjliga sätt. 
let createOutPutCard = (student) => {

    let card = document.createElement("div")
    card.id = "card"; 
    card.style.background = "white";

    let name = document.createElement("li");
    name.textContent = "Firstname: " + student.firstName;
    name.style.color = "red";
    let lastName = document.createElement("li");
    lastName.textContent = "Lastname: " + student.lastName;
    lastName.style.color = "green";
    let age = document.createElement("li");
    age.textContent = "Age: " + student.age;
    age.style.color = "blue"
    let hobbies = document.createElement("li");
    hobbies.textContent = "Hobbies: " + student.hobbies;
    hobbies.style.color = "brown";
    let programme = document.createElement("li");
    programme.textContent = "Programme: " + student.programme;

    card.appendChild(name);
    card.appendChild(lastName);
    card.appendChild(age);
    card.appendChild(hobbies);
    card.appendChild(programme);
    outputList.appendChild(card);
}
// Anropar getStudents() för att skriva ut alla studentkort på sidan.
getStudents()
