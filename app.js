//myButton
const myButton = document.getElementById("btn");
const btnClickCallback = () => {
  alert("You clicked me!");
  myButton.removeEventListener("click", btnClickCallback);
};
myButton.style.backgroundColor = "gray";

myButton.addEventListener("mouseover", () => {
  myButton.style.backgroundColor = "red";
});
myButton.addEventListener("mouseout", () => {
  myButton.style.backgroundColor = "gray";
});

myButton.addEventListener("click", btnClickCallback);

//Inputs and creation of elements
const Container = document.querySelector(".container"); //Selected the container to add/remove the elements

//Add
const myButtonAdd = document.getElementById("btnAdd");
const AddClickCallback = () => {
  //Function to create and insert new input elements
  const newInputElement = document.createElement("input"); //Create new input element
  newInputElement.placeholder = "This is a new fucking task"; //Set placeholder
  Container.appendChild(newInputElement);
  Container.appendChild(document.createElement("br"));
};

myButtonAdd.addEventListener("click", AddClickCallback);

//Substract - Remove last element
const myButtonSubstract = document.getElementById("btnSubstract");
const SubstractClickCallback = () => {
  //Function to remove last elements
  Container.removeChild(Container.lastChild);
  Container.removeChild(Container.lastChild);
};
myButtonSubstract.addEventListener("click", SubstractClickCallback);

//Sections
const starredList = document.querySelector("#starredList"); //Select the starred list

const dailyList = document.querySelector("#dailyList"); //Select the daily list
dailyList.style.display = "none"; //Hide the daily list at beginning

const newList = document.querySelector("#newList"); //Select the new list
newList.style.display = "none"; //Hide the new list at beginning

//Logic for showing sections lists
const starredListButton = document.querySelector("#starredListButton"); //Select button to show starred list
const dailyListButton = document.querySelector("#dailyListButton"); //Select button to show daily list
const newListButton = document.querySelector("#newListButton"); //Select button to show new list

const showStarredList = () => {
  //Function to show the starred list
  starredList.style.display = "flex"; //Show the starred list
  dailyList.style.display = "none"; //Hide the daily list
  newList.style.display = "none"; //Hide the new list
};

const showDailyList = () => {
  //Function to show the daily list
  starredList.style.display = "none"; //Hide the starred list
  dailyList.style.display = "flex"; //Show the daily list
  newList.style.display = "none"; //Hide the new list
};

const showNewList = () => {
  //Function to show the new list
  starredList.style.display = "none"; //Hide the starred list
  dailyList.style.display = "none"; //Hide the daily list
  newList.style.display = "flex"; //Show the new list
};

starredListButton.addEventListener("click", showStarredList); //Add event listener to the starred list button
dailyListButton.addEventListener("click", showDailyList); //Add event listener to the daily list button
newListButton.addEventListener("click", showNewList); //Add event listener to the new list button

//Class
const button = document.querySelector("#button"); //Select the button

const buttonClicked = (event) => {
  console.log(event.target); //Calling the target of the event
  console.log(event.target.id); //Calling the attributes of the event
};

button.addEventListener("click", buttonClicked); //Add event listener to the button

//Class - Forms
const form = document.getElementById("form"); //Select the form

form.addEventListener("submit", (event) => {
  event.preventDefault(); //Prevent the default behavior of the form
  const name = form.elements["name"].value;
  console.log(name);
}); //Add event listener to the form


//Logic for the creation of tasks
const formEx = document.querySelector("#task-form"); //Select the form
const list = document.querySelector("#task-list"); //Select the list to create the tasks.

formEx.addEventListener("submit", (e) => {
  e.preventDefault(); //Prevents default beahviour
  const inputEx = document.querySelector("#task-input") //Select the input

  // Add task button
  const newLi = document.createElement("li")//Create task
  newLi.textContent = inputEx.value//Edit task
  list.append(newLi)//Insert task

  // Edit task button
  const newEditBtn = document.createElement("button")//Create button
  newEditBtn.textContent = "✏️" //Edit button
  list.append(newEditBtn)//Insert button
  const inputInsideNewList = document.createElement("input")//Create input to edit
  newEditBtn.addEventListener("click", () => {
    inputInsideNewList.textContent = inputEx.value //The input shows the previous text
    console.log(inputEx.value)
    newLi.replaceWith(inputInsideNewList)

    newEditBtn.replaceWith(finishEditBtn)

  })


  // Finish edit button
  const finishEditBtn = document.createElement("button") //Create button
  finishEditBtn.textContent = "✅" // Edit content
  finishEditBtn.addEventListener("click", (e) => {
    inputInsideNewList.replaceWith(newLi)
    finishEditBtn.replaceWith(newEditBtn)

  })


  // Remove task button
  const newRemoveBtn = document.createElement("button")//Create button
  newRemoveBtn.textContent = "❌" //Edit button
  list.append(newRemoveBtn)//Insert button
  newRemoveBtn.addEventListener("click", (e) => {
    newLi.remove()
    inputInsideNewList.remove()
    newEditBtn.remove()
    newRemoveBtn.remove()
    finishEditBtn.remove()
  })
})