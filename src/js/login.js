//ELEMENTOS DEL DOM
//Espacios login
const email = document.getElementById('email');
const password = document.getElementById('password');
const nameForRegister = document.getElementById('name-register');
const emailRegister = document.getElementById('email-register');
const passwordRegister = document.getElementById('password-register');
//Botones de login
// const createUser = document.getElementById('create-user');
const registerButton = document.getElementById('register-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout');
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
let errorEmail = document.getElementById('error-email');
let errorAdvice = document.getElementById('error-advice');
//Espacio Post
const bd = document.getElementById('bd'); //contendor de base de datos
const posts = document.getElementById('posts'); //div que guardara todos los posts
const post = document.getElementById('post'); //espacio para hacer una publicacion
const btnSave = document.getElementById('btn-save');//boton para publicar
//******************FUNCIONES******************

window.onload = () => {
  //Listener en tiempo real EL CHISMOSO
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {//Si está logeado mostramos la opcion de logout y nombre de usuario
      //También podemos traer los sections directamente pero por orden mejor lo declaramos arriba
      secLoggedIn.style.display = 'block';
      userPhoto.style.display = 'block';
      bd.classList.remove('hidden');
      posts.classList.remove('hidden');
      secLoggedOut.style.display = 'none';
      // secRegisterForm.style.display = 'none';

      //Imprimiendo nombre de usuario en el pàrrafo
      username.innerText = `Bienvenidx ${user.displayName}`;
      //Imprimiendo imagen de usuario usando dom y settAttribute       
      let userPhotoURL = user.photoURL
      userPhoto.setAttribute('src', userPhotoURL);

    } else {//Si NO está logueado, mostramos formulario(OPCION LOGGEDOUT)
      secLoggedIn.style.display = 'none';
      userPhoto.style.display = 'none';
      secLoggedOut.style.display = 'block';
      // secRegisterForm.style.display = 'none';
    }
    //Imprimimos datos que Firebase tiene del usuario
    console.log('user > ' + JSON.stringify(user));
  });
}

//  Función para escribir dato de usuario en Firebase, cuando está logeado 
writeUserData = (userId, name, email, imageUrl) => {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  }).then(result => {
    console.log(result);
    
  })
  .catch(error => {
console.log(error);
  });
};



//*********REGISTRO***********
const registerWithFirebase = () => {
  //Crea usuario con email y password
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(() => {
      console.log('usuario creado con èxito');
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        errorEmail.innerText = 'Este correo ya fue registrado. Ingrese otro';
      }
      console.log('Error Firebase > còdigo > ' + error.code); //Contraseña o correo no valido
      console.log('Error Firebase > Mensaje > ' + error.messaje); //
    })
}

const showRegisterForm = () => {
  secLoggedIn.style.display = 'none';
  userPhoto.style.display = 'none';
  secLoggedOut.style.display = 'none';
  secRegisterForm.style.display = 'block';
}

// const showRegisterWithFirebase = (user) => {
//   if (user.emailVerified) {

//   }
//   //Caso contrario que me salga un alert
// };

// const verificationWithFirebase = () => {
//   const user = firebase.auth().currentUser;
//   user.sendEmailVerification()
//     .then(() => {
//       // Email sent.
//       console.log('Enviando correo...');
//     })
//     .catch((error) => {
//       // An error happened.
//       console.log(error);
//     });
// };

// createUser.addEventListener('click', showRegisterForm);
registerButton.addEventListener('click', registerWithFirebase);

//*********LOGIN***********
const loginWithFirebase = () => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
      console.log('usuario inició sesiòn con èxito');
    })

    .catch((error) => {
      //Aquì podemos colocar mensaje de error en HTML
      if (error.code === 'auth/wrong-password') {
        errorAdvice.innerText = 'Su contraseña es incorrecta';
      }
      else if (error.code === 'auth/user-not-found') {
        errorEmail.innerText = 'No existe un usuario con este correo';
      }
      console.log('Error Firebase > código > ' + error.code); //Contraseña o correo no valido
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
      console.log('Error Firebase > còdigo > ' + error.code); //Contraseña o correo no valido
      console.log('Error Firebase > Mensaje > ' + error.messaje); //
    });
}

facebookButton.addEventListener('click', facebookLoginWithFirebase);

//*********LOGIN GOOGLE***********

let userData = {}

const googleLoginWithFirebase = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(function (result) {
      console.log('Sesión con Google')
      const user = result.user;
      // /* userData //aignar valores *
      writeUserData(user.uid, user.displayName, user.email, user.photoURL) 
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);;
      console.log(error.email);
      console.log(error.credential);
    });
}

googleButton.addEventListener('click', googleLoginWithFirebase);

//Todo esto de abajo son documentos y colecciones
//Tareas Laboratoria
//Tarea: nombre, duración, tipo, dificultad //Colección hecha??
//Estudiantes: Quién hace la tarea
//Coach 
