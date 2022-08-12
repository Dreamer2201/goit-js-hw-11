import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import {refs} from './js/refs';
import {fetchPictures} from './js/fetchPictures';
import {filterAnimals} from './js/filterPictures';
import {clearSearchResults} from './js/clearGalleryList';

export let currentPage = 1;

refs.btnLoadMoreEl.classList.add("hide");

export const lightbox = new SimpleLightbox('.gallery a', { captions: true, captionSelector: 'img', captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250 });

refs.formEl.addEventListener('submit', onSubmitForm);
refs.btnLoadMoreEl.addEventListener('click', onSubmitForm);

function onSubmitForm (event) {
    event.preventDefault();
    const animal = refs.inputEl.value;
    checkEvent(event);
    convertFetchResults(animal);
}
function checkEvent (event) {
    if (event.type === 'submit') {
        clearSearchResults();
        return currentPage = 1;  
    } currentPage +=1;  
}
async function convertFetchResults (animalName) {
    try {
        const fetchResult = await fetchPictures(animalName);   
        const data = fetchResult.hits;
        refs.totalHitsEl.innerHTML = `Hooray! We found ${fetchResult.total} images.`;
        filterAnimals(data);
    } catch (error) {console.log(error)}
}
