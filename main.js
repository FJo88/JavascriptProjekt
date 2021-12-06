let studentList = document.querySelector("#leftList");
let outputList = document.querySelector("#rightList")
let sortEdu = document.querySelector("#sortE");
let getEdu = document.querySelector("#getEdu");
let sortAgeBtn = document.querySelector("#sortA");
let sortFirstBtn = document.querySelector("#sortFirst");
let sortLastBtn = document.querySelector("#sortLast");
let green = false;
let yellow = false;
let red = false;
document.body.style.background = "lightblue";



async function getStudents() {
  let response = await fetch("https://api.mocki.io/v2/01047e91/students");
  let data = await response.json();
  data.forEach((student) => {
    createInputCard(student);
  });
}

getEdu.addEventListener(("click"), () => {
  outputList.textContent = "";
  sortByEducation();
});

sortAgeBtn.addEventListener(("click"), ()=> {
    outputList.textContent = "";
    sortByAge();
});

sortFirstBtn.addEventListener(("click"), ()=> {
    outputList.textContent = "";
    sortByFirstName();
});

sortLastBtn.addEventListener(("click"), ()=> {
    outputList.textContent = "";
    sortByLastName();
});


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

let sortByAge = async () =>{
     let response = await fetch("https://api.mocki.io/v2/01047e91/students");
     let data = await response.json();
     data.sort((a, b) => a.age - b.age);
     data.forEach((person) => {
        createOutPutCard(person);
     })
}

let sortByFirstName = async () =>{
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

let sortByLastName = async () =>{
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

let getSchools = async (programme, hobbies) =>{
  let response = await fetch("https://api.mocki.io/v2/01047e91/schools");
    let schools = await response.json();
      // schools.splice(0,1);
      // schools.splice(2,1);
      
      let studentHobbies = hobbies;
      
      schools.forEach((school) =>{
        let programmes = school.programmes;
        let activities = school.activities;
       
     

    if(programmes[0] === programme || programmes[1] === programme){
           let hasActivity = false;
            studentHobbies.forEach((hobby) =>{
              if(activities.includes(hobby)){
                hasActivity = true;
                yellow = true;
                };
            });
          if(hasActivity === true){
            createSchoolCard(school);
          };
      }
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

let createSchoolCard = (school) => {

  let card = document.createElement("div")
    card.id = "card";
    card.style.background ="white";

    let name = document.createElement("li");
    name.textContent = "Name: " + school.name;
    name.style.color ="red";
    // if(green){
    //   name.style.color = "green";
    // }
    // else if(yellow){
    //   name.style.color = "yellow";
    // }
    // else{
    //    name.style.color = "red";
    // }
    let activities = document.createElement("li");
    activities.textContent = "Activities: " + school.activities;
    let programmes = document.createElement("li");
    programmes.textContent = "Programmes: " + school.programmes;

    card.appendChild(name);
    card.appendChild(activities);
    card.appendChild(programmes);
    outputList.appendChild(card);
}

getStudents()
//getSchools();
//sortByAge()