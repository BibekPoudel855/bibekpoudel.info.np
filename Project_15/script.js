// url for api
const apiKey = "076b46e31b493c879d35fb7e";
// url structure and source
//https://www.exchangerate-api.com/
// const BASE_URL =`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest`;
//selecting the elements
let selectsArray = document.querySelectorAll(".drop-down select");
let convertButton = document.querySelector("#convert-button");
let swapCont=document.querySelector(".mid-icon-cont");
let fromInput = document.querySelector("#from-input");
let toInput = document.querySelector("#to-input");
let fromSelect = document.querySelector("#from-select");
let toSelect = document.querySelector("#to-select");
let paraMessage=document.querySelector("#para-message");
let dateSpan = document.querySelector("#para-date span");

// main code

//event to load when page open
// it directly convert value by default
window.addEventListener("load", () => {
  buttonEvent();
});

//
function addingSelectsText() {
  selectsArray.forEach((select) => {
    for (const key in countryList) {
      let newOption = document.createElement("option");
      newOption.value = key;
      newOption.innerText = key;
      select.appendChild(newOption);
      byDefaultOptionSelection(select, key);
    }
    select.addEventListener("change", (e) => {
      changeFlagWithChangeInOption(e);
    });
  });
}
addingSelectsText();
//making USD and NPR selected option by default when opening page
function byDefaultOptionSelection(select, key) {
  if (select.name === "from" && key === "USD") {
    select.value = "USD";
  }
  if (select.name === "to" && key === "NPR") {
    select.value = "NPR";
  }
}


//change flag with change in select
function changeFlagWithChangeInOption(e) {
  let currencyCode = e.target.value;
  let counrtryCode = countryList[currencyCode];
  let newImgSRC = `https://flagsapi.com/${counrtryCode}/flat/64.png`;
  let flagIMG = e.target.parentElement.querySelector("img");
  flagIMG.src = newImgSRC;
}
//swap event
swapCont.addEventListener("click",(e)=>{
  let tempForSwap=fromSelect.value;
  fromSelect.value=toSelect.value;
  toSelect.value=tempForSwap;
  let fromImgSrc = fromSelect.parentElement.querySelector("img").src;
  let toImgSrc=toSelect.parentElement.querySelector("img").src;
  document.querySelector("#from-img").src=toImgSrc;
  document.querySelector("#to-img").src=fromImgSrc;
});
// button event and making userfrendly
convertButton.addEventListener("click", (e) => {
  buttonEvent(e);
});

function buttonEvent(e) {
  let fromInputVal = fromInput.value;
  let toInputVal = toInput.value;
  checkInputFieldEmptyOrNot(fromInputVal);
  checkInputValueLessThanZero(fromInputVal);
  api(fromInputVal);
}
function checkInputFieldEmptyOrNot(fromInputVal) {
  if (fromInputVal === "") {
    emptyInputError();
  }
}
function emptyInputError() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Input Field Is Empty",
    footer: '<a href="#">Why do I have this issue?</a>',
  });
}
function checkInputValueLessThanZero(fromInputVal) {
  if (fromInputVal <= 0) {
    fromInput.value = 1;
  }
}

// calling API code
async function api(fromInputVal) {
  let fromSelectVal = fromSelect.value.toLowerCase();
  let toSelectVal = toSelect.value;
  let url = `${BASE_URL}/${fromSelectVal}`;
  let response = await fetch(url);
  let data = await response.json();
  let rate = data.conversion_rates[toSelectVal];
  let finalConvertedAmount = rate * fromInputVal;

//   updating Message 
toInput.value = finalConvertedAmount;
paraMessage.innerHTML=`<span>1</span> ${fromSelectVal.toUpperCase()} = <span>${rate}</span> ${toSelectVal}`;
}

// change date in last paragraph
function changeDate() {
  let date = new Date().toLocaleDateString();
  dateSpan.innerText=`${date}`;
}
changeDate();
