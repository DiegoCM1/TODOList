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
