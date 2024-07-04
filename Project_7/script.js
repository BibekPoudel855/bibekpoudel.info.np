let apiKey = "d19db930781145a69e1d13dcbbb97cbe";
let baseURL = "https://newsapi.org/v2/everything?q=";
let loader = document.querySelector("#loader");
let paraMSG = document.querySelector("#para-MSG");
let cardContainer = document.querySelector(".card-container");
let aTagArray = document.querySelectorAll(".atag");
let navButton = document.querySelector("#nav-button");
let navInput = document.querySelector("#nav-search");
let navLogo = document.querySelector(".nav-logo");
let categoryNews = "nepali";

window.addEventListener("load", (e) => {
  fetchNews(categoryNews);
});

async function fetchNews(query) {
  loader.style.display = "flex";
  try {
    paraMSG.innerHTML = `Showing ${query.toUpperCase()} Related News`;
    let response = await fetch(`${baseURL}${query}&sortBy=publishedAt&apiKey=${apiKey}`);
    let data = await response.json();
    console.log(data); // Inspect the response
    bindData(data);
  } catch (error) {
    console.log("error occured", error);
  } finally {
    console.log("fetchNews function executed");
    loader.style.display = "none";
    cardContainer.style.display = "flex";
  }
}

function bindData(data) {
  if (!data.articles) {
    console.log('No articles found');
    return;
  }
  let articleArray = data.articles;
  let clutter = ``;
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
                <h6 id="news-source" class="news-source">${article.source.name} ${article.publishedAt}</h6>
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
      currSelected.classList.remove("active");
      currSelected = e.target;
      e.target.classList.add("active");
      clutter = ``;
      let query = e.target.getAttribute("id");
      paraMSG.innerHTML = `Showing ${query} News`;
      fetchNews(query);
    });
  });
}
changeNewsCategoryByOnClickAnchorTag();

navButton.addEventListener("click", () => {
  clutter = ``;
  let navInputValue = navInput.value || "nepali";
  fetchNews(navInputValue);
  currSelected.classList.remove("active");
  currSelected = document.querySelector("#nepali");
  currSelected.classList.add("active");
});

navLogo.addEventListener("click", () => {
  window.location.reload();
});
