//ELEMENTOS DEL DOM
//Espacios login
const email = document.getElementById('email');
const password = document.getElementById('password');
//Botones de login
const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logout');
//Botones de login
const secLoggedIn = document.getElementById('loggedIn');
const secLoggedOut = document.getElementById('loggedOut');

const facebookButton = document.getElementById('facebookButton');

let username = document.getElementById('username');
let userImage = document.getElementById('userImage');

//******************FUNCIONES******************

window.onload = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {//Si está logeado mostramos la opcion de logout y nombre de usuario
            //También podemos traer los sections directamente pero por orden mejor lo declaramos arriba
            secLoggedIn.style.display = 'block';
            secLoggedOut.style.display = 'none';
            //Imprimiendo nombre de usuario en el pàrrafo
            username.innerText = user.displayName;
            //Imprimiendo imagen de usuario usando dom y settAttribute       
            let userPhoto = user.photoURL;
            userImage.setAttribute('src', userPhoto);
            
        } else {//Si NO está logueado, mostramos formulario(OPCION LOGGEDOUT)
            secLoggedIn.style.display = 'none';
            secLoggedOut.style.display = 'block';
        }
        //Imprimimos datos que Firebase tiene del usuario
        console.log('user > ' + JSON.stringify(user));
        

    });
}

//*********REGISTRO***********
const registerWithFirebase = () => {
    const emailValue = email.value;
    const passwordValue = password.value;
    //Crea usuario con email y password
    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
        .then(() => {
            console.log('usuario creado con èxito');
        })

        .catch((error) => {
            console.log('Error Firebase > còdigo > ' + error.code); //Contraseña o correo no valido
            console.log('Error Firebase > Mensaje > ' + error.messaje); //
        })
}

registerButton.addEventListener('click', registerWithFirebase);

//*********LOGIN***********
const loginWithFirebase = () => {
    const emailValue = email.value;
    const passwordValue = password.value;
    
    firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
        console.log('usuario inició sesiòn con èxito');
    })

    .catch((error) => {
        //Aquì podemos colocar mensaje de error en HTML
        console.log('Error Firebase > còdigo > ' + error.code); //Contraseña o correo no valido
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
        console.log('Error Firebase > còdigo > ' + error.code); //Contraseña o correo no valido
        console.log('Error Firebase > Mensaje > ' + error.messaje); //
    });
}

logoutButton.addEventListener('click', logoutWithFirebase);


//*********LOGIN FACEBOOK***********

const facebookLoginWithFirebase = () => {
    const provider = new firebase.auth.FacebookAuthProvider(); //Nuevo objeto con el proveedor
    provider.setCustomParameters({ //Crea un login con facebook y enlace un popup
        'display' : 'popup'
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