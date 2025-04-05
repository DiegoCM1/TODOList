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


// Sort
  const sortConfigBtn = document.getElementById("sortConfigBtn")
  const sortConfig = document.getElementById("sortConfig")
  console.log(sortConfig)
  sortConfigBtn.addEventListener("click", () => {
    sortConfig.classList.add("active");
  });

  document.addEventListener("click", (event) => {   // Check if the click happened outside the menu and not on the button
    if (!sortConfig.contains(event.target) && !sortConfigBtn.contains(event.target)) {
      closeSortConfig();
    }
  });

  function closeSortConfig() { // Closes the sort config
    // Function to close menu
    sortConfig.classList.remove("active");
  }
// SORT


//Logic for menu
menuBtn.addEventListener("click", () => {
  menu.classList.add("active");
});

closeMenuBtn.addEventListener("click", closeMenu);

document.addEventListener("click", (event) => {   // Check if the click happened outside the menu and not on the button

  if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
    closeMenu();
  }
});

function closeMenu() {
  // Function to close menu
  menu.classList.remove("active");
}

const menuOptions = document.getElementById("menuOptions");

menuOptions.addEventListener("click", (event) => {//Event listener to the parent menu
  if (event.target.closest("#themeOption")) {
    document.body.classList.toggle("darkBody");

    if(document.body.classList.contains("darkBody")){ // Validation if its dark or light
      const themeIconParent = document.querySelector("#themeIcon")     //Select span
      let themeIconChildren = themeIconParent.firstElementChild // Select i
      themeIconChildren.remove() // Removes the only child
  
      // Creates and inserts the new icon
      themeIconChildren = document.createElement("i")
      themeIconChildren.setAttribute("data-lucide", "sun");
      themeIconParent.appendChild(themeIconChildren)
    } else if(!document.body.classList.contains("darkBody")){
      const themeIconParent = document.querySelector("#themeIcon")     //Select span

      let themeIconChildren = themeIconParent.firstElementChild // Select i
  
      themeIconChildren.remove() // Removes the only child
  
      // Creates and inserts the new icon
      themeIconChildren = document.createElement("i")
      themeIconChildren.setAttribute("data-lucide", "moon");
      themeIconParent.appendChild(themeIconChildren)
    }
    // Re-initialize Lucide icons after adding them to the DOM
    lucide.createIcons();
  } else if (event.target.closest("#notificationsOption")) {
    closeMenu();
  } else if (event.target.closest("#syncOption")) {
    closeMenu();
  } else if (event.target.closest("#accountOption")) {
    closeMenu();
  } else if (event.target.closest("#logoutOption")) {
    closeMenu();
  }
});

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

  loadTasks(); // Load tasks from localStorage

  // Add event listener for form submission
  formEx.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    const inputEx = formEx.querySelector("input"); // Select the input field
    let task = inputEx.value;

    if (task.trim() === "") return; // Do nothing if input is empty

    // Store the task in localStorage
    storeTaskInLocalStorage(task); // Pass the task text to the function

    // Create and append the new task element
    const newTaskElement = createTaskElement(task);
    list.prepend(newTaskElement);

    inputEx.value = ""; // Clears the input field

    // Re-initialize Lucide icons after adding them to the DOM
    lucide.createIcons();
  });

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]"); // Retrieve tasks from localStorage
    tasks.forEach((task) => {
      // Generate a task element for each task and append it to the list
      const newTaskElement = createTaskElement(task);
      list.appendChild(newTaskElement);

      // Re-initialize Lucide icons after adding them to the DOM
      lucide.createIcons();
    });
  }

  function createTaskElement(task) {
    const newLi = document.createElement("li");
    const newLiText = document.createElement("span");
    const newEditBtn = document.createElement("button");
    const newEditIcon = document.createElement("i");
    const newRemoveBtn = document.createElement("button");
    const newRemoveIcon = document.createElement("i");
    const newCheckBtn = document.createElement("button");
    const newCheckIcon = document.createElement("i");
    const buttonsContainer = document.createElement("div");

    newLi.classList.add("newLi"); // Add a class to the list item
    newLiText.textContent = task; // Assign the task text
    newLiText.classList.add("newLiText"); // Add a class to the text

    // Create buttons for editing, removing, and checking tasks
    newEditBtn.classList.add("btnEdit");
    newEditIcon.setAttribute("data-lucide", "pencil");
    newEditIcon.classList.add("iconEdit");
    newEditBtn.appendChild(newEditIcon);

    newRemoveBtn.classList.add("btnRemove");
    newRemoveIcon.setAttribute("data-lucide", "trash");
    newRemoveIcon.classList.add("iconRemove");
    newRemoveBtn.appendChild(newRemoveIcon);

    newCheckBtn.classList.add("btnCheck");
    newCheckIcon.setAttribute("data-lucide", "check");
    newCheckIcon.classList.add("iconCheck");
    newCheckBtn.appendChild(newCheckIcon);

    buttonsContainer.classList.add("btnsContainer"); // Div that contains all buttons
    buttonsContainer.append(newEditBtn, newRemoveBtn, newCheckBtn);

    // Append the text and buttons to the list item
    newLi.append(newLiText, buttonsContainer);

    // Add event listeners for task actions
    buttonsContainer.addEventListener("click", (event) => {
      const button = event.target.closest("button"); // Get the closest button (even if clicking the icon)
      if (!button) return; // Ignore clicks outside buttons

      if (button.classList.contains("btnEdit")) {
        editTask(newLi, newLiText, buttonsContainer); // Pass the necessary elements
      } else if (button.classList.contains("btnRemove")) {
        removeTask(newLi);
      } else if (button.classList.contains("btnCheck")) {
        checkTask(newLiText, newLi);
      }
    });

    return newLi; // Return the created task element
  }

  function storeTaskInLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]"); // Retrieve existing tasks
    tasks.push(task); // Add the new task to the array
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks back to localStorage
  }

  function editTask(newLi, newLiText, buttonsContainer) {
    const inputEditTask = document.createElement("input"); // Create an input field for editing
    inputEditTask.classList.add("inputEditTask");
    inputEditTask.type = "text"; // Set input type to text
    inputEditTask.value = newLiText.textContent; // Set input value to current task

    const finishEditBtn = document.createElement("button");
    finishEditBtn.classList.add("btnFinishEdit");
    const checkIcon = document.createElement("i");
    checkIcon.setAttribute("data-lucide", "check");
    checkIcon.classList.add("iconFinishEdit");
    finishEditBtn.appendChild(checkIcon);

    const cancelEditionBtn = document.createElement("button");
    const cancelEditionIcon = document.createElement("i");
    cancelEditionBtn.classList.add("cancelEditionBtn");
    cancelEditionIcon.setAttribute("data-lucide", "x");
    cancelEditionIcon.classList.add("iconFinishRemove");
    cancelEditionBtn.appendChild(cancelEditionIcon);

    const editButtonsContainer = document.createElement("div");
    editButtonsContainer.classList.add("buttonsContainer");
    editButtonsContainer.append(finishEditBtn, cancelEditionBtn);

    newLi.textContent = ""; // Clear the list item content
    newLi.append(inputEditTask, editButtonsContainer); // Add input and buttons to the list item

    inputEditTask.focus(); // Focus on the input field

    finishEditBtn.addEventListener("click", () => {
      const inputEx = formEx.querySelector("input"); // Select the input field
      let task = inputEx.value;
      storeTaskInLocalStorage(task);

      newLiText.textContent = inputEditTask.value; // Update list item text
      newLi.textContent = "";
      newLi.append(newLiText, buttonsContainer); // Restore original buttons
    });

    cancelEditionBtn.addEventListener("click", () => {
      newLi.textContent = "";
      newLi.append(newLiText, buttonsContainer); // Restore original buttons
    });

    lucide.createIcons(); // Re-initialize Lucide icons
  }

  function removeTask(newLi) {
    newLi.remove(); // Remove the list item
    localStorage.removeItem("tasks");
  }

  function checkTask(newLiText, newLi) {
    newLiText.classList.toggle("checked"); // Toggle the "checked" class
    newLi.classList.toggle("checkedNewLi");
  }
}

// Initialize task managers for the starred and daily lists
setUpTaskManager("#task-form", "#task-list"); // Set up task manager for the starred list
setUpTaskManager("#task-form-daily", "#task-list-daily"); // Set up task manager for the daily list
