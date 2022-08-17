import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const myAPIkey = '29146874-e25e04f0bbd5e8c4fffc4a4f6';
const perPages = 40;

const fetchPictures = async(searchQuery, page) => {
    const response = await axios.get(`${BASE_URL}?key=${myAPIkey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPages}&page=${page}`);
    return response.data; 
}
export default fetchPictures;
