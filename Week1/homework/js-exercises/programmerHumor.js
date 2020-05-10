'use strict';

// to launch this js file you just need to define into your html file.

const scriptAxios = document.createElement('script');
scriptAxios.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
document.body.prepend(scriptAxios);
const imageTwo = document.createElement('img');
imageTwo.style.width = '30%';
document.body.prepend(imageTwo);
const image = document.createElement('img');
image.style.width = '30%';
document.body.prepend(image);
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

xmlRequest();

const axiosRequest = () => {
  axios.get(url)
    .then(response => imageTwo.src = response.data.img)
    .catch(error => console.log(error.message))
}

axiosRequest();