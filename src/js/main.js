// DOM
//Llamando modal
const callModalRegister = document.getElementById('call-modal-register');
const callModalLogin = document.getElementById('call-modal-login');
//Login modal botones
const cancelButton = document.getElementById('cancel-button');
const xButton = document.getElementById('x-button');

const mail = document.getElementById('email');
const password = document.getElementById('password');
const loginButton = document.getElementById('login-btn');

//Register modal botones
const cancelRegButton = document.getElementById('register-cancel-button');
const xRegButton = document.getElementById('x-register-button');

const registerEmail = document.getElementById('email-register');
const passwordRegister= document.getElementById('password-register');
const registerButton= document.getElementById('register-button');

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

















