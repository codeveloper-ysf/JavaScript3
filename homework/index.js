'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'Repository' || key === 'Description' || key === 'Forks' || key === 'Updated') {
        elem.innerHTML += `<strong>${key}:</strong> ${value} <br>`;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }
  function renderRepoDetails(repo, ul) {
    createAndAppend('li', ul, { Repository: repo.name, Description: repo.description, Forks: repo.forks, Updated: repo.updated_at });
  }

  function main(url) {
    const heading = document.createElement('h1');
    heading.innerText = 'HYF Repositories';
    document.body.prepend(heading);
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      const ul = createAndAppend('ul', root);
      repos.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
      // repos.slice(0, 10);
      repos.forEach(repo => renderRepoDetails(repo, ul));
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
