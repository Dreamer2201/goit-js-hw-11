import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {insertCreatedAnimals} from './createListAnimals';
import { refs } from "./refs";
import {lightbox} from '../index';
import {smoothScrollToBottomPage} from '../js/smoothScroll';

export function filterAnimals(data) {
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