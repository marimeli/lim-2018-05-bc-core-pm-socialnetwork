// DOM
//Llamando modal
const callModalRegister = document.getElementById('call-modal-register');
const callModalLogin = document.getElementById('call-modal-login');
//Login modal botones
const cancelButton = document.getElementById('cancel-button');
const xButton = document.getElementById('x-button');

const mail = document.getElementById('email');
const errorEmail = document.getElementById('error-email')
const password = document.getElementById('password');
const errorPassword = document.getElementById('error-password');
const loginButton = document.getElementById('login-btn');
const FacebookButton = document.getElementById('login-btn');
const GoogleButton = document.getElementById('login-btn');

//Register modal botones
const cancelRegButton = document.getElementById('register-cancel-button');
const xRegButton = document.getElementById('x-register-button');

const emailRegister = document.getElementById('email-register');
const adviceEmailRegister = document.getElementById('advice-emailRegister');
const passwordRegister= document.getElementById('password-register');
const advicePasswordRegister = document.getElementById('advice-passwordRegister');


const registerButton= document.getElementById('register-button');

loginButton.addEventListener('click', loginWithFirebase);

// FUNCIONES MODALES
//Login
const showModal = () => {
  document.getElementById('loginModal').style.display = 'block';
}

const dontShowModal = () => {
  document.getElementById('loginModal').style.display = 'none';
}

const xButtonClose = () => {
  document.getElementById('loginModal').style.display = 'none';
}

//Registro
const showModalRegister = () => {
  document.getElementById('registerModal').style.display = 'block';
}
const dontShowModalRegister = () => {
  document.getElementById('registerModal').style.display = 'none';
}
const xButtonCloseRegister = () => {
  document.getElementById('registerModal').style.display = 'none';
}

// LLAMADOS
// Modal login
callModalLogin.addEventListener('click', showModal);
cancelButton.addEventListener('click', dontShowModal);
xButton.addEventListener('click', xButtonClose);
//Modal register 
callModalRegister.addEventListener('click', showModalRegister);
cancelRegButton.addEventListener('click', dontShowModalRegister);
xRegButton.addEventListener('click', xButtonCloseRegister);

//Registro
registerButton.addEventListener('click', registerWithFirebase);

//Login con Email
