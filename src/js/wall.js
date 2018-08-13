/* alert('3'); */

//*********WINDOWS ONLOAD***********
window.onload = () => {
  //Listener en tiempo real EL CHISMOSO
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {//Si está logeado mostramos la opcion de logout y nombre de usuario
      console.log('Usuario logueado');
      //Ocultar botones que abren modales de registro y login
      dontShowModalRegister();
      dontShowModal();
      userInformation(user);
      //Muestra perfil y container para publicar

      hideContainers();
      writeUserData(user.uid, user.displayName, user.email, user.photoURL);

    } else {//Si NO está logueado, mostramos formulario(OPCION LOGGEDOUT)
      console.log('Usuario NO logueado');
      showContainers();
    }
    //Imprimimos datos que Firebase tiene del usuario
    console.log('User > ' + JSON.stringify(user));
    getPrivatePostbyFirebase(user.uid);
    getPublicPostByFirebase(user.uid);

    myProfile();
  });

};

//  Función para guardar dato de usuario en Firebase cuando está logeado. 
window.writeUserData = (userId, name, email, imageUrl) => {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  })
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
};

//Imprimir post PÚBLICOS
window.printPublicPost = (newPublicPosts) => { //hacer otro parámetro que define si es público o priv. 
  // si ese parametro es publico, then 

  const postskey = newPublicPosts.key;
  const contPost = document.createElement('div');
  contPost.setAttribute('class', "w3-container w3-card w3-white w3-round w3-margin")

  const image = document.createElement('img');
  image.setAttribute('class', "w3-left w3-circle w3-margin-top")
  image.setAttribute('style', "width:60px")
  image.setAttribute('alt', "Avatar")

  const line = document.createElement('hr');
  line.setAttribute('class', "w3-clear")

  const author = document.createElement('h4');
  author.setAttribute('style', "margin-top: 22px,");
  author.setAttribute('class', "author");

  const textPost = document.createElement('textarea');
  textPost.setAttribute('class', 'w3-left  w3-margin-right edit-textarea');
  textPost.setAttribute('id', postskey);
  textPost.innerHTML = `${newPublicPosts.val().body}`;
  textPost.setAttribute('disabled', true);

  const lineBreak = document.createElement('br');

  const btnLike = document.createElement('input');
  btnLike.setAttribute('value', 'Me gusta');
  btnLike.setAttribute('type', 'button')
  btnLike.setAttribute('id', postskey);

  btnLike.setAttribute('class', "w3-button w3-theme-d1 w3-margin-bottom");


  const contadorlike = document.createElement('a');
  contadorlike.setAttribute('class', 'w3-button w3-margin-bottom ')
  contadorlike.setAttribute('id', postskey);
  contadorlike.innerHTML = `${newPublicPosts.val().likeCount}`;
  var clicks = 0;
  btnLike.addEventListener('click', () => {
    clicks += 1;
    contadorlike.innerHTML = clicks;

    const newUpdate = textPost.innerText
    const newPostvalue = newUpdate
    const nuevoPost = {
      body: newPostvalue,
      image: `${newPublicPosts.val().image}`,
      author: `${newPublicPosts.val().author}`,
      uid: `${newPublicPosts.val().uid}`,
      key: postskey,
      likeCount: clicks,
    };
    const updatesUser = {};
    const updatesPost = {};

    updatesPost[`/posts/${newPublicPosts.key}`] = nuevoPost; // aquí va la condicion
    firebase.database().ref().update(updatesUser);
    firebase.database().ref().update(updatesPost);

  })

  publicContainer.appendChild(contPost);
  contPost.appendChild(image);
  contPost.appendChild(author);
  contPost.appendChild(line);
  contPost.appendChild(textPost);
  contPost.appendChild(lineBreak);
  contPost.appendChild(line);
  contPost.appendChild(contadorlike);
  contPost.appendChild(btnLike);

  if (`${newPublicPosts.val().author}` == 'undefined') {
    author.innerHTML = `${newPublicPosts.val().email}`
    image.setAttribute('src', 'https://png.icons8.com/ios/1600/user-male-circle-filled.png')
  }
  else {
    author.innerHTML = `${newPublicPosts.val().author}`
    image.setAttribute('src', `${newPublicPosts.val().image}`)
  }
};

// Esta es la función para pintar dinámicamente los post personales(privados)
window.showPostsUserProfile = (newPostsUser) => {

  const postskey = newPostsUser.key

  const contPost = document.createElement('div');
  contPost.setAttribute('class', "w3-container w3-card w3-white w3-round w3-margin")

  const image = document.createElement('img');
  image.setAttribute('class', "w3-left w3-circle w3-margin-top")
  image.setAttribute('style', "width:60px")
  image.setAttribute('alt', "Avatar")

  const line = document.createElement('hr');
  line.setAttribute('class', "w3-clear")

  const author = document.createElement('h4');
  author.setAttribute('class', "author");
  author.setAttribute('style', "margin-top: 22px");


  const textPost = document.createElement('textarea');
  textPost.setAttribute('class', "w3-left w3-margin-right edit-textarea");
  textPost.setAttribute('id', postskey);
  textPost.setAttribute('disabled', true);
  textPost.innerHTML = `${newPostsUser.val().body}`;
  textPost.setAttribute('disabled', true);

  const lineBreak = document.createElement('br');
  lineBreak.setAttribute('class', "w3-clear");

  const btnEdit = document.createElement('input');
  btnEdit.setAttribute('value', 'Editar');
  btnEdit.setAttribute('type', 'button');
  btnEdit.setAttribute('id', postskey);
  btnEdit.setAttribute('class', "w3-button w3-theme-d1 w3-margin-bottom")
  btnEdit.setAttribute('style', 'margin: 10px')


  const btnDelete = document.createElement('input');
  btnDelete.setAttribute('value', 'Borrar');
  btnDelete.setAttribute('type', 'button');
  btnDelete.setAttribute('id', postskey);
  btnDelete.setAttribute('class', "w3-button w3-theme-d1 w3-margin-bottom");
  btnDelete.setAttribute('style', 'margin: 10px');


  btnDelete.addEventListener('click', (e) => {
    if (newPostsUser.key === e.target.id) {
      const question = confirm('¿Esta seguro que desea eliminar esta publicación?')
      if (question === true) {
        firebase.database().ref().child(`/posts/${newPostsUser.key}`).remove();
        firebase.database().ref().child(`/user-posts/${newPostsUser.val().uid}/${newPostsUser.key}`).remove();
        contPost.remove();
        alert('El post fue borrado exitosamente');
      }
    }
  });

  btnEdit.addEventListener('click', (e) => {
    textPost.disabled = false;
    textPost.setAttribute('class', "w3-left w3-margin-right focus-textarea");
    btnEdit.style.display = 'none';
    const btnSave = document.createElement('input');
    btnSave.setAttribute('value', 'Guardar');
    btnSave.setAttribute('type', 'button');
    btnSave.setAttribute('class', "w3-blue w3-button w3-margin-bottom");
    btnSave.setAttribute('id', postskey);
    btnSave.setAttribute('style', 'margin: 10px');
    btnSave.addEventListener('click', (e) => {
      if (postskey === e.target.id) {
        const currentUser = firebase.auth().currentUser;
        const newUpdate = textPost.value;
        const newPostvalue = newUpdate;
        const nuevoPost = {
          body: newPostvalue,
          image: currentUser.photoURL || 'https://png.icons8.com/ios/1600/user-male-circle-filled.png',
          author: currentUser.displayName || currentUser.email,

          uid: currentUser.uid,
          key: postskey,
          likeCount: 0,
        };

        const updatesUser = {};
        const updatesPost = {};
        updatesUser[`/user-posts/${newPostsUser.val().uid}/${newPostsUser.key}`] = nuevoPost;
        updatesPost[`/posts/${newPostsUser.key}`] = nuevoPost;
        firebase.database().ref().update(updatesUser);
        firebase.database().ref().update(updatesPost);
        reloadPage();
      }

      // textPost.contentEditable = "false";
      // document.getElementById("postskey").disabled = true;
    })
    contPost.appendChild(btnSave);
  });

  privateContainer.appendChild(contPost);
  contPost.appendChild(image);
  contPost.appendChild(author);
  contPost.appendChild(line);
  contPost.appendChild(textPost);
  contPost.appendChild(lineBreak);
  contPost.appendChild(line);
  contPost.appendChild(btnEdit);
  contPost.appendChild(btnDelete);

  if (`${newPostsUser.val().author}` === 'undefined') {
    author.innerHTML = `${newPostsUser.val().email}`
    image.setAttribute('src', 'https://png.icons8.com/ios/1600/user-male-circle-filled.png')
  }

  else {
    author.innerHTML = `${newPostsUser.val().author}`
    image.setAttribute('src', `${newPostsUser.val().image}`)
  }
};

//  Función para traer todos los posts publicos almacenados en Firebase. 

window.getPublicPostByFirebase = (uid) => {
  // Trae los posts de todos los usuarios (Públicos)
  const allUsersPosts = firebase.database().ref('posts');
  allUsersPosts.on("child_added", newPublicPosts => {
    printPublicPost(newPublicPosts);
  });
};

//  Función para traer todos los posts privados almacenados en Firebase. 
window.getPrivatePostbyFirebase = (uid) => {
  //Trae solo los posts del usuario (Personales)
  const userPosts = firebase.database().ref('user-posts').child(uid);
  userPosts.on("child_added", newUserPosts => {
    showPostsUserProfile(newUserPosts);
  });
};

// Funcion que escribe un post en Firebase
window.writtingPost = () => {
  let privacyValue = statusOfPrivacy.value;
  const composerAreaValue = textComposerArea.value;
  if (composerAreaValue.length === 0 && composerAreaValue === '') { //acá verifica si está en blanco
    alert('Escribe un texto antes de publicar');
  }
  //Escribe nuevo post en firebase
  const currentUser = firebase.auth().currentUser;
  const messageAreaText = textComposerArea.value;
  const newPostKey = firebase.database().ref().child('posts').push().key;
  const postData = {
    image: currentUser.photoURL,
    author: currentUser.displayName,
    uid: currentUser.uid,
    body: messageAreaText,
    key: newPostKey,
    likeCount: 0,
    email: currentUser.email
  };
  const updates = {};
  updates['/user-posts/' + currentUser.uid + '/' + newPostKey] = postData; //si es privado solo se guarda en user-post
  cleanTextarea();

  //condición para que escriba también en la rama post cuando es público
  if (privacyValue === 'public') {
    updates['/posts/' + newPostKey] = postData;
    cleanTextarea();
  }
  return firebase.database().ref().update(updates);
};