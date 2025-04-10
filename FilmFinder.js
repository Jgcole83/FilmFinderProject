const tmdbKey = '';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');
const genreDropdown = document.getElementById('genreDropdown');
const movieContainer = document.getElementById('movieContainer');

// Function to fetch genres and populate the dropdown
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      populateGenreDropdown(genres); 
    } else {
      console.error("Error fetching genres:", response.status);
    }
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

// Function to populate the genre dropdown with options
const populateGenreDropdown = (genres) => {
  if (genreDropdown) {
    genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre.id;
      option.textContent = genre.name;
      genreDropdown.appendChild(option);
    });
  } else {
    console.error('Dropdown element not found');
  }
};

// Function to get the selected genre from the dropdown
const getSelectedGenre = () => {
  return genreDropdown.value;
};

// Function to fetch movies based on the selected genre
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  if (!selectedGenre) {
    console.error("No genre selected.");
    return;
  }

  const genreRequestEndpoint = `/discover/movie`;
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      displayMovies(movies); // Display movies after fetching
    } else {
      console.error("Error fetching movies:", response.status);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

// Function to display movies
const displayMovies = (movies) => {
  movieContainer.innerHTML = ''; // Clear previous movie display

  if (movies.length > 0) {
    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');

      const movieTitle = document.createElement('h3');
      movieTitle.textContent = movie.title;
      movieElement.appendChild(movieTitle);

      const movieOverview = document.createElement('p');
      movieOverview.textContent = movie.overview;
      movieElement.appendChild(movieOverview);

      if (movie.poster_path) {
        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieElement.appendChild(moviePoster);
      }

      movieContainer.appendChild(movieElement); 
    });
  } else {
    movieContainer.textContent = 'No movies found for this genre.';
  }
};

// Event listener for the "Play" button
playBtn.onclick = getMovies;

// Fetch genres when the page loads
document.addEventListener("DOMContentLoaded", () => {
  getGenres();
});
