const tmdbKey = '8ac4aafb825fd0b5b6024aca6053c294';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');
const genreDropdown = document.getElementById('genreDropdown'); // Make sure this matches your HTML element

// Function to fetch genres and populate the dropdown
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Full response:", jsonResponse); // Log the entire response
      const genres = jsonResponse.genres; // Get genres array
      console.log("Genres:", genres); // Log the genres array

      populateGenreDropdown(genres); // Populate dropdown
      return genres; // Return genres for further use if needed
    } else {
      console.error("Error fetching genres:", response.status);
    }
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

// Function to populate the genre dropdown with options
const populateGenreDropdown = (genres) => {
  // Check if the dropdown exists
  if (genreDropdown) {
    genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre.id; // Set genre ID as value
      option.textContent = genre.name; // Display genre name
      genreDropdown.appendChild(option); // Add the option to the dropdown
    });
    console.log("Dropdown populated with genres");
  } else {
    console.error('Dropdown element not found');
  }
};

// Function to get the selected genre from the dropdown
const getSelectedGenre = () => {
  return genreDropdown.value; // Get selected genre ID from the dropdown
};

// Function to get movies based on the selected genre
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  if (!selectedGenre) {
    console.error("No genre selected.");
    return;
  }

  const genreRequestEndpoint = `/discover/movie`; // Fetch movies based on genre
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Movies response:", jsonResponse);
      const movies = jsonResponse.results; // Array of movie results
      console.log("Movies:", movies);
      // You can now display these movies or pick a random movie to display
    } else {
      console.error("Error fetching movies:", response.status);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

// Function to display a random movie
const showRandomMovie = () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }

  // Call getMovies() when the play button is clicked
  getMovies();
};

// Clear the current movie display (if needed)
const clearCurrentMovie = () => {
  const movieInfo = document.getElementById('movieInfo');
  movieInfo.innerHTML = ""; // Clear movie display
};

// Fetch genres and populate the dropdown when the page loads
document.addEventListener("DOMContentLoaded", () => {
  getGenres(); // Fetch genres when the page loads
});

// Event listener for the "Play" button
playBtn.onclick = showRandomMovie;
// End of FilmFinder.js