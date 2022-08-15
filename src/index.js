import {Notify} from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchPictures from './js/fetchPictures';
import refs from './js/refs';
import insertCreatedAnimals from './js/createListAnimals';
import smoothScrollToBottomPage from './js/smoothScrollToButtomPage';

export let currentPage = 1;
refs.btnLoadMoreEl.classList.add("hide");
const lightbox = new SimpleLightbox('.gallery a', { captions: true, captionSelector: 'img', captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250 });

refs.formEl.addEventListener('submit', onSubmitForm);
refs.btnLoadMoreEl.addEventListener('click', onClickBtnLodeMore);

function onSubmitForm (event) {
    event.preventDefault();
    refs.btnLoadMoreEl.classList.add("hide");
    const animal = refs.inputEl.value;
    clearGalleryList();
    currentPage = 1;
    convertFetchResults(animal); 
}
function onClickBtnLodeMore (event) {
    currentPage += 1;
    const animal = refs.inputEl.value;
    convertFetchResults(animal); 
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
        refs.btnLoadMoreEl.classList.add("hide");
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

