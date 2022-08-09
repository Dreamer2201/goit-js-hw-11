import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

import {refs} from './js/refs';
import {fetchPictures} from './js/fetchPictures';
import {insertCreatedAnimals} from './js/createListAnimals';

refs.inputEl.addEventListener('input', onInputChange);
refs.formEl.addEventListener('submit', onSubmitForm);

function onInputChange (e) {
    return e.target.value;  
}
function onSubmitForm (event) {
    event.preventDefault();
    const animal = refs.inputEl.value;
    fetchPictures(animal)
    .then(data => 
        filterAnimals(data))
    .catch(error => console.log(error))
    ;
}
function filterAnimals(animals) {
    if (animals.total === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else { 
        insertCreatedAnimals(animals.hits);
        console.log(refs.galleryEl);
        console.log(animals);
    }
}
// new SimpleLightbox('.gallery__item', { captionSelector: 'img', captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250 });