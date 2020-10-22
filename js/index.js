'use strict';
const searchForm = document.getElementById('search-form');
const movie = document.querySelector('#movies');

const apiSearch = (event) => {
    event.preventDefault();

    const searchText = searchForm.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=c3991bfbbb2efbee7ac90c72b9afa233&language=ru&query=' + searchText;

    requestApi('GET', server);
};

const requestApi = (method, url) => {
    const requare = new XMLHttpRequest();
    requare.open(method, url);
    requare.send();
    requare.addEventListener('readystatechange', () => {
        if (requare.readyState !== 4) return;

        if (requare.status !== 200) {
            console.log('Ошибка: ' + requare.status);
            return;
        }

        const output = JSON.parse(requare.responseText);
        let inner = '';

        output.results.forEach(item => {
            let nameItem = item.name || item.title;
            inner += `<div class="col-3">${nameItem}</div>`;
        });

        movie.innerHTML = inner;

        console.log(output);
    })
}

searchForm.addEventListener('submit', apiSearch);