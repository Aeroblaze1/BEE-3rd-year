// const colors = [
//     "red", "blue", "green", "orange", "purple", "yellow",
//     "pink", "brown", "cyan", "magenta", "lime", "teal","cornflowerblue"
//   ];

//   function changeColor() {
//     const ran = Math.floor(Math.random() * colors.length);
//     document.getElementById("box").style.backgroundColor = colors[ran];
//     document.getElementById("text").innerText = `changed the color to ${colors[ran]}`;
//   }

const colors = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "pink",
  "brown",
  "cyan",
  "magenta",
  "lime",
  "teal",
  "cornflowerblue",
];

let intervalId = null;

function randomColor() {
  let i = Math.floor(Math.random() * colors.length); //Math.random goes to 0 to 1 exclusive
  return colors[i];
   
}

let box = document.querySelector("#box");
let genbtn = document.querySelector(".btn");
let stopbtn = document.querySelector(".stop");

genbtn.addEventListener("click", function () {


  intervalId = setInterval(() => {
      let color = randomColor();
  box.style.backgroundColor = color;
   document.getElementById(
    "text"
  ).innerText = `changed the color to ${color}`;
  }, 1000);
 
})

stopbtn.addEventListener("click",function(){
   if(intervalId){
    clearInterval(intervalId);
   }
})

