/* Almacenando las variables para la selección de DOM */

//Logout
const logoutButton = document.getElementById('logout');

//Logout navbar
const logoutButtonNavbar = document.getElementById('navbar-logout');

//Sección Profile
const profileContainer = document.getElementById('profile-container');
const userName = document.getElementById('userName');
const userImage = document.getElementById('user-image');
const alertBox = document.getElementById('alert-box');
const accordion = document.getElementById('acordeon');

//TIMELINE
const addBanner = document.getElementById('add-banner');
const postsContainer = document.getElementById('posts-container'); //contenedor que guardará todos los posts que se creen dinámicamente  */
const privateContainer = document.getElementById('private-container'); //contenedor de post privados
const publicContainer = document.getElementById('public-container'); //contenedor de post publicos
const postComposerContainer = document.getElementById('post-composer-container'); //contenedor de base de datos
const textComposerArea = document.getElementById('text-composer-area'); //área para hacer una publicación
const sendPostButton = document.getElementById('send-post'); //botón para publicar
const statusOfPrivacy = document.getElementById('status-of-privacy');
const feedButton = document.getElementById('feed-button');
const profileButton = document.getElementById('profile-button');
const feedButtonNavbar = document.getElementById('feed-btn-navbar');
const profileButtonNavbar = document.getElementById('profile-btn-navbar');

//MOBILE
const hamburgerMenu = document.getElementById('hamburger-menu');

/* FUNCIONES */

const cleanTextarea = () => {
  textComposerArea.value = '';
};

const reloadPage = () => {
  window.location.reload();
};

const showFeed = () => {
  postComposerContainer.style.display = 'none';
  profileContainer.style.display = 'none';
  logoutButton.style.display = 'block';
  logoutButtonNavbar.style.display = 'block';
  callModalRegister.style.display = 'none';
  callModalRegisterNavbar.style.display = 'none';
  callModalLogin.style.display = 'none';
  callModalLoginNavbar.style.display = 'none';
  publicContainer.style.display = 'block';
  privateContainer.style.display = 'none';
  accordion.style.display = 'block';
};

const myProfile = () => {
  postComposerContainer.style.display = 'block';
  profileContainer.style.display = 'block'; 
  publicContainer.style.display = 'none';
  privateContainer.style.display = 'block';
  accordion.style.display = 'none';
};

//Cuando inicia sesión, se ejecuta la función que oculta contenedores y modales.
const hideContainers = () => {
  postComposerContainer.style.display = 'block';
  profileContainer.style.display = 'block';
  logoutButton.style.display = 'block';
  logoutButtonNavbar.style.display = 'block';
  callModalRegister.style.display = 'none';
  callModalRegisterNavbar.style.display = 'none';
  callModalLogin.style.display = 'none';
  callModalLoginNavbar.style.display = 'none';
  postsContainer.style.display = 'block';
  feedButton.style.display = 'block';
  profileButton.style.display = 'block';
  feedButtonNavbar.style.display = 'block';
  profileButtonNavbar.style.display = 'block'
  alertBox.style.display = 'none';
  addBanner.style.display = 'none';
};

//Cuando cierra sesión, se ejecuta la función que muestra contenedores.
const showContainers = () => {
  postComposerContainer.style.display = 'none';
  profileContainer.style.display = 'none';
  logoutButton.style.display = 'none';
  logoutButtonNavbar.style.display = 'none';
  callModalRegister.style.display = 'block';
  callModalRegisterNavbar.style.display = 'block';
  callModalLoginNavbar.style.display = 'block';
  callModalLogin.style.display = 'block';
  postsContainer.style.display = 'block';
  feedButton.style.display = 'none';
  feedButtonNavbar.style.display = 'none';
  profileButton.style.display = 'none';
  profileButtonNavbar.style.display = 'none';
};

const userInformation = (user) => {
        //Imprime nombre de usuario
        if (user.displayName === null) {
          userName.innerHTML = user.email;
        } else {
          userName.innerHTML = user.displayName;
        }
        //Imprime foto en perfil
        if (user.photoURL === null) {
          userImage.setAttribute('src', "https://png.icons8.com/ios/1600/user-male-circle-filled.png");
        } else {
          userImage.setAttribute('src', user.photoURL);
        }
};

// Accordion
const myFunction = (id) => {
  const x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme-d1";
  } else {
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className =
      x.previousElementSibling.className.replace(" w3-theme-d1", "");
  }
};

// Used to toggle the menu on smaller screens when clicking on the menu button
const openNav = () => {
  const logged = document.getElementById("logged-in");
  if (logged.className.indexOf("w3-show") == -1) {
    logged.className += " w3-show";
  } else {
    logged.className = logged.className.replace(" w3-show", "");
  }
};

/* EVENTOS DEL DOM */
logoutButton.addEventListener('click', logoutWithFirebase);
logoutButtonNavbar.addEventListener('click', logoutWithFirebase);
sendPostButton.addEventListener('click', writtingPost);
feedButton.addEventListener('click', showFeed);
feedButtonNavbar.addEventListener('click', showFeed);
profileButton.addEventListener('click', myProfile);
profileButtonNavbar.addEventListener('click', myProfile);