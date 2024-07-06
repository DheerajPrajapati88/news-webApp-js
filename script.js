const API_KEY = "abcf18dfce9a40389e42e9ee66cdcb1f";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", function () {
  fetchNews("India");
});
function reload() {
  window.location.reload();
}
async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}
function bindData(articles) {
  const cardContainer = document.getElementById("cards-container");
  const newsCardTemplete = document.getElementById("template-news-card");
  cardContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplete.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}
function fillDataInCard(cardClone, article) {
   const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");
  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleString("en-Us", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} - ${date}`;

  cardClone.firstElementChild.addEventListener("click", function () {
    window.open(article.url, "_blank");
  });
}
let curSelectedNav = null;
function onNavItemClick(id) {
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
  fetchNews(id);
}
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
searchButton.addEventListener("click", function () {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});

function themeChange(articles) {
  const theme = document.querySelector(".theme");
  const change = document.querySelector(".switch");
  theme.addEventListener("click", function () {
    if (!change.classList.contains("slide")) {
      change.classList.add("slide");
      document.body.style.backgroundColor = "#000";
    document.querySelectorAll(".news-title,.news-source").forEach((item)=>{
     
      item.style.color="#fff"

    })
      
    }
     else {
      change.classList.remove("slide");
      document.body.style.backgroundColor = "#fff";
      document.querySelectorAll(".news-title,.news-source").forEach((item)=>{
     
        item.style.color="#000"
  
      })
  
    }
  });
}
themeChange();
window.addEventListener("scroll", function () {
    const scrollHeight = window.pageYOffset;
    const goUp = document.querySelector(".goto-top");
    const nav = document.querySelector("nav");
    const navHeight = nav.getBoundingClientRect().height;
    console.log(navHeight);
    if (scrollHeight > navHeight) {
        document.querySelector(".goto-top").style.visibility = "visible";
        document.querySelector(".goto-top").style.scale= "1";
    } else {
        document.querySelector(".goto-top").style.visibility = "hidden";
        document.querySelector(".goto-top").style.scale= "0";
    }
    
    goUp.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            left:0,
        });
    });
});


