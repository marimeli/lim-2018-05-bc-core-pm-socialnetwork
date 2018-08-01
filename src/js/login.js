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
const postArea = document.getElementById('post-textrea');
const sendPostButton = document.getElementById('send-post');
const photoSelector = document.getElementById('photo-selector');
const sendPhotoButton = document.getElementById('send-photo');
const secPostContainer = document.getElementById('post-container');
const secInput = document.getElementById('sec-input');


//******************FUNCIONES******************

window.onload = () => {
  //Listener en tiempo real EL CHISMOSO
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {//Si está logeado mostramos la opcion de logout y nombre de usuario
      //También podemos traer los sections directamente pero por orden mejor lo declaramos arriba
      // firebase.database().ref(`users`).remove()
      secLoggedIn.style.display = 'block';
      userPhoto.style.display = 'block';
      secPostContainer.style.display = 'block';
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
      secPostContainer.style.display = 'none';
      secLoggedOut.style.display = 'block';
      secRegisterForm.style.display = 'none';
      secInput.style.display = 'none';
    }
    //Imprimimos datos que Firebase tiene del usuario
    console.log('user > ' + JSON.stringify(user));
  });
  //DATABASE
  firebase.database().ref('posts/-LITKiEKXpCMWfZq_Trl/creator')//Usamos ref para llegar a una ruta,id usuario etc
    .once('value')
    .then((posts) => {
      console.log('Posts> ' + JSON.stringify(posts));
    })
    .catch((error) => {
      console.log('Database error > ' + error);
    });

  //Extraemos o consultamos datos una vez, como en DataDashboard
  //firebase.database().ref('gifs')es como un callback
  firebase.database().ref('posts')//En la referencia podemos poner un escuchador para un contador
    .limitToLast(3) //Filtro de datos, donde limito sólo 2 gifs
    .once('value') //Para escuchar datos sólo una vez
    .then((post) => {
      console.log('EL POST > ' + JSON.stringify(post));
    })
    .catch((error) => {
      console.log('Database error > ' + JSON.stringify(error));
    });

  //Escuchador, se agrega cada que alguien agrega algo nuevo
  firebase.database().ref('posts')//database de firebase, escucha la referencia gifs
    //Evento para escucha cada hijo que se agrega, cada regalo que se envìa.Permite escuchar cada que alguien agrega un nuevo gif
    .limitToLast(3)//Limitar mensajes 
    //↓↓newGif es funcion callBack
    .on('child_added', (newPost) => {//NewGif es un elemento completo en Firebase, para acceder a valores tiene que colocar .val(),sino jalará propiedad:valor
      // if(gifArea.value === ''){
      //   alert('Coloca algo antes de enviar');
      // }
      // else 
      secPostContainer.innerHTML += `
        <div id="${newPost.val().id}" >
          <p>${newPost.val().creatorName}</p>
          <textarea>${newPost.val().textPost}</textarea>
          <button class="edit-btn">Editar</button>
          <button class="erase-btn">Borrar</button>
        <div>
      `;

      const contentPost = document.querySelector('#' + newPost.val().id + ' .edit-btn');
      const eraseBtn = document.querySelector('#' + newPost.val().id + ' .erase-btn');
      eraseBtn.addEventListener('click', () => {
        firebase.database().ref('/posts/' + newPost.val().id).remove()
        
      })

    })
};


// btnDelete.addEventListener('click', () => {

//   firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
//   firebase.database().ref().child('posts/' + newPost).remove();
//   //la siguiente linea es manipulacion del dom
//   while (contPost.firstChild) contPost.removeChild(contPost.firstChild);
//   alert('El usuario elimino su post');
//  /*  reload_page(); */
// });





// btnDelete.addEventListener('click', () => {

//    firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
//    firebase.database().ref().child('posts/' + newPost).remove();
//    //la siguiente linea es manipulacion del dom
//    while (contPost.firstChild) contPost.removeChild(contPost.firstChild);
//    alert('El usuario elimino su post');
//   /*  reload_page(); */
//  });



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



// function writeNewPost(uid, body) {
//   // A post entry.
//   let postData = {
//     uid: uid,
//     body: body,
//   };

//   // Get a key for a new Post.
//   var newPostKey = firebase.database().ref().child('posts').push().key;

//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   var updates = {};
//   updates['/posts/' + newPostKey] = postData;
//   updates['/user-posts/' + uid + '/' + newPostKey] = postData;

//   firebase.database().ref().update(updates);
//   return newPostKey;
// }

// sendGifButton.addEventListener('click', () => {
//   let userId = firebase.auth().currentUser.uid;
//   const newPost = writeNewPost(userId, gifArea.value);


//   var btnUpdate = document.createElement("input");
//   btnUpdate.setAttribute("value", "Editar");
//   btnUpdate.setAttribute("type", "button");
//   var btnDelete = document.createElement("input");
//   btnDelete.setAttribute("value", "Borrar");
//   btnDelete.setAttribute("type", "button");
//   var contPost = document.createElement('div');
//   var textPost = document.createElement('textarea')
//   textPost.setAttribute("id", newPost);

//   textPost.innerHTML = gifArea.value;

//   btnDelete.addEventListener('click', () => {

//     firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
//     firebase.database().ref().child('posts/' + newPost).remove();

//    while (contPost.firstChild) contPost.removeChild(contPost.firstChild);
//    alert('El usuario elimino su post');




//   });

//   btnUpdate.addEventListener('click', () => {
//     const newUpdate = document.getElementById(newPost);
//     const nuevoPost = {
//       body: newUpdate.value,
//     };

//     var updatesUser = {};
//     var updatesPost = {};

//     updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
//     updatesPost['/posts/' + newPost] = nuevoPost;

//     firebase.database().ref().update(updatesUser);
//     firebase.database().ref().update(updatesPost);

//   });

//   contPost.appendChild(textPost);
//   contPost.appendChild(btnUpdate);
//   contPost.appendChild(btnDelete);
//   secGifContainer.appendChild(contPost);
// })







//Salir de form de registro y regresar al loggin inicial
const backToLogin = () => {
  secLoggedIn.style.display = 'none';
  userPhoto.style.display = 'none';
  secLoggedOut.style.display = 'block';
  secRegisterForm.style.display = 'none';
}

backButton.addEventListener('click', backToLogin)

//  Función para escribir dato de usuario en Firebase, cuando está logeado 
// const writeUserData = (userId, name, email, imageUrl) => {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture: imageUrl
//   }).then(result => {
//     console.log(result);

//   })
//     .catch(error => {
//       console.log(error);
//     });
// };

//*********REGISTRO***********
const registerWithFirebase = () => {
  //Crea usuario con email y password
  firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRegister.value)
    .then(() => {
      console.log('usuario creado con èxito');
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        adviceEmailRegister.innerText = 'Ya existe un usuario con este correo. Por favor, ingrese otro';
      }
      else if (error.code === 'auth/invalid-email') {
        adviceEmailRegister.innerText = 'Por favor, agregue un correo válido';
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

createUser.addEventListener('click', showRegisterForm);
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
        errorPassword.innerText = 'Su contraseña es incorrecta';
      }
      else if (error.code === 'auth/invalid-email') {
        errorEmail.innerText = 'Por favor, agregue un correo válido';
      }
      else if (error.code === 'auth/user-not-found') {
        errorEmail.innerText = 'No existe un usuario con este correo. Por favor, regístrese';
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

//*********DATA BASE***********



const sendPost = () => {
  const postValue = postArea.value;
  //ref, carpeta donde guardamos cosas//Cada child es como un archivoSon gifs, deberìan de ser mensaje
  const newPostKey = firebase.database().ref().child('posts').push().key;//Cada llame es ùnica y se crea cuando haces clic en un botòn
  const currentUser = firebase.auth().currentUser; //Obtener usuario y datos, solo funciona si estamos logueados
  firebase.database().ref(`posts/${newPostKey}`).set({ //Ruta para llegar a los datos. Gif que es la coleccion, esto despuès se cambia
    textPost: postValue,//
    creatorName: currentUser.displayName || currentUser.providerData[0].email,//Guardar datos, asignando un usuario. Clonamos nombe de usuario
    creator: currentUser.uid,//id del usuario
  });
}

sendPostButton.addEventListener('click', () => {
  if (postArea.value === '') {
    alert('Coloca algo antes de enviar');
  }
  else
    sendPost();
});


//STORAGE
const sendPhotoToStorage = () => {
  const photoFile = photoSelector.files[0]; //Los inputs tipo file ingresan sus datos en files, que es el equivalente a value
  const fileName = photoFile.name; //Nombre del archivo. Arma la ruta
  const metadata = {//Datos sobr el archivo que estamos subiendo
    contentType: photoFile.type//Tipo de archivo que sube
  };
  //Ref nos dirige  a la carpeta imagenes, que es la que se crearà o ingresaremos cuando subamos una foto
  //Task es una promesa pero a la vez un objeto con métodos
  const task = firebase.storage().ref('images')
    .child(fileName)
    .put(photoFile, metadata);


  task.then(snapshot => snapshot.ref.getDownloadURL())//Obtenemos la url de la imagen
    .then(url => {
      console.log('URL del archivo > ' + url) //Ya subimos el archivo a Firebase, nos da un archivo


    });
}



sendPhotoButton.addEventListener('click', sendPhotoToStorage);