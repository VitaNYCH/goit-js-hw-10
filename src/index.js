import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  country: document.querySelector('.country-list'),
  aboutCountry: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(onInputEnterCountry, DEBOUNCE_DELAY)
);

function onInputEnterCountry(evt) {
  evt.preventDefault();
    const insideInput = refs.input.value.trim();
    console.log(insideInput);
  if (insideInput.length <= 1) {
  return Notify.info(
    `Too many matches found. Please enter a more specific name.`
  );
  }
  API.fetchCountries(insideInput).then(renderCountriesSearch).catch(onFetchError);
}

function renderCountriesSearch(name) { 
  console.log(name);
  const markupList = creatListOfCountries(name);
  console.log(markupList);
  refs.country.innerHTML = markupList;
  const markupInfo = creatInfoOfCountry(name);
  refs.aboutCountry.innerHTML= markupInfo;
 
};

function onFetchError(error) {
   Notify.failure(`Oops, there is no country with that name`);
};


function creatListOfCountries(name) {
  return name.map(({ flags, name }) => {
    return `
        <li class="country-list__item">
        <img class="country-list__logo"src='${flags.svg}' alt ='${flags.alt}'></img>
        <p class="country-list__text">${name.official}</p>
        </li>`;
  }).join('');
};

function creatInfoOfCountry(name) {
   return name.map(({ capital, population, languages }) => {
    return `<ul class="country-info__list">
        <li class ="country-info__item"><span class="country-info__item-bold">Capital:</span>${capital}</li>
        <li class ="country-info__item"><span class="country-info__item-bold">Population:</span> ${population}</li>
        <li class ="country-info__item"><span class="country-info__item-bold">Language:</span> ${Object.values(languages).join(', ')}</li>
        </ul>`;
  }).join('');
};
