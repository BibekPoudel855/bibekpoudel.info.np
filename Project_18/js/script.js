// Home page
//selection of element
let shopNowButton = document.getElementById("shop-now");
let newsLetterInput = document.getElementById("newsletter-input");
let newsLetterMessageP = document.getElementById(
  "message-for-newsletter-validation"
);
console.log(newsLetterMessageP);
//shop now button function
function shopNowButtonEvent() {
  console.log("click");
  open("./src/html/product.html");
}
// buyNow Button
function buyNowButton() {
  open("./src/html/product.html");
}
//newsletter input field validation
function newsLetterValidation() {
  var newsLetterInputValue = newsLetterInput.value;
  console.log(newsLetterInputValue);
  if (newsLetterInputValue == "") {
    newsLetterMessageP.style.color = "red";
    newsLetterMessageP.innerText = "Input cant be Empty";
  } else if (newsLetterInputValue.length < 8) {
    newsLetterMessageP.style.color = "red";
    newsLetterMessageP.innerText = "Not valid Mail length";
  } else if (!newsLetterInputValue.includes("@")) {
    newsLetterMessageP.style.color = "red";
    newsLetterMessageP.innerText = "Not valid Mail";
  } else {
    newsLetterMessageP.style.color = "green";
    newsLetterMessageP.innerText = "Thank You For Subscribe";
  }
}
// About us page
//Feedback-Form validation
function validateForm() {
  const firstname = document.getElementById("firstname").value; //Select HTML elemens with the id attribute set to "firstname"
  const lastname = document.getElementById("lastname").value; //Select HTML elemens with the id attribute set to "lastname"
  const email = document.getElementById("Email").value; //Select HTML elemens with the id attribute set to "Email"
  const suggestion = document.getElementById("suggestion").value; //Select HTML elemens with the id attribute set to "Suggestion"
  console.log(firstname, lastname, email, suggestion); //It is used for debugging or viewing variable values
  if (firstname == "" || lastname == "" || suggestion == "" || email == "") {
    alert("Input cannot be empty");
  } else if (
    firstname.length <= 3 ||
    lastname.length <= 3 ||
    email.length < 10
  ) {
    alert("Enter Valid Data");
  } else {
    alert("Thank you");
  }
}
