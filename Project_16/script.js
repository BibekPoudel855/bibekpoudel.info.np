// Selection
let searchButton = document.querySelector("#search-button");
let inputField = document.querySelector("#input-field");
let currWheatherIMG = document.querySelector("#curr-wheather-icon");
let currTEMPR = document.querySelector("#curr-tempr");
let currLocationName = document.querySelector(".location-name");
let windSpeedPARA = document.querySelector("#wind-speed-para");
let humidityPARA = document.querySelector("#humidity-para");
let mainWeatherDIV = document.querySelector(".main-wheather");
let loaderContainer = document.querySelector(".loader-container");
//default location
let CITY_NAME = "Pokhara";
//Button Event
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputField.value == "") {
    errorMSG("Input Field Empty");
  } else {
    CITY_NAME = inputField.value;
    inputField.value = "";
    console.log("Button Clicked", CITY_NAME);
    fetchWheather(CITY_NAME);
  }
});

function errorMSG(message) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${message}`,
    footer: '<a href="#">Why do I have this issue?</a>',
  });
}
// page load event
window.addEventListener("load", () => {
  console.log("Window Loaded", CITY_NAME);
  fetchWheather(CITY_NAME);
});
/////////////////   API Source  /////////////////////
// https://openweathermap.org
let API_KEY = "387004109f92b9e9c1729f689801c103";
//main code
async function fetchWheather(CITY_NAME) {
  loaderContainer.style.display = "block";
  mainWeatherDIV.style.display = "none";
  console.log(`Fetching ${CITY_NAME} Data....`);
  let BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`;
  let response = await fetch(BASE_URL);
  console.log(response);
  //check in response error
  let checkError = checkCityNameCorrectOrNot(response);
  if (checkError == true) {
    let data = await response.json();
    console.log("Succeesfully Fetched");
    displayData(data);
  } else {
    return;
  }
}
function checkCityNameCorrectOrNot(response) {
  if (response.status != 200) {
    errorMSG("Location Not Found");
    ///for loader.  When error occured then to hide loader and main weather div
    loaderContainer.style.display = "none";
    mainWeatherDIV.style.display = "none";
    return false;
  } else {
    return true;
  }
}

function displayData(data) {
  console.log(data);
  changeIMG(data);
  currLocationName.innerHTML = `${data.name}`;
  currTEMPR.innerHTML = `${data.main.temp} °C`;
  humidityPARA.innerHTML = `${data.main.humidity}%`;
  windSpeedPARA.innerHTML = `${data.wind.speed} km/h`;
  // loader hidden and main weather displayed from here
  loaderContainer.style.display = "none";
  mainWeatherDIV.style.display = "flex";
}

function changeIMG(data) {
  //when wheather is clear then we are adding our owns img because default img is not good
  let ICON = data.weather[0].icon;
  if (data.weather[0].main == "Clear") {
    currWheatherIMG.src = `/Project_16/Project_16_IMG/clear.png`;
  } else {
    currWheatherIMG.src = `https://openweathermap.org/img/wn/${ICON}@2x.png`;
  }
}
