function setFavicon(url) {
  let link = document.querySelector("link[rel*='icon']") || document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";  // Make sure type matches your file format
  link.href = url;
  document.head.appendChild(link);
}

// Example: Set favicon on page load
setFavicon("/TODOList/assets/favicon.png");




// Select the sections for the lists
const starredList = document.querySelector("#starredList"); // Starred list section
const dailyList = document.querySelector("#dailyList"); // Daily list section
dailyList.style.display = "none"; // Initially hide the daily list
const newList = document.querySelector("#newList"); // New list section
newList.style.display = "none"; // Initially hide the new list

// Select the buttons for switching between lists
const starredListButton = document.querySelector("#starredListButton"); // Button for starred list
const dailyListButton = document.querySelector("#dailyListButton"); // Button for daily list
const newListButton = document.querySelector("#newListButton"); // Button for new list

// Select the navigation container
const nav = document.querySelector("nav");

// Add event listener to the navigation container
nav.addEventListener("click", (event) => {
  // Determine which button was clicked and show the corresponding list
  if (event.target.closest("#starredListButton")) {
    showStarredList(event);
  } else if (event.target.id === "dailyListButton") {
    showDailyList(event);
  } else if (event.target.id === "newListButton") {
    showNewList(event);
  }
});

// Function to show the starred list
const showStarredList = (event) => {
  starredList.style.display = "flex"; // Show the starred list
  dailyList.style.display = "none"; // Hide the daily list
  newList.style.display = "none"; // Hide the new list

  // Highlight the selected button and remove highlights from others
  event.target.closest("button").classList.add("selectedBtnNav");
  dailyListButton.classList.remove("selectedBtnNav");
  newListButton.classList.remove("selectedBtnNav");
};

// Function to show the daily list
const showDailyList = (event) => {
  starredList.style.display = "none"; // Hide the starred list
  dailyList.style.display = "flex"; // Show the daily list
  newList.style.display = "none"; // Hide the new list

  // Highlight the selected button and remove highlights from others
  event.target.classList.add("selectedBtnNav");
  starredListButton.classList.remove("selectedBtnNav");
  newListButton.classList.remove("selectedBtnNav");
};

// Function to show the new list
const showNewList = (event) => {
  starredList.style.display = "none"; // Hide the starred list
  dailyList.style.display = "none"; // Hide the daily list
  newList.style.display = "flex"; // Show the new list

  // Highlight the selected button and remove highlights from others
  event.target.classList.add("selectedBtnNav");
  starredListButton.classList.remove("selectedBtnNav");
  dailyListButton.classList.remove("selectedBtnNav");
};

// Show the starred list by default when the page loads
document.addEventListener("DOMContentLoaded", () => {
  showStarredList({ target: starredListButton }); // Simulate a click on the starred list button
});

// Function to set up task management for a specific form and list
function setUpTaskManager(formSelector, listSelector) {
  const formEx = document.querySelector(formSelector); // Select the form
  const list = document.querySelector(listSelector); // Select the list

  // Add event listener for form submission
  formEx.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    const inputEx = formEx.querySelector("input"); // Select the input field

    if (inputEx.value.trim() === "") return; // Do nothing if input is empty

    const newLi = document.createElement("li"); // Create a new list item
    newLi.classList.add("newLi"); // Add a class to the list item

    const newLiText = document.createElement("span")
    newLiText.textContent = inputEx.value; // Assign the input value
    newLiText.classList.add("newLiText"); // Add a class to the text
    

    // Create buttons for editing, removing, and checking tasks as well as their container

    const newEditBtn = document.createElement("button");
    newEditBtn.textContent = "✏️"; // Edit button
    newEditBtn.classList.add("btnEdit");

    const newRemoveBtn = document.createElement("button");
    newRemoveBtn.textContent = "❌"; // Remove button
    newRemoveBtn.classList.add("btnRemove");

    const newCheckBtn = document.createElement("button");
    newCheckBtn.textContent = "✅"; // Check button
    newCheckBtn.classList.add("btnCheck");

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("btnsContainer") // Div that contains all buttons
    buttonsContainer.append(newEditBtn, newRemoveBtn, newCheckBtn)


    // Append the div that contains all buttons
    newLi.append(newLiText, buttonsContainer);
    list.append(newLi); // Add the list item to the list

    // Add event listener to handle button actions
    newLi.addEventListener("click", (event) => {
      if (event.target.classList.contains("btnEdit")) {
        editTask(event); // Call editTask function
      } else if (event.target.classList.contains("btnRemove")) {
        removeTask(event); // Call removeTask function
      } else if (event.target.classList.contains("btnCheck")) {
        checkTask(event); // Call checkTask function
      }
    });

    // Function to edit a task
    function editTask() {
      const inputEditTask = document.createElement("input"); // Create an input field for editing
      inputEditTask.type = "text"; // Set input type to text
      inputEditTask.value = newLi.childNodes[0].nodeValue; // Set input value to current task text

      const finishEditBtn = document.createElement("button"); // Create a button to finish editing
      finishEditBtn.textContent = "✔️"; // Finish edit button text

      newLi.textContent = ""; // Clear the list item content
      newLi.append(inputEditTask, finishEditBtn, newRemoveBtn); // Add input and buttons to the list item

      inputEditTask.focus(); // Focus on the input field

      // Add functionality to finish editing
      finishEditBtn.addEventListener("click", () => {
        newLi.textContent = inputEditTask.value; // Update list item text
        newLi.append(newEditBtn, newRemoveBtn, newCheckBtn); // Restore original buttons
      });
    }

    // Function to remove a task
    function removeTask() {
      newLi.remove(); // Remove the list item
    }

    // Function to check/uncheck a task
    function checkTask() {
      newLiText.classList.toggle("checked"); // Toggle the "checked" class
      newLi.classList.remove("newLi:hover"); // Remove hover effect when checked
    }

    inputEx.value = ""; // Clear the input field
  });
}

// Initialize task managers for the starred and daily lists
setUpTaskManager("#task-form", "#task-list"); // Set up task manager for the starred list
setUpTaskManager("#task-form-daily", "#task-list-daily"); // Set up task manager for the daily list
