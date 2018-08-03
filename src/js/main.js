//Usuario Facebook Gmail
let username = document.getElementById('user-name');
let userPhoto = document.getElementById('user-image');

//SIGN OUT
const secLoggedIn = document.getElementById('logged-in'); //Contenedor del boton para salir
const logoutButton = document.getElementById('logout'); //boton para salir

//TIMELINE
const postComposerContainer = document.getElementById('post-composer-container'); //contenedor de base de datos
const textComposerArea = document.getElementById('text-composer-area'); //área para hacer una publicación
const sendPostButton = document.getElementById('send-post'); //botón para publicar
const postsContainer = document.getElementById('posts-container'); //contenedor que guardará todos los posts que se creen dinámicamente

/* const photoSelector = document.getElementById('photo-selector');
const sendPhotoButton = document.getElementById('send-photo');  */

//******************FUNCIONES******************

//*********ONLOAD***********

window.onload = () => {
    firebase.auth().onAuthStateChanged(() => {
        const user = firebase.auth().currentUser;
        if (user !== null) {
            console.log('Datos de usuario> ', user);
            console.log('user is signed in');
            //Imprimiendo nombre de usuario en el pàrrafo
            username.innerText = `Bienvenidx ${user.displayName}`;
            //Imprimiendo imagen de usuario usando dom y settAttribute       
            let userPhotoURL = user.photoURL
            /* userPhoto.setAttribute('src', userPhotoURL); */

            firebase.database().ref('posts').once('value', (postsSnap) => {
                const posts1 = postsSnap.val()
                Object.keys(posts1).forEach(pid => {
                  const p = posts1[pid]
                  const elem = document.createElement('div')
                  console.log(p)
                  elem.innerHTML = p.body
                  postsContainer.appendChild(elem)
                })
              });

        } else {
            console.log('no user is signed in');
        }
        //Imprimimos datos que Firebase tiene del usuario
        console.log('user > ' + JSON.stringify(user));
    });
};

//MOSTRAR  FORM REGISTER
const showRegisterForm = () => {
    secRegisterForm.classList.remove('hide');
    secRegisterForm.classList.add('show');
    secLoggedOut.classList.remove('show');
    secLoggedOut.classList.add('hide');
};

//RETURN TO LOGIN 
const backToLogin = () => {
    secRegisterForm.classList.remove('show');
    secRegisterForm.classList.add('hide');
    secLoggedOut.classList.remove('hide');
    secLoggedOut.classList.add('show');
};

//  Función para guardar dato de usuario en Firebase, cuando está logeado con gmail. 
writeUserData = (userId, name, email, imageUrl) => {
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
  const writeNewPost = (uid, body) => {
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
  sendPostButton.addEventListener('click', () => {
    if (postComposerContainer.value === '') {
      alert('Coloca algo antes de enviar');
    }
  });
  sendPostButton.addEventListener('click', () => {
    var userId = firebase.auth().currentUser.uid;
    const newPost = writeNewPost(userId, postComposerContainer.value );
     var btnUpdate = document.createElement("input");
    btnUpdate.setAttribute("value", "Editar");
    btnUpdate.setAttribute("type", "button");
    var btnDelete = document.createElement("input");
    btnDelete.setAttribute("value", "Borrar");
    btnDelete.setAttribute("type", "button");
    
    var contPost = document.createElement('div');
    var textPost = document.createElement('textarea')
    textPost.setAttribute("id", newPost);
     textPost.innerHTML = postComposerContainer.value;
     btnDelete.addEventListener('click', () => {
       firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
      firebase.database().ref().child('posts/' + newPost).remove();
       while(contPost.firstChild) contPost.removeChild(contPost.firstChild);
       alert('El post fue borrado exitosamente');
     /*  reload_page(); */
     });
     btnUpdate.addEventListener('click', () => {
      const newUpdate = document.getElementById(newPost);
      const nuevoPost = {
        body: newUpdate.value,
      };
       var updatesUser = {};
      var updatesPost = {};
       updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
      updatesPost['/posts/' + newPost ] = nuevoPost;
       firebase.database().ref().update(updatesUser);
      firebase.database().ref().update(updatesPost);
      
    });
     contPost.appendChild(textPost);
    contPost.appendChild(btnUpdate );
    contPost.appendChild(btnDelete);
    posts.appendChild(contPost);
  });

//*********REGISTER***********
const registerWithFirebase = () => {
    //Crea usuario con email y password
    firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRegister.value)
        .then(() => {
            console.log('usuario creado con éxito');
            alert('Tu usuario ha sido creado con éxito')
            backToLogin();
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                adviceEmailRegister.innerText = 'Ya existe un usuario con este correo. Por favor, ingrese otro';
            }
            else if (error.code === 'auth/invalid-email') {
                adviceEmailRegister.innerText = 'Por favor, agregue un correo válido';
            }
            else if (error.code === 'auth/weak-password') {
                advicePasswordRegister.innerText = 'Ingresa una contraseña con más de 6 caracteres';
            }
            console.log('Error Firebase > còdigo > ' + error.code); //Contraseña o correo no valido
            console.log('Error Firebase > Mensaje > ' + error.messaje); //
        })
};


//*********LOGIN WITH EMAIL***********
const loginWithFirebase = () => {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(() => {
            console.log('usuario inició sesión con éxito');
            location.assign('index.html');
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
};

// //*********LOGOUT***********
// const logoutWithFirebase = () => {
//     firebase.auth().signOut()
//         .then((result) => {
//             console.log('Usuario finalizo su sesion');
//             location.assign('index.html');
//         })
//         .catch((error) => {
//             console.log('Error de firebase > Codigo >' + error.code);
//             console.log('Error de firebase > Mensaje >' + error.message);
//         })
// };



//*********LOGIN FACEBOOK***********

const facebookLoginWithFirebase = () => {
    const provider = new firebase.auth.FacebookAuthProvider(); //Nuevo objeto con el proveedor
    provider.setCustomParameters({ //Crea un login con facebook y enlace un popup
        'display': 'popup'
    });

    firebase.auth().signInWithPopup(provider)
        .then(() => {
            console.log('Inicia sesión con Facebook');
            location.assign('index.html');

        })
        .catch((error) => {
            console.log('Error Firebase > código > ' + error.code);
            console.log('Error Firebase > Mensaje > ' + error.messaje); //
        });
};

//*********LOGIN GOOGLE***********

const googleLoginWithFirebase = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(() => {
            console.log('Inicia sesión con Google')
            const user = result.user;
            location.assign('index.html');
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

