'use strict';

{
  async function fetchJSON(url, cb) {
    try {
      const response = await axios.get(url)
      const data = response.data
      cb(null, data)
    } catch (error) {
      cb(error, null)
    }
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'Repository' || key === 'Description' || key === 'Forks' || key === 'Updated') {
        elem.innerHTML += `<strong>${key}:</strong> ${value} <br> `;
      }
      else if (key === 'avatar') {
        elem.innerHTML += `<img src="${value}"></img>`
      }
      else if (key === 'username' || key === 'count') {
        elem.innerHTML += `<span>${value}</span>`
      }
      else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function main(url) {
    const header = document.querySelector('header');
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
    const repoContainer = document.querySelector('.repo-container');
    const contributorsContainer = document.querySelector('.contributors-container');
    const repoDetails = createAndAppend('ul', repoContainer);
    const repoContributions = createAndAppend('ul', contributorsContainer);
    fetchJSON(url, (err, repos) => {
      const main = document.querySelector('.main-container');
      if (err) {
        createAndAppend('div', main, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
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
        const filteredRepo = repos.filter(repo => repo.id == selectedRepo);
        createAndAppend('li', repoDetails, { Repository: filteredRepo[0].name, Description: filteredRepo[0].description, Forks: filteredRepo[0].forks, Updated: filteredRepo[0].updated_at })
        fetchJSON(filteredRepo[0].contributors_url, (err, reposContributors) => {
          if (err) {
            createAndAppend('div', main, {
              text: err.message,
              class: 'alert-error',
            });
            return;
          }
          reposContributors.forEach(contributors => {
            createAndAppend('li', repoContributions, { avatar: contributors.avatar_url, username: contributors.login, count: contributors.contributions })
          });
        });
      });
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  window.onload = () => main(HYF_REPOS_URL);
}
