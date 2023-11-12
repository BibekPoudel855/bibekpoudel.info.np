// let apikey = "d19db930781145a69e1d13dcbbb97cbe";
let apikey = "0b8a7a4c25234a74a7bb45311cd9b190";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener("load", () => fetchnews("ICC"));


// to fetch or to get articlee or news
async function fetchnews(query) {
  // const res=await
  // fetch('${url}${query}&apiKey=${apikey}');
  const res = await fetch(`${url}${query}&apiKey=${apikey}`);
  const data = await res.json();
  bindData(data.articles);
}
function bindData(articles) {
  const cardsContainer = document.getElementById("card-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}
// fill data in template tag
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-description");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} · ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

// Categ of nerws
// let news_search=prompt('Search News');
// window.addEventListener('load', ()=> fetchnews(news_search));



// Input
// adding function of search button  and input
const searchButton = document.getElementById("nav-button");
const searchText = document.getElementById("nav-search");
