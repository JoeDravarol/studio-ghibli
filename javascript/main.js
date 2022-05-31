const API_URL = "https://ghibliapi.herokuapp.com/films";

const createFilmComponent = data => {
  const posterJpg = data['movie_banner'].split('/').pop();
  const largeSizePoster = `https://image.tmdb.org/t/p/original/${posterJpg}`;

  const markup = `
    <article class="film">
      <img class="poster" src="${largeSizePoster}" alt="${data.title}'s poster">
      <div class="description">
        <h2>${data.title}</h2>
        <p>${data.description}</p>
      </div>
    </article>
  `

  return markup;
}

const renderFilm = film => {
  const container = document.querySelector('.film-container');

  container.insertAdjacentHTML('beforeend', createFilmComponent(film));
}

const removeAllFilms = () => {
  const container = document.querySelector('.film-container');
  container.innerHTML = '';
}

const initSelectOptions = (movies) => {
  const directorSelect = document.querySelector('select');
  const directorsName = new Set(...[movies.map(movie => movie.director)]);

  directorsName.forEach(director => {
    const option = new Option(director, director);
    directorSelect.add(option);
  })

  directorSelect.addEventListener('change', handleSelection)
}

const initFilmData = () => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      movies = data;
      initSelectOptions(movies);
    })
    .catch(err => {
      console.error(err);
    })
}

const handleSelection = ({ target }) => {
  const directorName = target.value;

  if (directorName !== 'disabled') {
    const filmByDirector = movies.filter(movie => movie.director === directorName);

    removeAllFilms()
    filmByDirector.forEach(renderFilm);
  }
}

let movies;

initFilmData()