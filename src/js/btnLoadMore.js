import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { currentPage } from "../index";
import { perPages } from "./fetchPictures";
import { refs } from "./refs";

export function hidenBtnLoadMore(data) {
    if (currentPage === Math.ceil(data.total / perPages)) {
        refs.btnLoadMoreEl.classList.add("hide");
        Notify.info(`Hooray! We found ${data.totalHits} images.`);
    }
}