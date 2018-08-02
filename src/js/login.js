//ELEMENTOS DEL DOM
//Espacios login
const email = document.getElementById('email');
const password = document.getElementById('password');
const nameForRegister = document.getElementById('name-register');
const emailRegister = document.getElementById('email-register');
const passwordRegister = document.getElementById('password-register');
//Botones de login
const createUser = document.getElementById('create-user');
const registerButton = document.getElementById('register-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout');
const backButton = document.getElementById('back-button');
//Secciòn LoggedIn y LoggedOut
const secLoggedIn = document.getElementById('logged-in');
const secLoggedOut = document.getElementById('logged-out');
const secRegisterForm = document.getElementById('sec-register');

//Logueo con redes
const facebookButton = document.getElementById('facebook-button');
const googleButton = document.getElementById('google-button')
//Usuario Facebook Gmail
let username = document.getElementById('user-name');
let userPhoto = document.getElementById('user-image');
//Errores registro y logueo
let adviceEmailRegister = document.getElementById('advice-emailRegister');
let errorEmail = document.getElementById('error-email');
let errorPassword = document.getElementById('error-password');

//DATABASE
const gifArea = document.getElementById('gif-area');
const sendGifButton = document.getElementById('send-gif');
const photoSelector = document.getElementById('photo-selector');
const sendPhotoButton = document.getElementById('send-photo');
const secGifContainer = document.getElementById('gif-container');
const secInput = document.getElementById('sec-input');

//******************FUNCIONES******************

window.onload = () => {
  //Listener en tiempo real EL CHISMOSO
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {//Si está logeado mostramos la opcion de logout y nombre de usuario
      //También podemos traer los sections directamente pero por orden mejor lo declaramos arriba
      secLoggedIn.style.display = 'block';
      userPhoto.style.display = 'block';
      secGifContainer.style.display = 'block';
      secLoggedOut.style.display = 'none';
      secRegisterForm.style.display = 'none';
      secInput.style.display = 'block';
      //Imprimiendo nombre de usuario en el pàrrafo
      username.innerText = `Bienvenidx ${user.displayName}`;
      //Imprimiendo imagen de usuario usando dom y settAttribute       
      let userPhotoURL = user.photoURL
      userPhoto.setAttribute('src', userPhotoURL);

    } else {//Si NO está logueado, mostramos formulario(OPCION LOGGEDOUT)
      secLoggedIn.style.display = 'none';
      userPhoto.style.display = 'none';
      secGifContainer.style.display = 'none';
      secLoggedOut.style.display = 'block';
      secRegisterForm.style.display = 'none';
      secInput.style.display = 'none';
    }
    //Imprimimos datos que Firebase tiene del usuario
    console.log('user > ' + JSON.stringify(user));
  });

  //DATABASE
  firebase.database().ref('gifs/-LITKiEKXpCMWfZq_Trl/postId')//Usamos ref para llegar a una ruta,id usuario etc
  
  .once('value')
    .then((gif) => {
      console.log('El GIF > ' + JSON.stringify(gif));
    })
    .catch((error) => {
      console.log('Database error > ' + error);
    });
    
  //Extraemos o consultamos datos una vez, como en DataDashboard
  //firebase.database().ref('gifs')es como un callback
  firebase.database().ref('gifs')//En la referencia podemos poner un escuchador para un contador
    .limitToLast(3) //Filtro de datos, donde limito sólo 2 gifs
    .once('value') //Para escuchar datos sólo una vez
    .then((gifs) => {
      console.log('LOS GIFTS > ' + JSON.stringify(gifs));
    })
    .catch((error) => {
      console.log('Database error > ' + JSON.stringify(error));
    });

  //Escuchador, se agrega cada que alguien agrega algo nuevo
  firebase.database().ref('gifs')//database de firebase, escucha la referencia gifs
    //Evento para escucha cada hijo que se agrega, cada regalo que se envìa.Permite escuchar cada que alguien agrega un nuevo gif
    .limitToLast(3)//Limitar mensajes 
    //↓↓newGif es funcion callBack
    .on('child_added', (newGif) => {//NewGif es un elemento completo en Firebase, para acceder a valores tiene que colocar .val(),sino jalará propiedad:valor
      // if(gifArea.value === ''){
      //   alert('Coloca algo antes de enviar');
      // }
      // else 
      secGifContainer.innerHTML += `
          <p>${newGif.val().creatorName}</p>
          <p>${newGif.val().gifURL}</p> 
          <button>Delete</button>
          <button>Erase</button>
      `;

    })
};


// //ESCRIBIR DB
const writeUserData = (userId, name, email, imageUrl) => {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  }).then(result => {
    console.log(result);

  })
    .catch(error => {
      console.log(error);
    });
};