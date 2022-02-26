const apiKey = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0f47f5cf344875d7fd1e393bf8ad5e6c&page=1';
const imageLink = 'https://image.tmdb.org/t/p/w500/';
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=0f47f5cf344875d7fd1e393bf8ad5e6c&query=`;


const getMovieData = async() =>{
    const response = await fetch(apiKey);
    const data = await response.json();
    displayMovieData(data.results);
};

getMovieData();

const displayMovieData = (data) =>{
    const mainSection = document.querySelector('.main-section');
    console.log(data);
    for(movie of data){
        const poster = imageLink + movie.poster_path;
        
        const div = document.createElement('div');
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        div.appendChild(contentDiv);
        div.classList.add('card');

        contentDiv.innerHTML = `
          <div class="back from-left">
            <h2>${movie.original_title}</h2>
            <span class="rating">${movie.vote_average}</span>
            <p class="des">
              ${movie.overview.slice(0, 250)}
            </p>
          </div>

        `
        contentDiv.style.backgroundImage = `url('${poster}')`;
        mainSection.appendChild(div);
    }
}