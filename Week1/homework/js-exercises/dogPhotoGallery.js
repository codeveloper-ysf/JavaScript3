'use strict';

const xmlButton = document.querySelector('#xml');
const axiosButton = document.querySelector('#axios');
const photoList = document.querySelector('ul');
const url = "https://dog.ceo/api/breeds/image/random";

const dogPhotos = (dog) => {
  photoList.innerHTML += `<li style="width:10%;">
    <img src="${dog.message}">
    </li>
    `
}

xmlButton.addEventListener('click', () => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('GET', url);
  xhr.onload = () => {
    if (xhr.status === 200) {
      dogPhotos(xhr.response);
    }
    else {
      console.log('Something went wrong! ', xhr.status)
    }
  }
  xhr.send();
});

axiosButton.addEventListener('click', () => {
  axios.get(url)
    .then(response => dogPhotos(response.data))
    .catch(error => console.log(error.message))
});