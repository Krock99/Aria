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

function send(users, request) {
    fetch('http://localhost:3000/api/auth/' + request, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: users,
    })
        .then(response => response.json())
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

function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    if (email == '' || password == '' || password2 == '') {
        alert('Merci de remplir tous les champs');
    } else {
        if (password != password2) {
            alert('Les mots de passe ne correspondent pas');
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
