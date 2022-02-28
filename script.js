const apiKey = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0f47f5cf344875d7fd1e393bf8ad5e6c&page=1';
const imageLink = 'https://image.tmdb.org/t/p/w500/';
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=0f47f5cf344875d7fd1e393bf8ad5e6c&query=`;
const searchForm = document.querySelector('#movie-search');
const mainSection = document.querySelector('.main-section');
const trendingApiKey = 'https://api.themoviedb.org/3/trending/all/day?api_key=0f47f5cf344875d7fd1e393bf8ad5e6c';
const trendingSection = document.querySelector('.trending-movies');





const getMovieData = async(link, section) =>{
    const response = await fetch(link);
    const data = await response.json();
    displayMovieData(data.results, section);
};

getMovieData(apiKey, mainSection);
getMovieData(trendingApiKey,trendingSection);

const displayMovieData = (data, section) =>{
    for(movie of data){
        const poster = imageLink + movie.poster_path;    
        const div = document.createElement('div');
        const contentDiv = document.createElement('div');
        const movieRating = movie.vote_average;

        contentDiv.classList.add('content');
        div.appendChild(contentDiv);
        div.classList.add('card');

        contentDiv.innerHTML = `
          <div class="back from-left">
            <h2>${movie.original_title}</h2>
            <span class = "${getRating(movieRating)} rating" >${movieRating}</span>
            <p class="des">
              ${movie.overview.slice(0, 250)}
            </p>
          </div>

        `
        contentDiv.style.backgroundImage = `url('${poster}')`;


        section.appendChild(div);
      
    }
};

searchForm.addEventListener('keyup', function () {
    
        const searchValue = searchForm.value.toLowerCase();
        const searchValueUrl = searchUrl + searchValue;
        mainSection.textContent = '';
        getMovieData(searchValueUrl);

});

//trending

function getRating(vote){
  if(vote >= 7){
      return 'green';
  }else if(vote <= 5){
    return 'orange';
  }else{
    return 'red';
  };




};
