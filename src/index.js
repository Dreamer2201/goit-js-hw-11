import axios from 'axios';
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import {refs} from './js/refs';
import {insertCreatedAnimals} from './js/createListAnimals';
import {smoothScrollToBottomPage} from './js/smoothScroll';

const BASE_URL = 'https://pixabay.com/api/';
const myAPIkey = '29146874-e25e04f0bbd5e8c4fffc4a4f6';
export const perPages = 40;
let currentPage = 1;

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
        clearGalleryList();
        return currentPage = 1;  
    } currentPage +=1;  
}
const fetchPictures = async(animal) => {
    const response = await axios.get(`${BASE_URL}?key=${myAPIkey}&q=${animal}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPages}&page=${currentPage}`);
    return response.data; 
}
async function convertFetchResults (animalName) {
    try {
        const fetchResult = await fetchPictures(animalName);   
        const data = fetchResult.hits;
        refs.totalHitsEl.innerHTML = `Hooray! We found ${fetchResult.total} images.`;
        filterAnimals(data);
    } catch (error) {console.log(error)}
}
function filterAnimals(data) {
    if (data.length > 0 && data.length < 40) {
        insertCreatedAnimals(data);  
        refs.btnLoadMoreEl.classList.add("hide");
        Notify.info("We're sorry, but you've reached the end of search results.");
        smoothScrollToBottomPage();
        lightbox.refresh();
        return;
    } else if (data.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
    } else { 
        insertCreatedAnimals(data);  
        refs.btnLoadMoreEl.classList.remove("hide");
        smoothScrollToBottomPage();
        lightbox.refresh();
        return;
    }
}
function clearGalleryList () {
    refs.galleryEl.innerHTML = "";
}

