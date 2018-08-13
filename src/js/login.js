//*********REGISTER***********
window.registerWithFirebase = () => {
  //Crea usuario con email y password
  firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRegister.value)
    .then(() => {
      console.log('usuario creado con éxito');
      alert('Su usuario fue creado con éxito')
    })
    .catch((error) => {
      callbackRegister(error);
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
      callbackLogin(error);
      console.log('Error Firebase > código > ' + error.code); 
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
    hideSections();
    reloadPage();
};
