import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import { getData } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

const formEl = document.querySelector('.form');
const galleryEl = document.querySelector('.gallery');
let preloader = document.querySelector('.preloader');

window.addEventListener('load', () => {
  preloader.classList.add('hide');
  setTimeout(() => {
    preloader.remove();
  }, 600);
});

formEl.addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  console.log(data);
  if (data.message === '') {
    return;
  }
  getData(data.message)
    .then(response => {
      if (response.hits.length === 0) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      const markup = createMarkup(response.hits);
      console.log(markup);
      addMarkup(markup);
      lightbox.refresh();
    })
    .catch(err => {
      iziToast.error({
        message: 'Error!!!',
      });
    });
});

function addMarkup(markup) {
  galleryEl.innerHTML = markup;
}
