/* INICIO DE MODAL */
let showModal =() => {
    document.getElementById('loginModal').style.display='block';
    }

let loginButton = document.getElementById(login-button);
loginButton.addEventListener('click', showModal);



/* FIN DE MODAL */

//ELEMENTOS DEL DOM
//Espacios login
// const email = document.getElementById('email');
// const password = document.getElementById('password');
// const nameForRegister = document.getElementById('name-register');
// const emailRegister = document.getElementById('email-register');
// const passwordRegister = document.getElementById('password-register');
// //Botones de login
// const createUser = document.getElementById('create-user');
// const registerButton = document.getElementById('register-button');
// // const loginButton = document.getElementById('login-button');
// const logoutButton = document.getElementById('logout');
// const backButton = document.getElementById('back-button');
// //Secciòn LoggedIn y LoggedOut
// const secLoggedIn = document.getElementById('logged-in');
// const secLoggedOut = document.getElementById('logged-out');
// const secRegisterForm = document.getElementById('sec-register');
// //Logueo con redes
// const facebookButton = document.getElementById('facebook-button');
// const googleButton = document.getElementById('google-button')
// //Usuario Facebook Gmail
// let username = document.getElementById('user-name');
// let userPhoto = document.getElementById('user-image');
// //Errores registro y logueo
// let adviceEmailRegister = document.getElementById('advice-emailRegister');
// let advicePasswordRegister = document.getElementById('advice-passwordRegister');
// let errorEmail = document.getElementById('error-email');
// let errorPassword = document.getElementById('error-password');
// //DATABASE
// const postArea = document.getElementById('post-textrea');
// const sendPostButton = document.getElementById('send-post');
// const photoSelector = document.getElementById('photo-selector');
// const sendPhotoButton = document.getElementById('send-photo');
// const secPostContainer = document.getElementById('post-container');
// const secInput = document.getElementById('sec-input');
// // MOSTRAR  FORM REGISTRO
// createUser.addEventListener('click', showRegisterForm);
// // REGRESAR A LOGIN DESDE REGISTRO
// backButton.addEventListener('click', backToLogin);
// //REGISTRO POR CORREO
// registerButton.addEventListener('click', registerWithFirebase);
// // //LOGOUT
// // logoutButton.addEventListener('click', logoutWithFirebase);
// //LOGIN POR CORREO
// loginButton.addEventListener('click', loginWithFirebase);
// //LOGIN POR FACEBOOK
// facebookButton.addEventListener('click', facebookLoginWithFirebase);
// //LOGIN POR GOOGLE
// googleButton.addEventListener('click', googleLoginWithFirebase);