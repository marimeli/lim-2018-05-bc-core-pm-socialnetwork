//*********REGISTRO***********
window.registerWithFirebase = () => {
  //Crea usuario con email y password
  firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRegister.value)
    .then(() => {
      console.log('usuario creado con èxito');
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
      console.log('Error Firebase > código > ' + error.code); //Contraseña o correo no valido
      console.log('Error Firebase > Mensaje > ' + error.messaje); //
    });
};

const hideContainers = () => {
  postComposerContainer.style.display = 'block';
  profileContainer.style.display = 'block';
  logoutButton.style.display = 'block';
  callModalRegister.style.display = 'none';
  callModalLogin.style.display = 'none';
};

const showContainers = () => {
  postComposerContainer.style.display = 'none';
  profileContainer.style.display = 'none';
  logoutButton.style.display = 'none';
  callModalRegister.style.display = 'block';
  callModalLogin.style.display = 'block';
};



//*********WINDOWS ONLOAD***********
window.callback = () => {
  firebase.database().ref('posts').once('value', (postsSnap) => {
    console.log(postsSnap);
    const posts1 = postsSnap.val()
    Object.keys(posts1).forEach(pid => {
      const postInfo = posts1[pid]
      const contPost = document.createElement('div')
      console.log(postInfo)
      contPost.innerHTML = postInfo.body
      postsContainer.appendChild(contPost)
   })
      /*  var contPost = document.createElement('div');
          var textPost = document.createElement('textarea')
          textPost.setAttribute("id", newPost);
          textPost.innerHTML = textComposerArea.value; 
          
  contPost.appendChild(textPost);
  postsContainer.appendChild(contPost);
  */
  });
};

window.onload = () => {
  //Listener en tiempo real EL CHISMOSO
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {//Si está logeado mostramos la opcion de logout y nombre de usuario

      //También podemos traer los sections directamente pero por orden mejor lo declaramos arriba
      console.log('Usuario logueado');
      //Ocultar botones que abren modales de registro y login
      dontShowModalRegister();
      dontShowModal();
      //Imprime nombre de usuario
      if (user.displayName == null) {
        userName.innerHTML = user.email;
      }
      else {
        userName.innerHTML = user.displayName;

      }
      //Imprime foto en perfil
      if (user.photoURL == null) {
        userImage.setAttribute('src', "/src/user.png");
      }
      else {
        userImage.setAttribute('src', user.photoURL);
      }
      //Muestra perfil y container para publicar
      hideContainers();

      /* CUANDO EL USUARIO ESTÉ LOGUEADO, LLAMO A LA FUNCION
      QUE TRAE LOS DATOS DE FIREBASE.*/
   callback();

    } else {//Si NO está logueado, mostramos formulario(OPCION LOGGEDOUT)
      console.log('Usuario NO logueado');
      showContainers();
    }
    //Imprimimos datos que Firebase tiene del usuario
    console.log('User > ' + JSON.stringify(user));
  });
};


//*********LOGIN EMAIL***********
const loginWithFirebase = () => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((result) => {
      console.log('usuario inició sesiòn con éxito');
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
      console.log('Error Firebase > Mensaje > ' + error.message); //
    });
};

//LOGIN CON FACEBOOK
const facebookLoginWithFirebase = () => {
  const provider = new firebase.auth.FacebookAuthProvider(); //Nuevo objeto con el proveedor
  provider.setCustomParameters({ //Crea un login con facebook y enlace un popup
    'display': 'popup'
  });

  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log('Login con Facebook exitoso');
      const user = result.user;
      writeUserData(user.uid, user.displayName, user.email, user.photoURL);
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

//  Función para guardar dato de usuario en Firebase, cuando está logeado con gmail. 
window.writeUserData = (userId, name, email, imageUrl) => {
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

//  Función para escribir un post
window.writeNewPost = (uid, body) => {
  // A post entry.
  var postData = {
    uid: uid,
    body: body
  };
  // Get a key for a new Post. 
  const newPostKey = firebase.database().ref().child('posts').push().key;
  const currentUser = firebase.auth().currentUser;
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  firebase.database().ref().update(updates);
  return newPostKey;
};

window.reload_page = () => {
  window.location.reload();
};