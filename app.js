//myButton
const myButton = document.getElementById("btn");
const btnClickCallback = () => {
    alert("You clicked me!");
    myButton.removeEventListener("click", btnClickCallback);
}
myButton.style.backgroundColor = "gray";

myButton.addEventListener("mouseover", () => {
    myButton.style.backgroundColor = "red";
})
myButton.addEventListener("mouseout", () => {
    myButton.style.backgroundColor = "gray";
})

myButton.addEventListener("click", btnClickCallback);


//Substract
const myButtonSubstract = document.getElementById("btnSubstract");


//Add
const myButtonAdd = document.getElementById("btnAdd");




console.log(myButton);
console.log('TODOList is connected!');
