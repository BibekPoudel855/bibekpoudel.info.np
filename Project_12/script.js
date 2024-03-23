//selection
const inputField=document.querySelector("#pass-input");
const generateButton=document.querySelector(".generate-button");
const copyImg=document.querySelector("#copy-img");
// letters which password includes
const length = 12;
upperCase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase= "abcdefghijklmnopqrstuvwxyz";
const number="1234567890";
const symbol="@#$!%^&*()_+=?:[]-";
//include all lettters
allLetters=upperCase+lowerCase+number+symbol;
//to gen password
function generatePassword() {
    let password="";
    while(length > password.length){
        password = password + allLetters[Math.floor(Math.random()*allLetters.length)];
    }
    inputField.value=password;
}
generateButton.addEventListener("click",generatePassword);

//to copy password
copyImg.addEventListener("click",()=>{
    inputField.select();
    document.execCommand("copy");
})



