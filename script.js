const searchButton = document.getElementById("button");
const searchInput = document.getElementById("search");
const resultsContainer = document.getElementById("results");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === "") {
    resultsContainer.innerHTML = "<p>Please enter a search term</p>";
    return;
  }

  const apiUrl = `https://itunes.apple.com/search?entity=allArtist&attribute=allArtistTerm&term=${searchTerm}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const results = data.results;

      if (results.length === 0) {
        resultsContainer.innerHTML = "<p>No results found</p>";
      } else {
        resultsContainer.innerHTML = "";
        results.forEach((result) => {
          const artistName = result.artistName;
          const genre = result.primaryGenreName || "Unknown Genre";
          const resultElement = document.createElement("div");
          resultElement.innerHTML = `<p><strong>${artistName}</strong> (${genre})</p>`;
          resultsContainer.appendChild(resultElement);
        });
      }
    })
    .catch((error) => console.error(error));
});
