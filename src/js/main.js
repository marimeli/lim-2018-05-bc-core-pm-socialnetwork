/* Almacenando las variables para la selección de DOM */

//Logout
const logoutButton = document.getElementById('logout');

//Sección Profile
const profileContainer = document.getElementById('profile-container');
const userName = document.getElementById('userName');
const userImage = document.getElementById('user-image');
const alertBox = document.getElementById('alert-box');
//TIMELINE
const addBanner = document.getElementById('add-banner');
const postsContainer = document.getElementById('posts-container'); //contenedor que guardará todos los posts que se creen dinámicamente  */
const privateContainer = document.getElementById('private-container'); //contenedor de post privados
const publicContainer= document.getElementById('public-container'); //contenedor de post publicos


const postComposerContainer = document.getElementById('post-composer-container'); //contenedor de base de datos
const textComposerArea = document.getElementById('text-composer-area'); //área para hacer una publicación
const sendPostButton = document.getElementById('send-post'); //botón para publicar

const statusOfPrivacy = document.getElementById('status-of-privacy');
const feedButton = document.getElementById('feed-button');
const profileButton = document.getElementById('profile-button');


/* FUNCIONES */

const showFeed = () => {
  postComposerContainer.style.display = 'none';
  profileContainer.style.display = 'none';
  logoutButton.style.display = 'block';
  callModalRegister.style.display = 'none';
  callModalLogin.style.display = 'none';
  publicContainer.style.display = 'block';
  privateContainer.style.display = 'none'; 
};

const myProfile = () => {
  postComposerContainer.style.display = 'block';
    profileContainer.style.display = 'block'; //profileContainer
    publicContainer.style.display = 'none';
    privateContainer.style.display = 'block';   
};

//Cuando inicia sesión, se ejecuta la función que oculta contenedores y modales.
const hideContainers = () => {
  postComposerContainer.style.display = 'block';
  profileContainer.style.display = 'block';
  logoutButton.style.display = 'block';
  callModalRegister.style.display = 'none';
  callModalLogin.style.display = 'none';
  postsContainer.style.display = 'block';
  feedButton.style.display = 'block';
  profileButton.style.display = 'block';
  alertBox.style.display = 'none';
  addBanner.style.display = 'none';
};

//Cuando cierra sesión, se ejecuta la función que muestra contenedores.
const showContainers = () => {
  postComposerContainer.style.display = 'none';
  profileContainer.style.display = 'none';
  logoutButton.style.display = 'none';
  callModalRegister.style.display = 'block';
  callModalLogin.style.display = 'block';
  postsContainer.style.display = 'block';
  feedButton.style.display = 'none';
  profileButton.style.display = 'none';  
};


// Accordion
const myFunction = (id) => {
  var x = document.getElementById(id);
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
  var logged = document.getElementById("logged-in");
  if (logged.className.indexOf("w3-show") == -1) {
    logged.className += " w3-show";
  } else {
    logged.className = logged.className.replace(" w3-show", "");
  }
};

/* EVENTOS DEL DOM */

logoutButton.addEventListener('click', logoutWithFirebase);

sendPostButton.addEventListener('click', writtingPost);



feedButton.addEventListener('click', showFeed);
profileButton.addEventListener('click', myProfile);




