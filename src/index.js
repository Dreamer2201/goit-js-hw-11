import {refs} from './js/refs';
import {fetchPictures} from './js/fetchPictures';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


refs.inputEl.addEventListener('input', onInputChange);
// refs.btnSubmitEl.addEventListener('submit', onSubmitForm);

function onInputChange (e) {
    const animal = e.target.value;
    console.log(animal);
    fetchPictures(animal)
    .then(data => console.log(data))
    ;
}