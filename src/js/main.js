/* Almacenando las variables para la selección de DOM */

//Logout
const logoutButton = document.getElementById('logout');

//Sección Profile
const profileContainer = document.getElementById('profile-container');
const userName = document.getElementById('userName');
const userImage = document.getElementById('user-image');
const alertBox = document.getElementById('alert-box');
const acordion = document.getElementById('acordeon');

//TIMELINE
const addBanner = document.getElementById('add-banner');

const sectionPosts = document.getElementById('section-posts');
const postsAreaContainer= document.getElementById('posts-area');


const postsContainer = document.getElementById('posts-container'); //contenedor que guardará todos los posts que se creen dinámicamente  */
const postComposerContainer = document.getElementById('post-composer-container'); //contenedor de base de datos
const textComposerArea = document.getElementById('text-composer-area'); //área para hacer una publicación
const sendPostButton = document.getElementById('send-post'); //botón para publicar

const privateWallContainer = document.getElementById('private-wall'); //contenedor de post privados
const myPersonalPosts = document.getElementById('personal-posts'); //titulo de la seccion privada
const publicWallContainer= document.getElementById('public-wall'); //contenedor de post publicos
const thePublicPosts= document.getElementById('public-posts'); //titulo de la seccion publica

const statusOfPrivacy = document.getElementById('status-of-privacy');
const feedButton = document.getElementById('feed-button');
const profileButton = document.getElementById('profile-button');



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

