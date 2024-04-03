const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43195893-e6aecd5c5261fd0c345764808';

export function getData(q) {
  const params = new URLSearchParams({
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q,
  });
  return fetch(BASE_URL + '?' + params).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status);
  });
}
