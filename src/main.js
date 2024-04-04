import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import { getData } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';

import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const lightbox = new SimpleLightbox('.gallery a', {});

let page = 1;
let message = '';
const per_page = 15;

const formEl = document.querySelector('.form');
const galleryEl = document.querySelector('.gallery');
let preloader = document.querySelector('.preloader');
let btnEl = document.querySelector('.btn');

formEl.addEventListener('submit', async event => {
  try {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    message = data.message;
    if (message === '') {
      return;
    }
    page = 1;
    preloader.classList.add('show');
    btnEl.classList.remove('show');

    const { totalHits, hits } = await getData(message, page, per_page);

    if (hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    if (totalHits > per_page) {
      btnEl.classList.add('show');
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const markup = createMarkup(hits);

    addMarkup(markup);
    lightbox.refresh();
    scrollPage();
  } catch (error) {
    iziToast.error({
      message: 'Error!!! ' + error.message,
    });
  } finally {
    preloader.classList.remove('show');
  }
});

btnEl.addEventListener('click', async () => {
  try {
    page += 1;
    const { totalHits, hits } = await getData(message, page, per_page);
    const markup = createMarkup(hits);

    if (page * hits.length >= totalHits) {
      btnEl.classList.remove('show');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    updateMarkup(markup);
    lightbox.refresh();
    scrollPage();
  } catch (error) {
    iziToast.error({
      message: 'Error!!! ' + error.message,
    });
  } finally {
    preloader.classList.remove('show');
  }
});

function addMarkup(markup) {
  galleryEl.innerHTML = markup;
}

function updateMarkup(markup) {
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function scrollPage() {
  let { height } = galleryEl.children[0].getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
