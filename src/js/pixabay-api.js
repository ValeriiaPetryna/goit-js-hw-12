import axios from 'axios';
const API_KEY = '43195893-e6aecd5c5261fd0c345764808';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export function getData(q, page, per_page) {
  const params = new URLSearchParams({
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page,
    page,
    q,
  });
  return axios.get('?' + params).then(response => response.data);
}
