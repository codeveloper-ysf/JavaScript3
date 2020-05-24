'use strict';

const newFriend = document.querySelector('div');
const axiosButton = document.querySelector('#axiosButton');
const xmlButton = document.querySelector('#xmlButton');
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