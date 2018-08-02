/* //Usuario Facebook Gmail
let userName = document.getElementById('user-name');
let userPhoto = document.getElementById('user-image');

//CERRAR SESION
const userOptions = document.getElementById('user-options'); //Contenedor de opciones para el usuario ejm boton para salir
const logoutButton = document.getElementById('logout'); //boton para salir

//DATABASE
const textComposerArea = document.getElementById('text-composer-area'); //area donde se escribe un post
const postsContainer = document.getElementById('posts-container');//div que contiene los post que se crean
const postComposerContainer = document.getElementById('post-composer-container'); //contenedor div donde escribe post
const sendPostButton = document.getElementById('send-post'); //boton de publicar post */

/* const sendPostButton = document.getElementById('send-post');
const photoSelector = document.getElementById('photo-selector');
const sendPhotoButton = document.getElementById('send-photo'); */

/* FUNCIONES */
/* const holi = () => {
}; */



 /*  const postRef = firebase.database().ref('posts');
    postRef.on("child_added", newPostKey => {
        let user = newPostKey.val();
        let $li = document.createElement("li");
        $li.innerHTML = user.name;
        $li.setAttribute("child-key", newPostKey.key); 
        $li.addEventListener("click", userClicked)
        userListUI.append($li);


     }); */

    /*  const postsRef = firebase.database().ref();
     const unpostRef = postsRef.child('post');
     const postsContainer = document.getElementById('posts-container');

postsRef.on("child_added", newPostKey => {
   let user = newPostKey.val();
   let $divPost = document.createElement("div");
   $divPost.innerHTML = user.name;
   $divPost.setAttribute("child-key", newPostKey.key); 
   $divPost.addEventListener("click", userClicked)
   postsContainer.append($divPost);
});

function userClicked(e) {
    var userID = e.target.getAttribute("child-key");
    const userRef = dbRef.child('users/' + userID);
    const userDetailUI = document.getElementById("userDetail");
    userDetailUI.innerHTML = ""
    userRef.on("child_added", snap => {
      var $p = document.createElement("p");
      $p.innerHTML = snap.key + " - " + snap.val()
      userDetailUI.append($p);
    });
  };
    

    //ref, carpeta donde guardamos cosas//Cada child es como un archivoSon gifs, deberìan de ser mensaje
    const newPostKey = firebase.database().ref('posts').push().key;//Cada llame es ùnica y se crea cuando haces clic en un botòn
    const currentUser = firebase.auth().currentUser; //Obtener usuario y datos, solo funciona si estamos logueados
    firebase.database().ref(`posts/${newPostKey}`).set({
        //Ruta para llegar a los datos. Gif que es la coleccion, esto despuès se cambia
        post: postValue,//
        creatorName: currentUser.displayName || currentUser.providerData[0].email,//Guardar datos, asignando un usuario. Clonamos nombe de usuario
        creator: currentUser.uid,//id del usuario
    }); */

/* //STORAGE
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
};

sendPhotoButton.addEventListener('click', sendPhotoToStorage); */
