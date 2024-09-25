// selection of elements
let searchInput = document.querySelector("#search-input");
let navCrossMark = document.querySelector("#nav-cross-btn");
let searchBtn = document.querySelector("#search-btn");
let currentQueryH1 = document.querySelector(".current-query-h1");
let searchResultsDiv = document.querySelector(".search-results");
let showMoreButton = document.querySelector(".show-more-button");
// nav code
searchInput.addEventListener("input", () => {
  if (searchInput.value != "") {
    navCrossMark.style.display = "block";
  } else {
    navCrossMark.style.display = "none";
  }
});
navCrossMark.addEventListener("click", () => {
  searchInput.value = "";
});
//API Details
//https://unsplash.com/oauth/applications/653596
//https://unsplash.com
//api base url
//https://api.unsplash.com/search/photos?page=1&query=office
// https://api.unsplash.com/search/photos?page=1&query=nature&client_id=oYDAOTmiviappDCcRUWqrF_Tvu03KVwZa8i4sAXlnZI
let applicationID = "653596";
let accessKey = "oYDAOTmiviappDCcRUWqrF_Tvu03KVwZa8i4sAXlnZI";
let secretKey = "3aW-EwX2Lx-ISKdlTsW5216RTqiT2oA04MQLSk4O8xs";
// main data fetch code code
let query = "Mt. Everest";
let page = 1;
let perPagePictures = 15;
window.addEventListener("load", () => {
  changeCurrQueryH1(query);
  fetchData(query);
});
// to show current query after nav section
function changeCurrQueryH1(query) {
  currentQueryH1.innerText = query;
}
// search button event
searchBtn.addEventListener("click", () => {
  if (searchInput.value == "") {
    alert("empty field");
  } else {
    clutter = "";
    query = searchInput.value;
    changeCurrQueryH1(query);
    fetchData(query);
  }
});
async function fetchData(query) {
  let BASE_URL = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}&per_page=${perPagePictures}`;
  let response = await fetch(BASE_URL);
  if (response.status != 200 || response.ok == "false") {
    alert("something went wrong!! please try again latar");
  }
  let data = await response.json();
  addDataToClutter(data);
}
let clutter = "";
function addDataToClutter(data) {
  resultArray = data.results;
  resultArray.forEach((array) => {
    console.log(array);
    clutter += `<div class="image-cont">
    <a href="${array.links.download}" target="_blank">
        <img src="${array.urls.small}" alt="img" class="main-single-img">
    </a>
    <div class="inside-img-user-cont">
        <div class="user-img-cont">
            <img src="${array.user.profile_image.small}" alt="img" class="inside-img-profile-img">
        </div>
        <a href="#" class="inside-img-user-name">${array.user.name}</a>
    </div>
    <button class="download-button" onclick="window.open('${array.links.html}', '_blank')">
        <i class="fa-solid fa-download"></i>
    </button>
  </div>`;
  });
  addDataToPage(clutter);
  displayShowMoreButton();
}
function addDataToPage(clutter) {
  searchResultsDiv.innerHTML = clutter;
}
function displayShowMoreButton() {
  showMoreButton.style.display = "block";
}
//show more button
showMoreButton.addEventListener("click", () => {
  page++;
  fetchData(query);
});
