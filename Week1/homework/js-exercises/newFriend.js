'use strict';

// to launch this js file you just need to define into your html file.

const scriptAxios = document.createElement('script');
scriptAxios.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
document.body.prepend(scriptAxios);
const newFriend = document.createElement('div');
newFriend.style.width = '33%';
document.body.prepend(newFriend);
const axiosButton = document.createElement('button');
axiosButton.innerText = 'Get AxiosRequest';
document.body.prepend(axiosButton);
const xmlButton = document.createElement('button');
xmlButton.innerText = 'Get XMLHttpRequest';
document.body.prepend(xmlButton);
const url = "https://www.randomuser.me/api";


const friendFinder = (friend) => {
  newFriend.innerHTML = `<ul>
      <li>Gender: ${friend.results[0].gender}</li>
      <li>Full Name: ${friend.results[0].name.first} ${friend.results[0].name.last}</li>
      <li>Age: ${friend.results[0].dob.age}</li>
      <li>Country: ${friend.results[0].location.country}</li>
    </ul>
    <img src="${friend.results[0].picture.large}">`
}

xmlButton.addEventListener('click', () => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json'
  xhr.open('GET', url);
  xhr.onload = () => {
    if (xhr.status === 200) {
      friendFinder(xhr.response);
    }
    else {
      console.log('Something went wrong! ', xhr.status)
    }
  }
  xhr.send();
})

axiosButton.addEventListener('click', () => {
  axios.get(url)
    .then(response => friendFinder(response.data))
    .catch(error => console.log(error.message))
})