//ELEMENTOS DEL DOM
const postButton = document.getElementById('post-button');

//******************FUNCIONES******************
/* 
const sendPost = () => {
    const postButtonValue = postButton.value;
    newPostKey 
}; */

//Esta funcion permite relacionar al usuario con sus posts

const createPost = () => {
    const postButtonValue = postButton.value;
    const currentUser = firebase.auth().currentUser; //si estamos logueados, siempre podremos acceder a la info del usuario con esta linea
    // Generar un id para la publicación.
    //ref es la ruta. las colecciones son como las carpetas
    const newPostKey = firebase.database().ref().child('posts').push().key;
    // 
    firebase.database().ref('/posts/' + `${newPostKey}`).set({
        creatorName : currentUser.displayName,
        creator : currentUser.uid
       /* author: username,
        uid: uid,
        body: body,
        title: title,
        starCount: 0,
        authorPic: picture */
    });
};

