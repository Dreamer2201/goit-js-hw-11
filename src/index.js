import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

import {refs} from './js/refs';
// import {fetchPictures} from './js/fetchPictures';
import {insertCreatedAnimals} from './js/createListAnimals';

export let currentPage = 1;

const BASE_URL = 'https://pixabay.com/api/';
const myAPIkey = '29146874-e25e04f0bbd5e8c4fffc4a4f6';
const perPages = 40;

refs.btnLoadMoreEl.classList.add("hide");

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
        hidenBtnLoadMore(data);
        
    })
    .catch(error => console.log(error))
}
function checkEvent (event) {
    if (event.type === 'submit') {
        clearSearchResults();
        refs.btnLoadMoreEl.classList.remove("hide");
       return currentPage = 1;  
    } currentPage +=1;  
}
function hidenBtnLoadMore(data) {
    if (currentPage === Math.ceil(data.total / perPages)) {
        refs.btnLoadMoreEl.classList.add("hide");
        Notify.info(`Hooray! We found ${data.totalHits} images.`);
    }
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

const fetchPictures = animal => {
    return fetch(`${BASE_URL}?key=${myAPIkey}&q=${animal}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPages}&page=${currentPage}`)
    .then((response) => {
        return response.json();
    })   
}

const lightbox = new SimpleLightbox('.gallery__item', { captionSelector: 'img', nav: true, captions: true, captionType: 'alt', captionsData: 'alt', overlayOpacity: 0.5, navText: 	['←','→'], captionPosition: 'bottom', captionDelay: 250 });
