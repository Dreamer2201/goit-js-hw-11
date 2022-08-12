import {refs} from './refs';

function createOneAnimal (picture) { 
    return `<a class="img-link" href="${picture.largeImageURL} ">
    <div class="photo-card">
    <div class="img-thumb">
    <img src="${picture.webformatURL}" alt="${picture.tags}" title="${picture.tags}" loading="lazy"/></div>
    <div class="info">
      <p class="info-item">
        <b>Likes: <br> ${picture.likes}</b></p>
      <p class="info-item">
        <b>Views: <br> ${picture.views}</b></p>
      <p class="info-item">
        <b>Comments: <br> ${picture.comments}</b></p>
      <p class="info-item">
        <b>Downloads: <br> ${picture.downloads}</b></p>
    </div>
    </div></a>`
}
function createListAnimals (array) {
    return array.reduce((acc, animal) => acc + createOneAnimal(animal), "");
}
function insertCreatedAnimals (array) {
    const result = createListAnimals(array);
    refs.galleryEl.insertAdjacentHTML('beforeend', result);
}

export {createOneAnimal, createListAnimals, insertCreatedAnimals};