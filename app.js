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



// Logic to add and remove tasks
const formEx = document.querySelector("#task-form"); // Select the form
const list = document.querySelector("#task-list"); // Select the list

formEx.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form behavior
  const inputEx = document.querySelector("#task-input"); // Select input

  if (inputEx.value.trim() === "") return; // Ignore empty tasks

  // Create task item (li)
  const newLi = document.createElement("li");
  newLi.textContent = inputEx.value;

  // Create Edit button
  const newEditBtn = document.createElement("button");
  newEditBtn.textContent = "✏️";

  // Create Remove button
  const newRemoveBtn = document.createElement("button");
  newRemoveBtn.textContent = "❌";

  // Append buttons inside the list item
  newLi.append(newEditBtn, newRemoveBtn);
  list.append(newLi); // Add task to the list

  // **EDIT BUTTON FUNCTIONALITY**
  newEditBtn.addEventListener("click", () => {
    const inputEditTask = document.createElement("input");
    inputEditTask.type = "text";
    inputEditTask.value = newLi.childNodes[0].nodeValue; // Set input value to current task text

    // Create "Finish Edit" button
    const finishEditBtn = document.createElement("button");
    finishEditBtn.textContent = "✅";

    // Replace task text with input field & finish button
    newLi.textContent = "";
    newLi.append(inputEditTask, finishEditBtn, newRemoveBtn);

    inputEditTask.focus(); // Auto-focus input field

    // **Finish Editing**
    finishEditBtn.addEventListener("click", () => {
      newLi.textContent = inputEditTask.value; // Update task text
      newLi.append(newEditBtn, newRemoveBtn); // Restore buttons
    });
  });

  // **REMOVE BUTTON FUNCTIONALITY**
  newRemoveBtn.addEventListener("click", () => {
    newLi.remove(); // Remove task
  });
});
