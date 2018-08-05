//*********REGISTRO***********
window.registerWithFirebase = () => {
  //Crea usuario con email y password
  firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRegister.value)
    .then(() => {
      console.log('usuario creado con èxito');

    })
    .catch((error) => {
      //Corregir
      if (error.code === 'auth/email-already-in-use') {
        adviceEmailRegister.innerText = 'Ya existe un usuario con este correo. Por favor, ingrese otro';
      }
      //Comentario cuando falta el @ ok
      else if (error.code === 'auth/invalid-email') {
        adviceEmailRegister.innerText = 'Por favor, agregue un correo válido';
      }
      //Corregir
      else if (error.code === 'auth/weak-password') {
        advicePasswordRegister.innerText = 'Ingresa una contraseña con más de 6 caracteres';
      }
      console.log('Error Firebase > código > ' + error.code); //Contraseña o correo no valido
      console.log('Error Firebase > Mensaje > ' + error.messaje); //
    });
};

//*********WINDOWS ONLOAD***********

window.onload = () => {
  //Listener en tiempo real EL CHISMOSO
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {//Si está logeado mostramos la opcion de logout y nombre de usuario
      //También podemos traer los sections directamente pero por orden mejor lo declaramos arriba
      console.log('Usuario logueado');
      dontShowModalRegister();
      dontShowModal();
      postComposerContainer.style.display = 'block';
      profileContainer.style.display = 'block';
      logoutButton.style.display = 'block';
      callModalRegister.style.display = 'none';
      callModalLogin.style.display = 'none';

    } else {//Si NO está logueado, mostramos formulario(OPCION LOGGEDOUT)
      console.log('Usuario NO logueado');
      postComposerContainer.style.display = 'none';
      profileContainer.style.display = 'none';
      logoutButton.style.display = 'none';
      callModalRegister.style.display = 'block';
      callModalLogin.style.display = 'block';
    }
    //Imprimimos datos que Firebase tiene del usuario
    console.log('User > ' + JSON.stringify(user));
  });
};

//*********LOGIN***********
const loginWithFirebase = () => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
      console.log('usuario inició sesiòn con éxito');
    })
    .catch((error) => {
      if (error.code === 'auth/wrong-password') {
        errorPassword.innerText = 'Su contraseña es incorrecta';
      }
      else if (error.code === 'auth/invalid-email') {
        errorEmail.innerText = 'Por favor, agregue un correo válido';
      }
      else if (error.code === 'auth/user-not-found') {
        errorEmail.innerText = 'No existe un usuario con este correo. Por favor, regístrese';
      }
      console.log('Error Firebase > código > ' + error.code); //Contraseña o correo no valido
      console.log('Error Firebase > Mensaje > ' + error.message); //
    });
};

//LOGIN CON GOOGLE
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
};

//*********LOGIN GOOGLE***********
const googleLoginWithFirebase = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log('Sesión con Google')
      const user = result.user;
      // /* userData //aignar valores *
      // writeUserData(user.uid, user.displayName, user.email, user.photoURL)
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);;
      console.log(error.email);
      console.log(error.credential);
    });
};

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
};

