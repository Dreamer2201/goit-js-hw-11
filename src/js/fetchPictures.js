
const BASE_URL = 'https://pixabay.com/api/';
const myAPIkey = '29146874-e25e04f0bbd5e8c4fffc4a4f6';

export const fetchPictures = animal => {
    return fetch(`${BASE_URL}?key=${myAPIkey}&q=${animal}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then((response) => {
        return response.json();
    })     
}
