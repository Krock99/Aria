// Get the modal
const modal1 = document.getElementById('id01');
const modal2 = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal1) {
        modal1.style.display = 'none';
    }
    if (event.target == modal2) {
        modal2.style.display = 'none';
    }
};

// Register

const emailRGEX = /^[\w-\.]+@([\w-]+\.)+[a-z]{2,}$/;
const passwordRGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailErrorMsg = document.getElementById('emailErrorMsg');
const passwordErrorMsg = document.getElementById('passwordErrorMsg');
const password2ErrorMsg = document.getElementById('password2ErrorMsg');
const bad_login = document.getElementById('bad_login');

function send(users, request) {
    fetch('http://localhost:3000/api/auth/' + request, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: users,
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            if (res.status === 401) {
                bad_login.innerText = 'Paire login/mot de passe incorrecte';
            }
        })
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert('Vous êtes maintenant connecté');
                window.location.href = './pages/fight.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Email verification
function validateEmail(email) {
    if (emailRGEX.test(email)) {
        emailErrorMsg.innerText = '';
        return true;
    } else {
        return false;
    }
}

function validatePassword(password) {
    if (passwordRGEX.test(password)) {
        emailErrorMsg.innerText = '';
        return true;
    } else {
        return false;
    }
}

function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const emailField = validateEmail(email);
    const passwordField = validatePassword(password);

    if (emailField == false || passwordField == false) {
        if (emailField == false) {
            emailErrorMsg.innerText =
                "L'adresse email que tu as entré n'est pas valide";
        }
        if (passwordField == false) {
            passwordErrorMsg.innerText =
                'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre';
        }
        return;
    }

    if (email == '' || password == '' || password2 == '') {
        alert('Merci de remplir tous les champs');
    } else {
        if (password != password2) {
            password2ErrorMsg.innerText =
                'Les mots de passe ne correspondent pas';
        } else {
            const user = {
                email: email,
                password: password,
            };
            const users = JSON.stringify(user);
            send(users, 'signup');
        }
    }
}

function login() {
    const email = document.getElementById('email_login').value;
    const password = document.getElementById('password_login').value;

    if (email == '' || password == '') {
        alert('Merci de remplir tous les champs');
    } else {
        const user = {
            email: email,
            password: password,
        };
        const users = JSON.stringify(user);
        send(users, 'login');
    }
}
