document.addEventListener('DOMContentLoaded', function () { 
    fetchMovies(); 
}); 

function fetchMovies() { 
    const apiKey = 'your_api_key'; 
    const MoviesGrid = document.getElementById('MoviesGrid'); 
    MoviesGrid.innerHTML = '<p>Loading movies...</p>'; 

    const randomSearchTerms = ['action', 'comedy', 'drama', 'adventure']; 
    const randomTerm = randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)]; 

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${randomTerm}`) 
        .then(response => response.json()) 
        .then(data => { 
            if (data.Search && data.Search.length > 0) { 
                showMovies(data.Search, apiKey); 
            } else { 
                MoviesGrid.innerHTML = '<p>No random movies found!</p>'; 
            } 
        }) 
        .catch(error => { 
            console.error('Error fetching random movies:', error); 
            MoviesGrid.innerHTML = '<p>Error fetching movies. Please try again later.</p>'; 
        }); 
} 

function searchMovies() { 
    const apiKey = 'your_api_key'; 
    const searchInput = document.getElementById('searchInput').value; 
    const MoviesGrid = document.getElementById('MoviesGrid'); 

    if (searchInput.trim() !== '') { 
        MoviesGrid.innerHTML = '<p>Loading movies...</p>'; 

        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`) 
            .then(response => response.json()) 
            .then(data => { 
                if (data.Search && data.Search.length > 0) { 
                    showMovies(data.Search, apiKey); 
                } else { 
                    MoviesGrid.innerHTML = '<p>No movies found with the given name!</p>'; 
                } 
            }) 
            .catch(error => { 
                console.error('Error fetching data:', error); 
                MoviesGrid.innerHTML = '<p>Error fetching movies. Please try again later.</p>'; 
            }); 
    } else { 
        alert('Enter a movie title then search!'); 
    } 
} 

function showMovies(movies, apiKey) { 
    const MoviesGrid = document.getElementById('MoviesGrid'); 
    MoviesGrid.innerHTML = ''; 

    movies.forEach(movie => { 
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`) 
            .then(response => response.json()) 
            .then(details => { 
                const movieCard = document.createElement('div'); 
                movieCard.classList.add('movie-card'); 

                movieCard.innerHTML = ` 
                    <img src="${details.Poster}" alt="${details.Title}"> 
                    <div class="movie-card-content">
                        <h2>${details.Title}</h2> 
                        <p>Year: ${details.Year}</p> 
                        <p>Director: ${details.Director}</p> 
                        <p>Genre: ${details.Genre}</p> 
                        <p>IMDb Rating: ${details.imdbRating}</p> 
                        <p>Plot: ${details.Plot}</p> 
                    </div>
                `; 

                MoviesGrid.appendChild(movieCard); 
            }) 
            .catch(error => { 
                console.error('Error fetching movie details:', error); 
            }); 
    }); 
}
