import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

import {refs} from './js/refs';
// import {fetchPictures} from './js/fetchPictures';
import {insertCreatedAnimals} from './js/createListAnimals';

export let currentPage = 1;

refs.formEl.addEventListener('submit', onSubmitForm);
refs.btnLoadMoreEl.addEventListener('click', onSubmitForm);

function onSubmitForm (event) {
    event.preventDefault();
    const animal = refs.inputEl.value;
    checkEvent(event);
    fetchPictures(animal)
    .then((data) => {
        refs.totalHitsEl.innerHTML = `Hooray! We found totalHits ${data.total} images.`
        console.log(data);
        filterAnimals(data);
    })
    .catch(error => console.log(error))
}
function checkEvent (event, data) {
    if (event.type === 'submit') {
        clearSearchResults();
       return currentPage = 1;
    
    } currentPage +=1;
}
function filterAnimals(animals) {
    if (animals.total === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else { 
        insertCreatedAnimals(animals.hits);
    }
}
function clearSearchResults () {
    refs.galleryEl.innerHTML = "";
}
const BASE_URL = 'https://pixabay.com/api/';
const myAPIkey = '29146874-e25e04f0bbd5e8c4fffc4a4f6';

const fetchPictures = animal => {
    return fetch(`${BASE_URL}?key=${myAPIkey}&q=${animal}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`)
    .then((response) => {
        return response.json();
    })   
}


// new SimpleLightbox('.gallery__item', { captionSelector: 'img', captions: true, captionsData: 'alt', overlayOpacity: 0.5, navText: 	['←','→'], captionPosition: 'bottom', captionDelay: 250 });