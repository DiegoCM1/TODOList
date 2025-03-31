function setFavicon(url) {
  let link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.rel = "icon";
  link.type = "image/png"; // Make sure type matches your file format
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

// Settings section
const menuBtn = document.querySelector("#menuBtn"); //Btn
const menu = document.querySelector("#menu"); // Menu
const closeMenuBtn = document.querySelector("#closeMenuBtn"); //Close menu

menuBtn.addEventListener("click", () => {
  menu.classList.add("active");
});

closeMenuBtn.addEventListener("click", closeMenu);

function closeMenu() {
  // Function to close menu
  menu.classList.remove("active");
}

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

    const newLiText = document.createElement("span");
    newLiText.textContent = inputEx.value; // Assign the input value
    newLiText.classList.add("newLiText"); // Add a class to the text

    // Create buttons for editing, removing, and checking tasks as well as their container
    const newEditBtn = document.createElement("button");
    newEditBtn.classList.add("btnEdit");
    const newEditIcon = document.createElement("i");
    newEditIcon.setAttribute("data-lucide", "pencil");
    newEditIcon.classList.add("iconEdit")
    newEditBtn.appendChild(newEditIcon);


    const newRemoveBtn = document.createElement("button");
    newRemoveBtn.classList.add("btnRemove");
    const newRemoveIcon = document.createElement("i")
    newRemoveIcon.setAttribute("data-lucide", "trash")
    newRemoveIcon.classList.add("iconRemove")
    newRemoveBtn.appendChild(newRemoveIcon)

    const newCheckBtn = document.createElement("button");
    newCheckBtn.classList.add("btnCheck");
    const newCheckIcon = document.createElement("i")
    newCheckIcon.setAttribute("data-lucide", "check")
    newCheckIcon.classList.add("iconCheck")
    newCheckBtn.appendChild(newCheckIcon)

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("btnsContainer"); // Div that contains all buttons
    buttonsContainer.append(newEditBtn, newRemoveBtn, newCheckBtn);

    // Append the div that contains all buttons
    newLi.append(newLiText, buttonsContainer);
    list.append(newLi); // Add the list item to the list

    buttonsContainer.addEventListener("click", (event) => {
      const button = event.target.closest("button"); // Get the closest button (even if clicking the icon)
      if (!button) return; // Ignore clicks outside buttons
    
      if (button.classList.contains("btnEdit")) {
        editTask(newLi, newLiText, buttonsContainer); // Pass the necessary elements
      } else if (button.classList.contains("btnRemove")) {
        removeTask();
      } else if (button.classList.contains("btnCheck")) {
        checkTask()
      }
    });

    // Function to edit a task
    function editTask() {
      const inputEditTask = document.createElement("input"); // Create an input field for editing
      inputEditTask.classList.add("inputEditTask");
      inputEditTask.type = "text"; // Set input type to text
      inputEditTask.value = newLiText.childNodes[0].nodeValue; // Set input value to current to current task

      // Create a button to finish editing and its icon
      const finishEditBtn = document.createElement("button");
      finishEditBtn.classList.add("btnFinishEdit")
      const checkIcon = document.createElement("i");
      checkIcon.setAttribute("data-lucide", "check");
      checkIcon.classList.add("iconFinishEdit")
      finishEditBtn.appendChild(checkIcon);

      // Create a button to cancel edition
      const cancelEditionBtn = document.createElement("button");
      const cancelEditionIcon = document.createElement("i");
      cancelEditionBtn.classList.add("cancelEditionBtn")
      cancelEditionIcon.setAttribute("data-lucide", "x");
      cancelEditionIcon.classList.add("iconFinishRemove")
      cancelEditionBtn.appendChild(cancelEditionIcon);

      const editButtonsContainer = document.createElement("div");
      editButtonsContainer.classList.add("buttonsContainer");
      editButtonsContainer.append(finishEditBtn, cancelEditionBtn);

      newLi.textContent = ""; // Clear the list item content
      newLi.append(inputEditTask, editButtonsContainer); // Add input and buttons to the list item

      inputEditTask.focus(); // Focus on the input field

      // Add functionality to finish editing
      finishEditBtn.addEventListener("click", () => {
        newLiText.textContent = inputEditTask.value; // Update list item text
        newLi.textContent = "";
        newLi.append(newLiText, buttonsContainer); // Restore original buttons
      });

      cancelEditionBtn.addEventListener("click", () => {
        newLi.textContent = "";
        newLi.append(newLiText, buttonsContainer); // Restore original buttons
      });

      // Re-initialize Lucide icons after adding them to the DOM
      lucide.createIcons();
    }

    // Function to remove a task
    function removeTask() {
      newLi.remove(); // Remove the list item
    }

    // Function to check/uncheck a task
    function checkTask() {
      newLiText.classList.toggle("checked"); // Toggle the "checked" class
      newLi.classList.toggle("checkedNewLi")
    }

    inputEx.value = ""; // Clear the input field

    // Re-initialize Lucide icons after adding them to the DOM
    lucide.createIcons();
  });
}

// Initialize task managers for the starred and daily lists
setUpTaskManager("#task-form", "#task-list"); // Set up task manager for the starred list
setUpTaskManager("#task-form-daily", "#task-list-daily"); // Set up task manager for the daily list
