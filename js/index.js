'use strict';
const searchForm = document.getElementById('search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

const apiSearch = (event) => {
    event.preventDefault();
    const searchText = searchForm.querySelector('.form-control').value;
    if (searchText.trim().length === 0) {
        movie.innerHTML = '<h2 class="col-12 text-center text-danger"> Поле поиска не должно быть пустым </h2>';
        return;
    }
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=c3991bfbbb2efbee7ac90c72b9afa233&language=ru&query=' + searchText;

    movie.innerHTML = '<div class="spinner"></div>';
    fetch(server)
        .then(resultOne => {
            if(resultOne.status !== 200) {
                return Promise.reject(resultOne);
            }
            return resultOne.json();
        })
        .then(resultTwo => {
            let inner = '';
            if (resultTwo.results.length === 0) {
                inner = '<h2 class="col-12 text-center text-info"> Ничего не найдено </h2>';
            }
            resultTwo.results.forEach(item => {
                let nameItem = item.name || item.title;
                const poster = item.poster_path ? urlPoster + item.poster_path : './img/noPoster.png';
                let dataInfo = '';
                if (item.media_type !== 'person') dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
                inner += `
                    <div class="col-12 col-md-6 col-xl-3 item">
                        <img src="${poster}" class="img-poster" alt="${nameItem}" ${dataInfo}/>
                        <h5>${nameItem}</h5>
                    </div>
                    
                `;
            });
            movie.innerHTML = inner;

            addEventMedia();
        })
        .catch(error => {
            movie.innerHTML = 'Упс, что-то пошло не так';
            console.log('Ошибка: ' + error.status);
        });
};

searchForm.addEventListener('submit', apiSearch);

const addEventMedia = function() {
    const media = movie.querySelectorAll('.item>img[data-id]');
    media.forEach(elem => {
        elem.style.cursor = 'pointer';
        elem.addEventListener('click', show);
    });
}

const getVideo = function(type, id) {
    let youtube = movie.querySelector('.youtube');

    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=c3991bfbbb2efbee7ac90c72b9afa233&language=ru`)
        .then(resultOne => {
            if(resultOne.status !== 200) {
                return Promise.reject(resultOne);
            }
            return resultOne.json();
        })
        .then(resultTwo => {
            let videoFrame = '<h5 class="col-12 text-info"> Видео </h5>';
            if (resultTwo.results.length === 0) {
                videoFrame = '<p> К сожалению видео отсутствуют </p>';
                youtube.innerHTML = videoFrame;
                return ;
            }
            // resultTwo.results.forEach(item => {
            //     videoFrame += `<iframe width="560" height="315" src="https://www.youtube.com/embed/${item.key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            // });
            videoFrame += `<iframe width="560" height="315" src="https://www.youtube.com/embed/${resultTwo.results[0].key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            youtube.innerHTML = videoFrame;
        })
        .catch(error => {
            youtube.innerHTML = 'Видео не найдено';
            console.log('Ошибка: ' + error.status);
        });
}

const show = function() {
    let url = '';
    if (this.dataset.type === 'movie') {
        url = `https://api.themoviedb.org/3/movie/${this.dataset.id}?api_key=c3991bfbbb2efbee7ac90c72b9afa233&language=ru`;
    } else if (this.dataset.type === 'tv') {
        url = `https://api.themoviedb.org/3/tv/${this.dataset.id}?api_key=c3991bfbbb2efbee7ac90c72b9afa233&language=ru`;
    } else {
        movie.innerHTML = '<h2 class="col-12 text-center text-danger"> Произошла ошибка </h2>';
        return;
    }

    fetch(url)
        .then(resultOne => {
            if(resultOne.status !== 200) {
                return Promise.reject(resultOne);
            }
            return resultOne.json();
        })
        .then(resultTwo => {
            const poster = resultTwo.poster_path ? urlPoster + resultTwo.poster_path : './img/noPoster.png';
            movie.innerHTML = `
                <h4 class="col-12 text-center text-info">${resultTwo.name || resultTwo.title}</h4>
                <div class="col-4">
                    <img src="${ poster }"/>
                    ${resultTwo.homepage ? `<p> <a href="${resultTwo.homepage}" target="_blank"> Официальная страница </a> </p>` : ''}
                    ${resultTwo.imdb_id ? `<p> <a href="https://imdb.com/title/${resultTwo.imdb_id}" target="_blank"> Страница на IMDB </a> </p>` : ''}
                </div>
                <div class="col-8">
                    <p > Рейтинг: ${resultTwo.vote_average}</p>
                    <p > Статус: ${resultTwo.status}</p>
                    <p > Премьера: ${resultTwo.first_air_date || resultTwo.release_date}</p>
                    
                    ${resultTwo.last_episode_to_air ? `<p>${resultTwo.number_of_seasons} сезон ${resultTwo.last_episode_to_air.episode_number} серий</p>` : '' }
                    <p> Описание: ${resultTwo.overview}</p>
                    
                    <br/>
                    <div class="youtube"></div>
                </div>
            `;
            getVideo(this.dataset.type, this.dataset.id);
        })
        .catch(error => {
            movie.innerHTML = 'Упс, что-то пошло не так';
            console.log('Ошибка: ' + error.status);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.themoviedb.org/3/trending/all/week?api_key=c3991bfbbb2efbee7ac90c72b9afa233&language=ru')
        .then(resultOne => {
            if(resultOne.status !== 200) {
                return Promise.reject(resultOne);
            }
            return resultOne.json();
        })
        .then(resultTwo => {
            let inner = '<h4 class="col-12 text-center text-info"> Популярное за неделю </h4>';
            if (resultTwo.results.length === 0) {
                inner = '<h2 class="col-12 text-center text-info"> Ничего не найдено </h2>';
            }
            resultTwo.results.forEach(item => {
                let nameItem = item.name || item.title;
                let mediaType = item.title ? 'movie' : 'tv';
                const poster = item.poster_path ? urlPoster + item.poster_path : './img/noPoster.png';
                let dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;

                inner += `
                    <div class="col-12 col-md-6 col-xl-3 item">
                        <img src="${poster}" class="img-poster" alt="${nameItem}" ${dataInfo}/>
                        <h5>${nameItem}</h5>
                    </div>
                    
                `;
            });
            movie.innerHTML = inner;

            addEventMedia();
        })
        .catch(error => {
            movie.innerHTML = 'Упс, что-то пошло не так';
            console.log('Ошибка: ' + error.status);
        });
});