//selection
let hrsDiv = document.querySelector(".hrs");
let minDiv = document.querySelector(".min");
let secDiv = document.querySelector(".sec");
let digitalHrsCont = document.querySelector(".digital-hrs");
let digitalMinCont = document.querySelector(".digital-min");
let digitalSecCont = document.querySelector(".digital-sec");
let input_alaram_date = document.querySelector("#date-time-input");
let add_alaram_button = document.querySelector("#add-alaram-button");
let remove_alaram_button = document.querySelector("#remove-alaram-button");
let alaramDatePara = document.querySelector(".alaram-date-para");
function mainClock() {
  setInterval(() => {
    let date = new Date();
    let hrs = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    //formula to get rotation degree
    let hrsRotate = 30 * hrs + min / 2;
    let minRotate = 6 * min;
    let secRotate = 6 * sec;
    //applying rotate degree
    hrsDiv.style.transform = `rotate(${hrsRotate}deg)`;
    minDiv.style.transform = `rotate(${minRotate}deg)`;
    secDiv.style.transform = `rotate(${secRotate}deg)`;
  }, 1000);

  function nestedForDigitalClock() {
    setInterval(() => {
      let date = new Date();
      let hrs = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();

      if (hrs < 10) {
        digitalHrsCont.innerHTML = `0${hrs} Hrs`;
      } else {
        digitalHrsCont.innerHTML = `${hrs} Hrs`;
      }
      digitalMinCont.innerHTML = `${min} Min`;
      digitalSecCont.innerHTML = `${sec} Sec`;
    }, 1000);
  }
  nestedForDigitalClock();
}
mainClock();

// for set alaram button
//set alaram that re-direct to set alaram section
let set_alaram_button = document.querySelector("#set-alaram-button");
set_alaram_button.addEventListener("click", () => {
  open("#alaram-section", "_self");
});

let value_input_alaram_date = null;
//for set alaram section main
input_alaram_date.addEventListener("change", (e) => {
  value_input_alaram_date = input_alaram_date.value;
});
let audio = new Audio("/Project_14/Audio/mixkit-alarm-tone-996.wav");
let alaramRing = false;
let idOfRingSetTimeout = null;
add_alaram_button.addEventListener("click", () => {
  if (value_input_alaram_date != null) {
    let currDate = new Date();
    let alaramDate = new Date(value_input_alaram_date);
    let timeToRingInMS = alaramDate - currDate;
    if (alaramDate > currDate) {
      alaramRing = true;
      alaramStatus(alaramDate);
      alaramAddedSucesssAlert();
      idOfRingSetTimeout = setTimeout(() => {
        ringAlaram();
        //to stop alaram after 10 sec
        setTimeout(() => {
          stopAlaram();
        }, 10000);

        alertWhenAlaramRinging();
        removeAlaramStatus();
      }, timeToRingInMS);
    } else {
      alertForPastAlaram();
    }
  } else {
    alertForEmptyInputField();
  }
});

function alertWhenAlaramRinging() {
  let timerInterval;
  Swal.fire({
    title: "Do you want to Stop Alaram",
    confirmButtonText: "Stop",
    timer: 10000,
    didOpen: () => {
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    if (result.isConfirmed) {
      //stop in alaram when user click on stop button
      stopAlaram();
    }
  });
  setTimeout(() => {
    if (alaramRing == true) {
      audio.pause();
      alaramRing = false;
    }
  }, 5000);
}

// function alertWhenAlaramRinging(){
//     Swal.fire({
//         title: "Do you want to Stop Alaram",
//         confirmButtonText: "Stop",
//       }).then((result) => {
//         /* Read more about isConfirmed, isDenied below */
//         if (result.isConfirmed) {
//             stopAlaram();
//         }
//       });
// }

function ringAlaram() {
  audio.loop = true;
  audio.play();
  alaramRing = false;
}
function alaramStatus(alaramDate) {
  alaramDatePara.innerHTML = alaramDate;
}
function alaramAddedSucesssAlert() {
  Swal.fire({
    position: "mid",
    icon: "success",
    title: "Added Alaram Successfully",
    showConfirmButton: false,
    timer: 1500,
  });
}
function alertForPastAlaram() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Can't Set Alaram For Past",
    footer: '<a href="#">Why do I have this issue?</a>',
  });
}
function alertForEmptyInputField() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Add Your Alaram Date",
    footer: '<a href="#">Why do I have this issue?</a>',
  });
}
//button for remove alaram
remove_alaram_button.addEventListener("click", () => {
  if (alaramRing == true) {
    alaramRing = false;
    confirmationToRemoveAlaram();
    stopAlaram();
    clearTimeout(idOfRingSetTimeout);
  } else {
    alertForNotAlaramAdded();
  }
});
function removeAlaramStatus() {
  alaramDatePara.innerHTML = "";
}
function stopAlaram() {
  audio.pause();
}
//confirming to remove or not alaram but if yes to remove then empty paragraph and pause alaram
function confirmationToRemoveAlaram() {
  Swal.fire({
    title: "Do you want to remove Alaram?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      /////////// removing alaram status paragraph or setting empty paragraph////////////
      removeAlaramStatus();
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}
function alertForNotAlaramAdded() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Not any Alaram Found",
    footer: '<a href="#">Why do I have this issue?</a>',
  });
}
