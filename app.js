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

const showStarredList = (event) => {
  //Function to show the starred list
  starredList.style.display = "flex"; //Show the starred list
  dailyList.style.display = "none"; //Hide the daily list
  newList.style.display = "none"; //Hide the new list

  if ((event.target.style.display = "flex")) {
    event.target.closest("button").classList.add("selectedBtnNav");
    dailyListButton.classList.remove("selectedBtnNav");
    newListButton.classList.remove("selectedBtnNav");
  }
};

const showDailyList = (event) => {
  //Function to show the daily list
  starredList.style.display = "none"; //Hide the starred list
  dailyList.style.display = "flex"; //Show the daily list
  newList.style.display = "none"; //Hide the new list

  if ((event.target.style.display = "flex")) {
    event.target.classList.add("selectedBtnNav");
    starredListButton.classList.remove("selectedBtnNav");
    newListButton.classList.remove("selectedBtnNav");
  }
};

const showNewList = (event) => {
  //Function to show the new list
  starredList.style.display = "none"; //Hide the starred list
  dailyList.style.display = "none"; //Hide the daily list
  newList.style.display = "flex"; //Show the new list

  if ((event.target.style.display = "flex")) {
    event.target.classList.add("selectedBtnNav");
    starredListButton.classList.remove("selectedBtnNav");
    dailyListButton.classList.remove("selectedBtnNav");
  }
};

starredListButton.addEventListener("click", showStarredList); //Add event listener to the starred list button
dailyListButton.addEventListener("click", showDailyList); //Add event listener to the daily list button
newListButton.addEventListener("click", showNewList); //Add event listener to the new list button

//Shows the section marked at the beggining
document.addEventListener("DOMContentLoaded", () => {
  showStarredList({ target: starredListButton }); // Simulate the event with the button as the target
});

function setUpTaskManager(formSelector, listSelector) {
  const formEx = document.querySelector(formSelector);
  const list = document.querySelector(listSelector);

  formEx.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputEx = formEx.querySelector("input"); // Select input inside the correct form

    if (inputEx.value.trim() === "") return;

    const newLi = document.createElement("li");
    newLi.classList.add("newLi");
    newLi.textContent = inputEx.value;

    const newEditBtn = document.createElement("button");
    newEditBtn.textContent = "✏️";
    const newRemoveBtn = document.createElement("button");
    newRemoveBtn.textContent = "❌";
    const newCheckBtn = document.createElement("button");
    newCheckBtn.textContent = "✅";

    newLi.append(newEditBtn, newRemoveBtn, newCheckBtn);
    list.append(newLi);

    newEditBtn.addEventListener("click", () => {
      const inputEditTask = document.createElement("input");
      inputEditTask.type = "text";
      inputEditTask.value = newLi.childNodes[0].nodeValue;

      const finishEditBtn = document.createElement("button");
      finishEditBtn.textContent = "✔️";

      newLi.textContent = "";
      newLi.append(inputEditTask, finishEditBtn, newRemoveBtn);

      inputEditTask.focus();

      finishEditBtn.addEventListener("click", () => {
        newLi.textContent = inputEditTask.value;
        newLi.append(newEditBtn, newRemoveBtn, newCheckBtn);
      });
    });

    newRemoveBtn.addEventListener("click", () => {
      newLi.remove();
    });

    newCheckBtn.addEventListener("click", () => {
      newLi.classList.toggle("checked");
      newLi.classList.remove("newLi:hover");
    });

    inputEx.value = "";
  });
}

// Initialize both lists
setUpTaskManager("#task-form", "#task-list");
setUpTaskManager("#task-form-daily", "#task-list-daily");
