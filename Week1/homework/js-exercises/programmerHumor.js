'use strict';

const image = document.querySelector('#imageXML');
const imageTwo = document.querySelector('#imageAxios');
const url = "https://xkcd.now.sh/?comic=latest";

const xmlRequest = () => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('GET', url);
  xhr.onload = () => {
    if (xhr.status === 200) {
      image.src = xhr.response.img;
    }
    else {
      console.log('Something went wrong! ', xhr.status)
    }
  }
  xhr.send();
}

xmlRequest(url);

const axiosRequest = () => {
  axios.get(url)
    .then(response => imageTwo.src = response.data.img)
    .catch(error => console.log(error.message))
}

axiosRequest(url);
