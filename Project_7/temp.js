// source website for api key
// https://newsapi.org/
let apiKey = "0b8a7a4c25234a74a7bb45311cd9b190";
let baseURL = "https://newsapi.org/v2/everything?q=";
let proxyURL = "https://api.allorigins.win/get?url=";

// Selection of elements
let loader = document.querySelector("#loader");
let paraMSG = document.querySelector("#para-MSG");
let cardContainer = document.querySelector(".card-container");
let aTagArray = document.querySelectorAll(".atag");
let navButton = document.querySelector("#nav-button");
let navInput = document.querySelector("#nav-search");
let navLogo = document.querySelector(".nav-logo");
//news you want to visible
let categoryNews = "nepali";
//event that will be fired when the page is loaded
window.addEventListener("load", (e) => {
  fetchNews(categoryNews);
});

async function fetchNews(query) {
  loader.style.display = "flex";
  try {
    paraMSG.innerHTML = `Showing ${query.toUpperCase()} Related News`;
    let response = await fetch(`${proxyURL}${encodeURIComponent(`${baseURL}${query}&sortBy=publishedAt&apiKey=${apiKey}`)}`);
    let result = await response.json();
    let data = JSON.parse(result.contents); // Parse the inner JSON from the proxy response
    bindData(data);
  } catch (error) {
    console.log("error occurred", error);
  } finally {
    console.log("fetchNews function executed");
    loader.style.display = "none";
    cardContainer.style.display = "flex";
  }
}

let clutter = ``;
function bindData(data) {
  let articleArray = data.articles;
  articleArray.forEach((article) => {
    if (!article.urlToImage) {
      return;
    } else {
      clutter += `<div class="card">
            <div class="card-header">
                <img src="${article.urlToImage}" alt="News_IMG" id="news-img">
            </div>
            <div class="card-content">
                <h3 id="news-title" class="news-title"><a target="_blank" href="${article.url}">${article.title}</a></h3>
                <h6 id="news-source" class="news-source">${article.source.name} ${new Date(article.publishedAt).toLocaleString()}</h6>
                <p class="news-description" id="news-description">${article.description}</p>
            </div>
        </div>`;
    }
  });
  cardContainer.innerHTML = clutter;
}

let currSelected = document.querySelector("#nepali");
currSelected.classList.add("active");
function changeNewsCategoryByOnClickAnchorTag() {
  aTagArray.forEach((aTag) => {
    aTag.addEventListener("click", (e) => {
      // to add active class on the clicked anchor tag
      currSelected.classList.remove("active");
      currSelected = e.target;
      e.target.classList.add("active");
      // to change category of news when click a tag
      clutter = ``;
      let query = e.target.getAttribute("id");
      paraMSG.innerHTML = `Showing ${query} News`;
      fetchNews(query);
    });
  });
}
changeNewsCategoryByOnClickAnchorTag();

// search news by input field
navButton.addEventListener("click", () => {
  clutter = ``;
  if (navInput.value == "") {
    navInputValue = "nepali";
    fetchNews(navInputValue);
  } else {
    let navInputValue = navInput.value;
    fetchNews(navInputValue);
    // to remove active class from the anchor tag
    // when search button is clicked
    currSelected.classList.remove("active");
    currSelected = document.querySelector("#nepali");
    currSelected.classList.add("active");
  }
});

//reload page when click on the logo
navLogo.addEventListener("click", () => {
  window.location.reload();
});
