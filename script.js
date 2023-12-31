/** @format */

const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const getUser = async (username) => {
  try {
    const { data } = await axios(APIURL + username);

    createUserCard(data);
  } catch (error) {
    if (error.response.status == 404) {
      createErrorCard('Sorry, No profile with this username');
    }
  }
};

const createUserCard = (user) => {
  const cardHTML = `
  <div class="card">
        <div>
          <img
            src="${user.avatar_url}"
            alt="${user.name}"
            class="avatar" />
        </div>
        <div class="user-info">
          <h2>${user.login}</h2>
          <p>
            ${user.bio}
          </p>
          <ul>
            <li> ${user.followers} <strong> Followers </strong></li>
            <li> ${user.following} <strong> Followeing </strong></li>
            <li> ${user.public_repos} <strong> Repos </strong></li>
          </ul>
          <div id="repos">
            <a
              href="#"
              class="repo"
              >Repo 1</a
            >
            <a
              href="#"
              class="repo"
              >Repo 2</a
            >
            <a
              href="#"
              class="repo"
              >Repo 3</a
            >
          </div>
        </div>
    </div>

    `;
  main.innerHTML = cardHTML;
};

const createErrorCard = (message) => {
  const cardHTML = `
<div class="card">
    <h1>${message}</h1>
</div>
    
    `;
  main.innerHTML = cardHTML;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);

    search.value = '';
  }
});
