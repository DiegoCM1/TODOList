//Logic for showing sections lists
const starredList = document.querySelector("#starredList"); // Select the starred list section
const dailyList = document.querySelector("#dailyList"); // Select the daily list section
dailyList.style.display = "none"; // Hide the daily list at the beginning
const newList = document.querySelector("#newList"); // Select the new list section
newList.style.display = "none"; // Hide the new list at the beginning

const starredListButton = document.querySelector("#starredListButton"); // Select the button to show the starred list
const dailyListButton = document.querySelector("#dailyListButton"); // Select the button to show the daily list
const newListButton = document.querySelector("#newListButton"); // Select the button to show the new list

//Select the nav
const nav = document.querySelector("nav");
//Add event listener to the parent/nav
nav.addEventListener("click", (event) => {
  //Function to show the correct section
  if (event.target.closest("#starredListButton")) {
    showStarredList(event);
  } else if (event.target.id === "dailyListButton") {
    showDailyList(event);
  } else if (event.target.id === "newListButton") {
    showNewList(event);
  }
});

const showStarredList = (event) => {
  // Function to show the starred list
  starredList.style.display = "flex"; // Show the starred list
  dailyList.style.display = "none"; // Hide the daily list
  newList.style.display = "none"; // Hide the new list

  // Highlight the selected button and remove highlight from others
  if ((event.target.style.display = "flex")) {
    event.target.closest("button").classList.add("selectedBtnNav");
    dailyListButton.classList.remove("selectedBtnNav");
    newListButton.classList.remove("selectedBtnNav");
  }
};

const showDailyList = (event) => {
  // Function to show the daily list
  starredList.style.display = "none"; // Hide the starred list
  dailyList.style.display = "flex"; // Show the daily list
  newList.style.display = "none"; // Hide the new list

  // Highlight the selected button and remove highlight from others
  if ((event.target.style.display = "flex")) {
    event.target.classList.add("selectedBtnNav");
    starredListButton.classList.remove("selectedBtnNav");
    newListButton.classList.remove("selectedBtnNav");
  }
};

const showNewList = (event) => {
  // Function to show the new list
  starredList.style.display = "none"; // Hide the starred list
  dailyList.style.display = "none"; // Hide the daily list
  newList.style.display = "flex"; // Show the new list

  // Highlight the selected button and remove highlight from others
  if ((event.target.style.display = "flex")) {
    event.target.classList.add("selectedBtnNav");
    starredListButton.classList.remove("selectedBtnNav");
    dailyListButton.classList.remove("selectedBtnNav");
  }
};

// Show the starred list by default when the page loads
document.addEventListener("DOMContentLoaded", () => {
  showStarredList({ target: starredListButton }); // Simulate the event with the button as the target
});

//STARTS THE WEBAPP
function setUpTaskManager(formSelector, listSelector) {
  // Function to set up task management for a specific form and list
  const formEx = document.querySelector(formSelector); // Select the form element
  const list = document.querySelector(listSelector); // Select the list element

  formEx.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    const inputEx = formEx.querySelector("input"); // Select the input field inside the form

    if (inputEx.value.trim() === "") return; // Do nothing if the input is empty

    const newLi = document.createElement("li"); // Create a new list item
    newLi.classList.add("newLi"); // Add a class to the list item
    newLi.textContent = inputEx.value; // Set the text of the list item to the input value

    // Create buttons for editing, removing, and checking tasks
    const newEditBtn = document.createElement("button");
    newEditBtn.textContent = "✏️"; // Edit button
    newEditBtn.classList.add("btnEdit");

    const newRemoveBtn = document.createElement("button");
    newRemoveBtn.textContent = "❌"; // Remove button
    newRemoveBtn.classList.add("btnRemove");

    const newCheckBtn = document.createElement("button");
    newCheckBtn.textContent = "✅"; // Check button
    newCheckBtn.classList.add("btnCheck");

    // Append the buttons to the list item
    newLi.append(newEditBtn, newRemoveBtn, newCheckBtn);
    list.append(newLi); // Add the list item to the list

    // Event Delegation with the parent container
    newLi.addEventListener("click", (event) => {
      if (event.target.classList.contains("btnEdit")) {
        editTask(event);
      } else if (event.target.classList.contains("btnRemove")) {
        removeTask(event);
      } else if (event.target.classList.contains("btnCheck")) {
        checkTask(event);
      }
    });

    function editTask() {
      // Edits task
      const inputEditTask = document.createElement("input"); // Create an input field for editing
      inputEditTask.type = "text"; // Set the input type to text
      inputEditTask.value = newLi.childNodes[0].nodeValue; // Set the input value to the current task text

      const finishEditBtn = document.createElement("button"); // Create a button to finish editing
      finishEditBtn.textContent = "✔️"; // Finish edit button text

      newLi.textContent = ""; // Clear the list item content
      newLi.append(inputEditTask, finishEditBtn, newRemoveBtn); // Add the input and buttons to the list item

      inputEditTask.focus(); // Focus on the input field

      // Add functionality to the finish edit button
      finishEditBtn.addEventListener("click", () => {
        newLi.textContent = inputEditTask.value; // Update the list item text with the input value
        newLi.append(newEditBtn, newRemoveBtn, newCheckBtn); // Restore the original buttons
      });
    }

    function removeTask() {
      // Removes task
      newLi.remove(); // Remove the list item
    }

    function checkTask() {
      //Checks the task
      newLi.classList.toggle("checked"); // Toggle the "checked" class on the list item
      newLi.classList.remove("newLi:hover"); // Remove hover effect when checked
    }

    inputEx.value = ""; // Clear the input field
  });
}

// Initialize task managers for the starred and daily lists
setUpTaskManager("#task-form", "#task-list"); // Set up task manager for the starred list
setUpTaskManager("#task-form-daily", "#task-list-daily"); // Set up task manager for the daily list
