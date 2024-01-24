let body = document.querySelector("body");

// Dark/Light Mode
function darkLightMode() {
  let modeButton = document.querySelector(".mode-button");
  let allModeButtons = document.querySelectorAll(".all-mode-button");
  let currentMode = "light";
  modeButton.addEventListener("click", () => {
    if (currentMode === "light") {
      body.classList.add("dark");
      body.classList.remove("light");

      for (const classes of allModeButtons) {
        classes.classList.add("light-button");
        classes.classList.remove("dark-button");
      }
      modeButton.innerHTML = "Light Mode";
      currentMode = "dark";
    } else {
      body.classList.add("light");
      body.classList.remove("dark");

      for (const classes of allModeButtons) {
        classes.classList.add("dark-button");
        classes.classList.remove("light-button");
      }
      modeButton.innerHTML = "Dark Mode";
      currentMode = "light";
    }
  });
}
darkLightMode();
// main game logic
let buttons = document.querySelectorAll(".boxes");
let resetButton = document.querySelector(".reset-button");
let winnerMessagePortal=document.querySelector(".winner-message-portal");
let winnerH4=document.querySelector("#winner-h4");
let newGameButton=document.querySelector("#new-game-button");

let turnO = true;
let count=0; //to track draw
buttons.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO === true) {
      // player o
      box.style.color="blue";
      box.innerHTML = "O";
      turnO = false;
    } else {
      // player x
      box.style.color="green";
      box.innerHTML = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner=checkWinner();
    if(count === 9 && isWinner!==true){
      gameDrawn();
    }
  });
});

//conditon for winnner
const winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];
//winner message showing
function winnerMessage(winner){
  winnerH4.innerHTML=`Winner is ${winner}`;
  winnerMessagePortal.classList.remove("hide-message");
}
// to disable button when game ends
function disableButton(){
  for (const button of buttons) {
    button.disabled=true;
  }
}
// draw messege
function gameDrawn() {
  count=0;
  winnerH4.innerHTML=`Game Drawn`;
  winnerMessagePortal.classList.remove("hide-message");
}

//checking winner by some condn
function checkWinner() {
  for (let pattern of winningPattern) {
    let pos1=buttons[pattern[0]].innerText;
    let pos2=buttons[pattern[1]].innerText;
    let pos3=buttons[pattern[2]].innerText;
    if (pos1 !=="" && pos2!==""&pos3!=="") {
      if (pos1===pos2 && pos2===pos3) {
        winnerMessage(pos1);
        disableButton();
        return true;
      }
    }
  }
};
// to  enable button
function enableButton() {
  for (const button of buttons) {
    button.disabled=false;
  }
}
// reset and new game button 
function resetNewGame() {
  count=0;
  turnO=true;
  for (const button of buttons) {
    button.innerText="";
  }
  winnerMessagePortal.classList.add("hide-message");
  enableButton();
}
// after pressing reseting and new game button
newGameButton.addEventListener("click",resetNewGame);
resetButton.addEventListener("click",resetNewGame);

