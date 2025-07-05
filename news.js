const apiKey = '7959e3fda5db4003b4c7b8b7e5143a7e';

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Fetch random top headlines (US)
async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=47&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching random news:", error);
    return [];
  }
}

// Fetch news based on search query
async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching news by query:", error);
    return [];
  }
}

// Display articles as blog cards
function displayBlog(articles) {
  blogContainer.innerHTML = "";

  if (articles.length === 0) {
    blogContainer.innerHTML = "<p>No articles found. Try a different search.</p>";
    return;
  }

  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    const img = document.createElement("img");
    img.src = article.urlToImage || "https://placehold.co/600x400?text=No+Image";
    img.alt = article.title || "News Image";

    const title = document.createElement("h2");
    const titleText = article.title || "No Title";
    title.textContent = titleText.length > 60 ? titleText.slice(0, 60) + "..." : titleText;

    const description = document.createElement("p");
    const descText = article.description || "No description available.";
    description.textContent = descText.length > 120 ? descText.slice(0, 120) + "..." : descText;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);

    // Open full article in new tab
    blogCard.addEventListener('click', () => {
      window.open(article.url, "_blank");
    });

    blogContainer.appendChild(blogCard);
  });
}

// Search button click handler
searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlog(articles);
    } catch (error) {
      console.error("Error fetching news by query:", error);
    }
  }
});

// Load random news on page load
(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlog(articles);
  } catch (error) {
    console.error("Error fetching random news:", error);
  }
})();
