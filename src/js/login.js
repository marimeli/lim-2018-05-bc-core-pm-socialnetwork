/* Almacenando las variables para la selección de DOM */

//Llamando modal
const callModalRegister = document.getElementById('call-modal-register');
const callModalLogin = document.getElementById('call-modal-login');

//Llamando modal NAVBAR
const callModalRegisterNavbar = document.getElementById('navbar-call-modal-register');
const callModalLoginNavbar = document.getElementById('navbar-call-modal-login');

//Login modal botones
const cancelButton = document.getElementById('cancel-button');
const xButton = document.getElementById('x-button');

const mail = document.getElementById('email');
const errorEmail = document.getElementById('error-email')
const password = document.getElementById('password');
const errorPassword = document.getElementById('error-password');
const loginButton = document.getElementById('login-btn');
const facebookButton = document.getElementById('facebook-button');
const googleButton = document.getElementById('google-button');

//Register modal botones
const cancelRegButton = document.getElementById('register-cancel-button');
const xRegButton = document.getElementById('x-register-button');

const emailRegister = document.getElementById('email-register');
const adviceEmailRegister = document.getElementById('advice-emailRegister');
const passwordRegister = document.getElementById('password-register');
const advicePasswordRegister = document.getElementById('advice-passwordRegister');

const registerButton = document.getElementById('register-button');

/* FUNCIONES MODALES */

//Login
const showModal = () => {
    document.getElementById('loginModal').style.display = 'block';
};

const dontShowModal = () => {
    document.getElementById('loginModal').style.display = 'none';
};

const xButtonClose = () => {
    document.getElementById('loginModal').style.display = 'none';
};

//Register
const showModalRegister = () => {
    document.getElementById('registerModal').style.display = 'block';
};

const dontShowModalRegister = () => {
    document.getElementById('registerModal').style.display = 'none';
};

const xButtonCloseRegister = () => {
    document.getElementById('registerModal').style.display = 'none';
};


/* DOM EVENTS */

// Modal login
callModalLogin.addEventListener('click', showModal);
cancelButton.addEventListener('click', dontShowModal);
xButton.addEventListener('click', xButtonClose);

// Modal login navbar
callModalLoginNavbar.addEventListener('click', showModal);

//Modal register 
callModalRegister.addEventListener('click', showModalRegister);
cancelRegButton.addEventListener('click', dontShowModalRegister);
xRegButton.addEventListener('click', xButtonCloseRegister);

// Modal register navbar
callModalRegisterNavbar.addEventListener('click', showModalRegister);

//Register
registerButton.addEventListener('click', registerWithFirebase);

//Login Email
loginButton.addEventListener('click', loginWithFirebase);

//Login Facebook
facebookButton.addEventListener('click', facebookLoginWithFirebase);

//Login Google
googleButton.addEventListener('click', googleLoginWithFirebase);