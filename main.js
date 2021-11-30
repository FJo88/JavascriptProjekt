let studentList = document.querySelector("#leftList");
let outputList = document.querySelector("#rightList")
let sortEdu = document.querySelector("#sortE");
let sortAgeBtn = document.querySelector("#sortA");
let sortFirstBtn = document.querySelector("#sortFirst");
let sortLastBtn = document.querySelector("#sortLast");






let getSchools = async () => {
    let response = await fetch("https://api.mocki.io/v2/01047e91/schools");
    let data = await response.json();
    
    data.forEach((school) => {
        console.log(school.programmes);
    });
}


let getStudents = async () => {
    let response = await fetch("https://api.mocki.io/v2/01047e91/students");
    let data = await response.json();
    data.forEach((student) => {
       createInputCard(student);
       
    });
}

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
        var nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
        var nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
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
     })
}

let sortByLastName = async () =>{
    let response = await fetch("https://api.mocki.io/v2/01047e91/students");
    let data = await response.json();
    data.sort((a, b) => {
        var nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
        var nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
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
     })
}



let createInputCard = (student) => {

    let card = document.createElement("div")
    card.id = "card";

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
    hobbies.style.color = "pink";
    let study = document.createElement("li");
    study.textContent = "Studies: " + student.programme;

    card.appendChild(name);
    card.appendChild(lastName);
    card.appendChild(age);
    card.appendChild(hobbies);
    card.appendChild(study);
    studentList.appendChild(card);
}

let createOutPutCard = (student) => {

    let card = document.createElement("div")
    card.id = "card";

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
    hobbies.style.color = "pink";
    let study = document.createElement("li");
    study.textContent = "Studies: " + student.programme;

    card.appendChild(name);
    card.appendChild(lastName);
    card.appendChild(age);
    card.appendChild(hobbies);
    card.appendChild(study);
    outputList.appendChild(card);
}
getStudents();
//getSchools();
//sortByAge()