// //******************FUNCIONES******************

//*********ONLOAD***********

window.onload = () => {
    firebase.auth().onAuthStateChanged(() => {
        const user = firebase.auth().currentUser;
        if (user !== null) {
            console.log('Datos de usuario> ', user);
            console.log('existe usuario activo');

        } else {
            console.log('no existe usuario activo');
        }
    });
};

//MOSTRAR  FORM REGISTRO
const showRegisterForm = () => {
    secRegisterForm.classList.remove('hide');
    secRegisterForm.classList.add('show');
    secLoggedOut.classList.remove('show');
    secLoggedOut.classList.add('hide');
}

//REGRESAR A LOGIN 
const backToLogin = () => {
    secRegisterForm.classList.remove('show');
    secRegisterForm.classList.add('hide');
    secLoggedOut.classList.remove('hide');
    secLoggedOut.classList.add('show');
}

//*********REGISTRO***********
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
}


//*********LOGIN POR CORREO***********
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
}

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
}

//*********LOGIN GOOGLE***********

let userData = {}

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
}






    // window.onload = () => {
    //     //Listener en tiempo real EL CHISMOSO
    //     firebase.auth().onAuthStateChanged((user) => {
    //       if (user) {//Si está logeado mostramos la opcion de logout y nombre de usuario
    //         //También podemos traer los sections directamente pero por orden mejor lo declaramos arriba
    //         // firebase.database().ref(`users`).remove()
    //         secLoggedIn.style.display = 'block';
    //         userPhoto.style.display = 'block';
    //         secPostContainer.style.display = 'block';
    //         secLoggedOut.style.display = 'none';
    //         secRegisterForm.style.display = 'none';
    //         secInput.style.display = 'block';
    //         //Imprimiendo nombre de usuario en el pàrrafo
    //         username.innerText = `Bienvenidx ${user.displayName}`;
    //         //Imprimiendo imagen de usuario usando dom y settAttribute       
    //         let userPhotoURL = user.photoURL
    //         userPhoto.setAttribute('src', userPhotoURL);

    //       } else {//Si NO está logueado, mostramos formulario(OPCION LOGGEDOUT)
    //         secLoggedIn.style.display = 'none';
    //         userPhoto.style.display = 'none';
    //         secPostContainer.style.display = 'none';
    //         secLoggedOut.style.display = 'block';
    //         secRegisterForm.style.display = 'none';
    //         secInput.style.display = 'none';
    //       }
    //       //Imprimimos datos que Firebase tiene del usuario
    //       console.log('user > ' + JSON.stringify(user));
    //     });
    //     //DATABASE
    //     firebase.database().ref('posts/-LITKiEKXpCMWfZq_Trl/creator')//Usamos ref para llegar a una ruta,id usuario etc
    //       .once('value')
    //       .then((posts) => {
    //         console.log('Posts> ' + JSON.stringify(posts));
    //       })
    //       .catch((error) => {
    //         console.log('Database error > ' + error);
    //       });

    //     //Extraemos o consultamos datos una vez, como en DataDashboard
    //     //firebase.database().ref('posts')es como un callback
    //     firebase.database().ref('posts')//En la referencia podemos poner un escuchador para un contador
    //       .limitToLast(3) //Filtro de datos, donde limito sólo 2 gifs
    //       .once('value') //Para escuchar datos sólo una vez
    //       .then((post) => {
    //         console.log('EL POST > ' + JSON.stringify(post));
    //       })
    //       .catch((error) => {
    //         console.log('Database error > ' + JSON.stringify(error));
    //       });

    //     //Escuchador, se agrega cada que alguien agrega algo nuevo
    //     firebase.database().ref('posts')//database de firebase, escucha la referencia gifs
    //       //Evento para escucha cada hijo que se agrega, cada regalo que se envìa.Permite escuchar cada que alguien agrega un nuevo gif
    //       .limitToLast(3)//Limitar mensajes 
    //       //↓↓newGif es funcion callBack
    //       .on('child_added', (newPost) => {//NewGif es un elemento completo en Firebase, para acceder a valores tiene que colocar .val(),sino jalará propiedad:valor
    //         // if(postArea.value === ''){
    //         //   alert('Coloca algo antes de enviar');
    //         // }
    //         // else 
    //         secPostContainer.innerHTML += `
    //           <div id="${newPost.val().id}" >
    //             <p>${newPost.val().creatorName}</p>
    //             <textarea>${newPost.val().textPost}</textarea>
    //             <button class="edit-btn">Editar</button>
    //             <button class="erase-btn">Borrar</button>
    //           <div>
    //         `;

    //         const contentPost = document.querySelector('#' + newPost.val().id + ' .edit-btn');
    //         const eraseBtn = document.querySelector('#' + newPost.val().id + ' .erase-btn');
    //         eraseBtn.addEventListener('click', () => {
    //           firebase.database().ref('/posts/' + newPost.val().id).remove()

    //         })

    //       })
    //   };




    //   // //ESCRIBIR DB
    //   const writeUserData = (userId, name, email, imageUrl) => {
    //     firebase.database().ref('users/' + userId).set({
    //       username: name,
    //       email: email,
    //       profile_picture: imageUrl
    //     }).then(result => {
    //       console.log(result);

    //     })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   };






    //   //Salir de form de registro y regresar al loggin inicial
    //   const backToLogin = () => {
    //     secLoggedIn.style.display = 'none';
    //     userPhoto.style.display = 'none';
    //     secLoggedOut.style.display = 'block';
    //     secRegisterForm.style.display = 'none';
    //   }

    //   backButton.addEventListener('click', backToLogin)










    ;

//   //*********DATA BASE***********



//   const sendPost = () => {
//     const postValue = postArea.value;
//     //ref, carpeta donde guardamos cosas//Cada child es como un archivoSon gifs, deberìan de ser mensaje
//     const newPostKey = firebase.database().ref().child('posts').push().key;//Cada llame es ùnica y se crea cuando haces clic en un botòn
//     const currentUser = firebase.auth().currentUser; //Obtener usuario y datos, solo funciona si estamos logueados
//     firebase.database().ref(`posts/${newPostKey}`).set({ //Ruta para llegar a los datos. Gif que es la coleccion, esto despuès se cambia
//       textPost: postValue,//
//       creatorName: currentUser.displayName || currentUser.providerData[0].email,//Guardar datos, asignando un usuario. Clonamos nombe de usuario
//       creator: currentUser.uid,//id del usuario
//     });
//   }

//   sendPostButton.addEventListener('click', () => {
//     if (postArea.value == '') {
//       alert('Coloca algo antes de enviar');
//     }
//     else
//       sendPost();
//   });


//   //STORAGE
//   const sendPhotoToStorage = () => {
//     const photoFile = photoSelector.files[0]; //Los inputs tipo file ingresan sus datos en files, que es el equivalente a value
//     const fileName = photoFile.name; //Nombre del archivo. Arma la ruta
//     const metadata = {//Datos sobr el archivo que estamos subiendo
//       contentType: photoFile.type//Tipo de archivo que sube
//     };
//     //Ref nos dirige  a la carpeta imagenes, que es la que se crearà o ingresaremos cuando subamos una foto
//     //Task es una promesa pero a la vez un objeto con métodos
//     const task = firebase.storage().ref('images')
//       .child(fileName)
//       .put(photoFile, metadata);


//     task.then(snapshot => snapshot.ref.getDownloadURL())//Obtenemos la url de la imagen
//       .then(url => {
//         console.log('URL del archivo > ' + url) //Ya subimos el archivo a Firebase, nos da un archivo


//       });
//   }



//   sendPhotoButton.addEventListener('click', sendPhotoToStorage);