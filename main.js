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

document.body.style.background = "lightblue";



async function getStudents() {
  let response = await fetch("https://api.mocki.io/v2/01047e91/students");
  let data = await response.json();
  data.forEach((student) => {
    createInputCard(student);
  });
}

searchButton.addEventListener(("click"), () =>{
  outputList.textContent = "";
  findStudent();
})

getEdu.addEventListener(("click"), () => {
  outputList.textContent = "";
  sortByEducation();
});

sortAgeUpBtn.addEventListener(("click"), ()=> {
    outputList.textContent = "";
    sortByAgeUp();
});

sortAgeDownBtn.addEventListener(("click"), ()=> {
  outputList.textContent = "";
  sortByAgeDown();
});


sortFirstUpBtn.addEventListener(("click"), ()=> {
    outputList.textContent = "";
    sortByFirstNameUp();
});

sortFirstDownBtn.addEventListener(("click"), ()=> {
  outputList.textContent = "";
  sortByFirstNameDown();
});
sortLastUpBtn.addEventListener(("click"), ()=> {
    outputList.textContent = "";
    sortByLastNameUp();
});

sortLastDownBtn.addEventListener(("click"), ()=> {
  outputList.textContent = "";
  sortByLastNameDown();
});


let findStudent = async () =>{
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

let sortByAgeUp = async () =>{
     let response = await fetch("https://api.mocki.io/v2/01047e91/students");
     let data = await response.json();
     data.sort((a, b) => a.age - b.age);
     data.forEach((person) => {
        createOutPutCard(person);
     })
}

let sortByAgeDown = async () =>{
  let response = await fetch("https://api.mocki.io/v2/01047e91/students");
  let data = await response.json();
  data.sort((a, b) => b.age - a.age);
  data.forEach((person) => {
     createOutPutCard(person);
  })
}

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
         name.style.color ="red";
         let activities = document.createElement("li");
         activities.textContent = "Activities: " + school.activities;
         let programmes = document.createElement("li");
         programmes.textContent = "Programmes: " + school.programmes;
   
         
         
         if(allProgrammes[0] === programme || allProgrammes[1] === programme){
              let hasActivity = false;
               studentHobbies.forEach((hobby) =>{
                 if(allActivities.includes(hobby)){
                   hasActivity = true;
                 };
            });
             if(hasActivity === true){
               name.style.color ="yellow";
             }
            }

          if(allProgrammes[0] === programme || allProgrammes[1] === programme){
              let hasAll = true;
               
            for(let i = 0; i < studentHobbies.length; i++){
              if((allActivities.indexOf(studentHobbies[i]) === -1)){
                  hasAll = false;
                }
              }
            if(hasAll === true){
                name.style.color = "green";
             }
          }
        
           
          card.appendChild(name);
          card.appendChild(activities);
          card.appendChild(programmes);
          outputList.appendChild(card);
         });
        }
         

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



getStudents()
