import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

import {refs} from './js/refs';
import {fetchPictures} from './js/fetchPictures';
import {insertCreatedAnimals} from './js/createListAnimals';
import {hidenBtnLoadMore} from './js/btnLoadMore';
import {clearSearchResults} from './js/clearGalleryList';
export let currentPage = 1;

refs.btnLoadMoreEl.classList.add("hide");

async function onSubmitForm (event) {
    event.preventDefault();
    const animal = refs.inputEl.value;
    checkEvent(event);
    try {
        const fetchResult = await fetchPictures(animal);
        const data = fetchResult.hits;
        refs.totalHitsEl.innerHTML = `Hooray! We found totalHits ${data.total} images.`;
        console.log(data);
        filterAnimals(data);
        hidenBtnLoadMore(data);
    } catch (error) {console.log(error)}
}

function checkEvent (event) {
    if (event.type === 'submit') {
        clearSearchResults();
        return currentPage = 1;  
    } currentPage +=1;
}
function filterAnimals(animals) {
    if (animals.length === 0) {
        refs.btnLoadMoreEl.classList.add("hide");
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else { 
        insertCreatedAnimals(animals);
        refs.btnLoadMoreEl.classList.remove("hide");
    }
}

refs.formEl.addEventListener('submit', onSubmitForm);
refs.btnLoadMoreEl.addEventListener('click', onSubmitForm);

// const lightbox = new SimpleLightbox('.gallery__item', { captionSelector: 'img', nav: true, captions: true, captionType: 'alt', captionsData: 'alt', overlayOpacity: 0.5, navText: 	['←','→'], captionPosition: 'bottom', captionDelay: 250 });
