import axios from 'axios';
import {currentPage} from '../index';

const BASE_URL = 'https://pixabay.com/api/';
const myAPIkey = '29146874-e25e04f0bbd5e8c4fffc4a4f6';
export const perPages = 40;

export const fetchPictures = async(animal) => {
    const response = await axios.get(`${BASE_URL}?key=${myAPIkey}&q=${animal}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPages}&page=${currentPage}`);
    return response.data; 
}
