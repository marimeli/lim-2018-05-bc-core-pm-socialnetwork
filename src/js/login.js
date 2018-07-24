//ELEMENTOS DEL DOM
//Espacios login
const email = document.getElementById('email');
const password = document.getElementById('password');
//Botones de login
const registerButton = document.getElementById('register-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout');
//Secciòn LoggedIn y LoggedOut
const secLoggedIn = document.getElementById('logged-in');
const secLoggedOut = document.getElementById('logged-out');
//Logueo con redes
const facebookButton = document.getElementById('facebook-button');
const googleButton = document.getElementById('google-button')
//Usuario Facebook Gmail
let username = document.getElementById('user-name');
let userPhoto = document.getElementById('user-image');
let errorEmail = document.getElementById('error-email');
let errorAdvice = document.getElementById('error-advice');

//******************FUNCIONES******************

window.onload = () => {
  //Listener en tempo real
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {//Si está logeado mostramos la opcion de logout y nombre de usuario
      //También podemos traer los sections directamente pero por orden mejor lo declaramos arriba
      secLoggedIn.style.display = 'block';
      userPhoto.style.display = 'block';
      secLoggedOut.style.display = 'none';
      
      //Imprimiendo nombre de usuario en el pàrrafo
      username.innerText = `Bienvenidx ${user.displayName}`;
      //Imprimiendo imagen de usuario usando dom y settAttribute       
      let userPhotoURL = user.photoURL
      userPhoto.setAttribute('src', userPhotoURL);

    } else {//Si NO está logueado, mostramos formulario(OPCION LOGGEDOUT)
      secLoggedIn.style.display = 'none';
      userPhoto.style.display = 'none';
      secLoggedOut.style.display = 'block';      
    }
    //Imprimimos datos que Firebase tiene del usuario
    console.log('user > ' + JSON.stringify(user));


  });
}

//*********REGISTRO***********
const registerWithFirebase = () => {
  const emailValue = email.value;
  const passwordValue = password.value;
  //Crea usuario con email y password
  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
      console.log('usuario creado con èxito');
    })
    .catch((error) => {
      console.log('Error Firebase > còdigo > ' + error.code); //Contraseña o correo no valido
      console.log('Error Firebase > Mensaje > ' + error.messaje); //
    })
}

registerButton.addEventListener('click', registerWithFirebase);

//*********LOGIN***********
const loginWithFirebase = () => {
  const emailValue = email.value;
  const passwordValue = password.value;

//*********Ingresa con email***********

  firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
      console.log('usuario inició sesión con éxito');
    })

    .catch((error) => {
      //Aquì podemos colocar mensaje de error en HTML
      if (error.code == 'auth/wrong-password') {
        errorAdvice.innerText = 'Su contraseña es incorrecta';
      }
      else if (error.code =='auth/user-not-found') {
        errorEmail.innerText = 'No existe un usuario con este correo';
      }
      console.log('Error Firebase > còdigo > ' + error.code); //Contraseña o correo no valido
      console.log('Error Firebase > Mensaje > ' + error.messaje); //
    });
}

loginButton.addEventListener('click', loginWithFirebase);

//*********LOGOUT***********
const logoutWithFirebase = () => {
  firebase.auth().signOut()
    .then(() => {
      console.log('Usuario finalizó su sesión');
    })
    .catch((error) => {
      console.log('Error Firebase > código > ' + error.code); //Contraseña o correo no valido
      console.log('Error Firebase > Mensaje > ' + error.messaje); //
    });
}

logoutButton.addEventListener('click', logoutWithFirebase);


//*********LOGIN FACEBOOK***********

const facebookLoginWithFirebase = () => {
  const provider = new firebase.auth.FacebookAuthProvider(); //Nuevo objeto con el proveedor
  provider.setCustomParameters({ //Crea un login con facebook y enlace un popup
    'display': 'popup'
  });

  firebase.auth().signInWithPopup(provider)
    .then(() => {
      console.log('Login con Facebook exitoso');

    })
    .catch((error) => {
      console.log('Error Firebase > código > ' + error.code); //Contraseña o correo no valido
      console.log('Error Firebase > Mensaje > ' + error.messaje); //
    });
}

facebookButton.addEventListener('click', facebookLoginWithFirebase);

//*********LOGIN GOOGLE***********

const googleLoginWithFirebase = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then(function (result) {
    console.log('Sesión con Google')
  })
  .catch((error) => {
    console.log(error.code);
    console.log(error.message);;
    console.log(error.email);
    console.log(error.credential);
  });
}

googleButton.addEventListener('click', googleLoginWithFirebase);