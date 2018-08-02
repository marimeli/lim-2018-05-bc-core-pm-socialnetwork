/* //ELEMENTOS DEL DOM
//Espacios login
const email = document.getElementById('email');
const password = document.getElementById('password');
const nameForRegister = document.getElementById('name-register');
const emailRegister = document.getElementById('email-register');
const passwordRegister = document.getElementById('password-register');
//Botones de REGISTRO Y LOGIN
const createUser = document.getElementById('create-user');
const registerButton = document.getElementById('register-button');
const loginButton = document.getElementById('login-button');
const backButton = document.getElementById('back-button');

//Secciòn LoggedIn y LoggedOut
const secLoggedOut = document.getElementById('logged-out'); //seccion de login
const secRegisterForm = document.getElementById('sec-register');

//Logueo con redes
const facebookButton = document.getElementById('facebook-button');
const googleButton = document.getElementById('google-button')

//Errores registro y logueo
let adviceEmailRegister = document.getElementById('advice-emailRegister');
let advicePasswordRegister = document.getElementById('advice-passwordRegister');
let errorEmail = document.getElementById('error-email');
let errorPassword = document.getElementById('error-password');

// MOSTRAR  FORM REGISTRO
createUser.addEventListener('click', showRegisterForm);
// REGRESAR A LOGIN DESDE REGISTRO
backButton.addEventListener('click', backToLogin);
//REGISTRO POR CORREO
registerButton.addEventListener('click', registerWithFirebase);
// //LOGOUT
// logoutButton.addEventListener('click', logoutWithFirebase);
//LOGIN POR CORREO
loginButton.addEventListener('click', loginWithFirebase);
//LOGIN POR FACEBOOK
facebookButton.addEventListener('click', facebookLoginWithFirebase);
//LOGIN POR GOOGLE
googleButton.addEventListener('click', googleLoginWithFirebase); */

//ELEMENTOS DEL DOM
//Espacios login
const email = document.getElementById('email');
const password = document.getElementById('password');
const nameForRegister = document.getElementById('name-register');
//ELEMENTOS DEL DOM
//Espacios login
const email = document.getElementById('email');
const password = document.getElementById('password');
const nameForRegister = document.getElementById('name-register');
const emailRegister = document.getElementById('email-register');
const passwordRegister = document.getElementById('password-register');
//Botones de REGISTRO Y LOGIN
const createUser = document.getElementById('create-user');
const registerButton = document.getElementById('register-button');
const loginButton = document.getElementById('login-button');
const backButton = document.getElementById('back-button');

//Secciòn LoggedIn y LoggedOut
const secLoggedOut = document.getElementById('logged-out'); //seccion de login
const secRegisterForm = document.getElementById('sec-register');

//Logueo con redes
const facebookButton = document.getElementById('facebook-button');
const googleButton = document.getElementById('google-button')

//Errores registro y logueo
let adviceEmailRegister = document.getElementById('advice-emailRegister');
let advicePasswordRegister = document.getElementById('advice-passwordRegister');
let errorEmail = document.getElementById('error-email');
let errorPassword = document.getElementById('error-password');

// MOSTRAR  FORM REGISTRO
createUser.addEventListener('click', showRegisterForm);
// REGRESAR A LOGIN DESDE REGISTRO
backButton.addEventListener('click', backToLogin);
//REGISTRO POR CORREO
registerButton.addEventListener('click', registerWithFirebase);
// //LOGOUT
// logoutButton.addEventListener('click', logoutWithFirebase);
//LOGIN POR CORREO
loginButton.addEventListener('click', loginWithFirebase);
//LOGIN POR FACEBOOK
facebookButton.addEventListener('click', facebookLoginWithFirebase);
//LOGIN POR GOOGLE
googleButton.addEventListener('click', googleLoginWithFirebase);