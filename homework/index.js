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
        elem.innerHTML += `<strong>${key}:</strong> ${value} <br> `;
      }
      else if (key === 'foto') {
        elem.innerHTML += `<img src="${value}"></img>`
      }
      else if (key === 'name') {
        elem.innerHTML += `<span>${value}</span>`
      }
      else if (key === 'count') {
        elem.innerHTML += `<span>${value}</span>`
      }
      else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function main(url) {
    const header = document.createElement('header');
    const heading = document.createElement('h1');
    heading.innerText = 'HYF Repositories';
    header.prepend(heading);
    const selectBox = document.createElement('select');
    var firstOption = document.createElement("option");
    firstOption.setAttribute("value", 0);
    var firstOptionContent = document.createTextNode('Choose a Repository...');
    firstOption.appendChild(firstOptionContent);
    selectBox.appendChild(firstOption);
    header.appendChild(selectBox);
    document.body.prepend(header);
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      const repoDetails = createAndAppend('ul', root);
      const repoContributions = createAndAppend('ul', root);
      repos.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
      repos.forEach(repo => {
        const repoOptions = document.createElement("option");
        repoOptions.setAttribute("value", repo.id);
        const repoOptionsContent = document.createTextNode(repo.name);
        repoOptions.appendChild(repoOptionsContent);
        selectBox.appendChild(repoOptions);
      });
      if (selectBox.value === '0') {
        repoDetails.textContent = '';
      }
      selectBox.addEventListener('change', () => {
        repoDetails.textContent = '';
        repoContributions.textContent = '';
        const selectedRepo = selectBox.options[selectBox.selectedIndex].value;
        const filteredRepo = repos.filter(a => a.id == selectedRepo);
        createAndAppend('li', repoDetails, { Repository: filteredRepo[0].name, Description: filteredRepo[0].description, Forks: filteredRepo[0].forks, Updated: filteredRepo[0].updated_at })
        fetchJSON(filteredRepo[0].contributors_url, (err, reposContributors) => {
          if (err) {
            createAndAppend('div', root, {
              text: err.message,
              class: 'alert-error',
            });
            return;
          }
          reposContributors.forEach(contributors => {
            createAndAppend('li', repoContributions, { foto: contributors.avatar_url, name: contributors.login, count: contributors.contributions })
          });
        });
      });
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  window.onload = () => main(HYF_REPOS_URL);
}
