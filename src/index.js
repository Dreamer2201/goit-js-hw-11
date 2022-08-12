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

refs.formEl.addEventListener('submit', onSubmitForm);
refs.btnLoadMoreEl.addEventListener('click', onSubmitForm);

function onSubmitForm (event) {
    event.preventDefault();
    const animal = refs.inputEl.value;
    checkEvent(event);
    convertFetchResults(animal);
    
}
async function convertFetchResults (animalName) {
    try {
        const fetchResult = await fetchPictures(animalName);
        const data = fetchResult.hits;
        console.log(fetchResult);
        console.log(data);
        // refs.totalHitsEl.innerHTML = `Hooray! We found ${data.length} images.`;
        // filterAnimals(data);
    } catch (error) {console.log(error)}
}
function checkEvent (event) {
    if (event.type === 'submit') {
        clearSearchResults();
        return currentPage = 1;  
    } currentPage +=1;
}
function filterAnimals(data) {
    if (data.length < 40) {
        console.log(data.length);
        hidenBtnLoadMore(data);
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    } else { 
        console.log(data.length);
        insertCreatedAnimals(data);
        refs.btnLoadMoreEl.classList.remove("hide");
        smoothScrollToBottomPage();
    }
}
function smoothScrollToBottomPage () {
    const galleryRect = refs.galleryEl.getBoundingClientRect();
    window.scrollBy({
        top: galleryRect.height,
        behavior: "smooth",
    })
}

// const lightbox = new SimpleLightbox('.gallery__item', { captionSelector: 'img', nav: true, captions: true, captionType: 'alt', captionsData: 'alt', overlayOpacity: 0.5, navText: 	['←','→'], captionPosition: 'bottom', captionDelay: 250 });
