let userScore=0;
let computerScore=0;

let userScorePara=document.querySelector("#text-user-score");
let comScorePara=document.querySelector("#text-computer-score");
console.log(userScorePara,comScorePara);
const userAllChoice=document.querySelectorAll(".all-choice-img");
const paraGameMsg=document.querySelector("#para-game-msg");
const resetGameButton=document.querySelector("#reset");
//Draw Game Condn
function drawGame(compChoice) {
    console.log("Game Draw");
    paraGameMsg.innerHTML=`Game Drawn ${compChoice}`;
    paraGameMsg.style.color="black";
};
//generating computer choice
function generateComputerChoice() {
    const allChoice=["rock","paper","scissor"];
    let randomNumber=Math.trunc(Math.random()*3);
    return allChoice[randomNumber];
};
//show Winner
function showWinner(userWIn,compChoice,userChoiceId) {
    if (userWIn === true) {
        userScore++;
        userScorePara.innerText=userScore;
        console.log(userScore);
        paraGameMsg.innerHTML=`You Win, Your ${userChoiceId} Beats Computer ${compChoice}`;
        paraGameMsg.style.color="green";
    }else{
        computerScore++;
        comScorePara.innerText=computerScore;
        paraGameMsg.innerHTML=`You Lost, Computer ${compChoice} Beats Your ${userChoiceId}`;
        paraGameMsg.style.color="red";
    }
};
// main game function
function playGame(userChoiceId) {
    // Calling To Generate Computer Choice
    let compChoice=generateComputerChoice();
    //main winner logic
    if (userChoiceId === compChoice) {
        // Draw game
        drawGame(compChoice);
    }else{
        let userWIn=true;
        if (userChoiceId === "rock") {
            compChoice==="paper" ? userWIn=false : userWIn =true;
        }else if(userChoiceId === "paper"){
            compChoice === "scissor" ? userWIn=false : userWIn = true;
        }else if(userChoiceId ==="scissor"){
            compChoice==="rock" ? userWIn=false : userWIn=true;
        }
        showWinner(userWIn,compChoice,userChoiceId);
    }
};
userAllChoice.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChoiceId=choice.getAttribute("id");
        playGame(userChoiceId);
    });
});


//reset Game button
resetGameButton.addEventListener("click",()=>{
    userScore=0;
    userScorePara.innerText=userScore;
    computerScore=0;
    comScorePara.innerText=userScore;
    paraGameMsg.innerText="Choose Your Weapon";
    paraGameMsg.style.color="white";
});