//*********REGISTRO***********
window.registerWithFirebase = () => {
  //Crea usuario con email y password
  firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRegister.value)
    .then(() => {
      console.log('usuario creado con éxito');
      alert('Su usuario fue creado con éxito')
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
      console.log('Error Firebase > código > ' + error.code);
      console.log('Error Firebase > Mensaje > ' + error.messaje);
    });
};

//*********LOGIN EMAIL***********
window.loginWithFirebase = () => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((result) => {
      console.log('usuario inició sesiòn con éxito');
      console.log(result);

      const user = result.user;
      writeUserData(user.uid, user.displayName, user.email, user.photoURL);
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
      console.log('Error Firebase > Mensaje > ' + error.message);
    });
};


//LOGIN CON FACEBOOK
window.facebookLoginWithFirebase = () => {
  const provider = new firebase.auth.FacebookAuthProvider(); //Nuevo objeto con el proveedor
  provider.setCustomParameters({ //Crea un login con facebook y enlace un popup
    'display': 'popup'
  });

  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log('Login con Facebook exitoso');
      console.log(result);
      const user = result.user;
      writeUserData(user.uid, user.displayName, user.email, user.photoURL);
    })
    .catch((error) => {
      console.log('Error Firebase > código > ' + error.code);
      console.log('Error Firebase > Mensaje > ' + error.messaje);
    });
};

//*********LOGIN GOOGLE***********
window.googleLoginWithFirebase = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log('Sesión con Google')
      console.log(result);
      const user = result.user;
      writeUserData(user.uid, user.displayName, user.email, user.photoURL);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);;
      console.log(error.email);
      console.log(error.credential);
    });
};

//*********LOGOUT***********
window.logoutWithFirebase = () => {
  firebase.auth().signOut()
    .then(() => {
      console.log('Usuario finalizó su sesión');
    })
    .catch((error) => {
      console.log('Error Firebase > código > ' + error.code);
      console.log('Error Firebase > Mensaje > ' + error.message);
    });
  publicContainer.style.display = 'none';
  privateContainer.style.display = 'none';
  addBanner.style.display = 'block';
};