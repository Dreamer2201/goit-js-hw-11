import {refs} from './refs';

function createOneAnimal (animal) { 
    return `<div class="photo-card">
    <a class="gallery__item" href="${animal.largeImageURL}">
    <div class="img-thumb">
    <img src="${animal.webformatURL}" alt="${animal.tags}" title="Beautiful Image" loading="lazy"/></img></div>
    <div class="info">
      <p class="info-item">
        <b>Likes: <br> ${animal.likes}</b></p>
      <p class="info-item">
        <b>Views: <br> ${animal.views}</b></p>
      <p class="info-item">
        <b>Comments: <br> ${animal.comments}</b></p>
      <p class="info-item">
        <b>Downloads: <br> ${animal.downloads}</b></p>
    </div></a>
    </div>`
}
function createListAnimals (array) {
    return array.reduce((acc, animal) => acc + createOneAnimal(animal), "");
}
function insertCreatedAnimals (array) {
    const result = createListAnimals(array);
    refs.galleryEl.insertAdjacentHTML('beforeend', result);
}

export {createOneAnimal, createListAnimals, insertCreatedAnimals};