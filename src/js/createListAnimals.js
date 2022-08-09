import {refs} from './refs';

function createOneAnimal (animal) { 
    return `<div class="photo-card">
    <img src="${animal.webformatURL}" alt="${animal.tags}" title="" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes: ${animal.likes}</b></p>
      <p class="info-item">
        <b>Views: ${animal.views}</b></p>
      <p class="info-item">
        <b>Comments: ${animal.comments}</b></p>
      <p class="info-item">
        <b>Downloads: ${animal.downloads}</b></p>
    </div>
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