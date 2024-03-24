//selection
const inputField=document.querySelector("#pass-input");
const generateButton=document.querySelector(".generate-button");
const copyImg=document.querySelector("#copy-img");
const rangeValueSpan=document.querySelector(".range-val");
const rangeBar=document.querySelector("#range");
const numberCheckbox=document.querySelector("#number");
const symbolChekbox=document.querySelector("#symbol");
const upperCaseCheckbox=document.querySelector("#uppercase");
const lowerCaseCheckbox=document.querySelector("#lowercase");
// letters which password includes
let length = rangeBar.value;
function changeSpanVal(){
    // range value showing
    rangeValueSpan.innerText=rangeBar.value;
    // length value 
    length=rangeBar.value
}
rangeBar.addEventListener("input",changeSpanVal);



upperCase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase= "abcdefghijklmnopqrstuvwxyz";
const number="1234567890";
const symbol="@#$!%^&*()_+=?:[]-";
//include all lettters
allLetters=upperCase+lowerCase+number+symbol;

function generateAndReturn(letter) {
    let temp="";
        temp += letter[Math.floor(Math.random()*letter.length)];
    return temp;
}
function generatePassword() {
        let password="";
        let countLengt=0;
        while (length>password.length) {
            if (lowerCaseCheckbox.checked) {
                password+=generateAndReturn(lowerCase);
            }
            if (upperCaseCheckbox.checked) {
                password+=generateAndReturn(upperCase);
            }
            if (symbolChekbox.checked) {
                password+=generateAndReturn(symbol);
            }
            if(numberCheckbox.checked){
                password+=generateAndReturn(number);
            }
        }
        displayPassword(password);
}


function displayPassword(password) {
    inputField.value=password;
}


generateButton.addEventListener("click",generatePassword);
//to copy password
copyImg.addEventListener("click",()=>{
    inputField.select();
    document.execCommand("copy");
});

