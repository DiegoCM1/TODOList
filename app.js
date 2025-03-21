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


const showStarredList = (event) => {  //Function to show the starred list
  starredList.style.display = "flex"; //Show the starred list
  dailyList.style.display = "none"; //Hide the daily list
  newList.style.display = "none"; //Hide the new list

  if( event.target.style.display = "flex"){
  event.target.closest("button").classList.add("selectedBtnNav")
  dailyListButton.classList.remove("selectedBtnNav")
  newListButton.classList.remove("selectedBtnNav")
}
};

const showDailyList = (event) => {  //Function to show the daily list
  starredList.style.display = "none"; //Hide the starred list
  dailyList.style.display = "flex"; //Show the daily list
  newList.style.display = "none"; //Hide the new list

  if( event.target.style.display = "flex"){
    event.target.classList.add("selectedBtnNav")
    starredListButton.classList.remove("selectedBtnNav")
    newListButton.classList.remove("selectedBtnNav")
  }
};

const showNewList = (event) => {  //Function to show the new list
  starredList.style.display = "none"; //Hide the starred list
  dailyList.style.display = "none"; //Hide the daily list
  newList.style.display = "flex"; //Show the new list

  if( event.target.style.display = "flex"){
    event.target.classList.add("selectedBtnNav")
    starredListButton.classList.remove("selectedBtnNav")
    dailyListButton.classList.remove("selectedBtnNav")
  }
};

starredListButton.addEventListener("click", showStarredList); //Add event listener to the starred list button
dailyListButton.addEventListener("click", showDailyList); //Add event listener to the daily list button
newListButton.addEventListener("click", showNewList); //Add event listener to the new list button



// LOGIC TO EDIT, REMOVE AND CHECK TASKS
const formEx = document.querySelector("#task-form"); // Select the form
const list = document.querySelector("#task-list"); // Select the list

formEx.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form behavior
  const inputEx = document.querySelector("#task-input"); // Select input

  if (inputEx.value.trim() === "") return; // Ignore empty tasks

  // Create task item (li)
  const newLi = document.createElement("li");
  newLi.classList.add("newLi"); //Adds a CSS class
  newLi.textContent = inputEx.value;

  // Create Edit button
  const newEditBtn = document.createElement("button");
  newEditBtn.textContent = "✏️";

  // Create Remove button
  const newRemoveBtn = document.createElement("button");
  newRemoveBtn.textContent = "❌";

  // Create Check button
  const newCheckBtn = document.createElement("button");
  newCheckBtn.textContent = "✅";

  // Append buttons inside the list item
  newLi.append(newEditBtn, newRemoveBtn, newCheckBtn);
  list.append(newLi); // Add task to the list

  // **EDIT BUTTON FUNCTIONALITY**
  newEditBtn.addEventListener("click", () => {
    const inputEditTask = document.createElement("input");
    inputEditTask.type = "text";
    inputEditTask.value = newLi.childNodes[0].nodeValue; // Set input value to current task text

    // Create "Finish Edit" button
    const finishEditBtn = document.createElement("button");
    finishEditBtn.textContent = "✔️";

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

  // **CHECK BUTTON FUNCTIONALITY**
  newCheckBtn.addEventListener("click", () => {
    newLi.classList.toggle("checked");
    newLi.classList.remove("newLi:hover");
  });

  // Input is deleted after adding the task
  inputEx.value = "";
});
