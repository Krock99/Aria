function rollDice() {
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    return diceRoll;
}

function randomStat() {
    let ability = rollDice() + 6;
    let stamina = rollDice() + rollDice() + 6;
    let luck = rollDice() + 6;
    document.getElementById('creation_ability').setAttribute('value', ability);
    document.getElementById('creation_stamina').setAttribute('value', stamina);
    document.getElementById('creation_luck').setAttribute('value', luck);
}

function send(characters) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    fetch('http://localhost:3000/api/character/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + accessToken,
        },
        body: characters,
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            if (res.status === 400) {
                alert('Erreur 400: Requête incorrecte');
            }
        })
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert('Personnage créé avec succès !');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const nameRGEX = /^[a-zA-Z0-9]{3,16}$/;
const abilityRGEX = /^([7-9]|1[012])$/g;
const staminaRGEX = /^([8-9]|1[0-8])$/g;
const luckRGEX = /^([7-9]|1[012])$/g;
const nameErrorMsg = document.getElementById('nameErrorMsg');
const abilityErrorMsg = document.getElementById('abilityErrorMsg');
const staminaErrorMsg = document.getElementById('staminaErrorMsg');
const luckErrorMsg = document.getElementById('luckErrorMsg');

// Name verification
function validateName(character_name) {
    if (nameRGEX.test(character_name)) {
        nameErrorMsg.innerText = '';
        return true;
    } else {
        return false;
    }
}

// Ability verification
function validateAbility(character_ability) {
    if (abilityRGEX.test(character_ability)) {
        abilityErrorMsg.innerText = '';
        return true;
    } else {
        return false;
    }
}

// Stamina verification
function validateStamina(character_stamina) {
    if (staminaRGEX.test(character_stamina)) {
        staminaErrorMsg.innerText = '';
        return true;
    } else {
        return false;
    }
}

// Luck verification
function validateLuck(character_luck) {
    if (luckRGEX.test(character_luck)) {
        luckErrorMsg.innerText = '';
        return true;
    } else {
        return false;
    }
}

function saveCharacter() {
    const character_name = document.getElementById('creation_name').value;
    const character_ability = document.getElementById('creation_ability').value;
    const character_stamina = document.getElementById('creation_stamina').value;
    const character_luck = document.getElementById('creation_luck').value;
    const nameField = validateName(character_name);
    const abilityField = validateAbility(character_ability);
    const staminaField = validateStamina(character_stamina);
    const luckField = validateLuck(character_luck);

    if (
        nameField == false ||
        abilityField == false ||
        staminaField == false ||
        luckField == false
    ) {
        if (nameField == false) {
            nameErrorMsg.innerText =
                'Le nom doit contenir entre 3 et 16 caractères.';
        }
        if (abilityField == false) {
            abilityErrorMsg.innerText =
                "L'habilité doit etre comprise entre 7 et 12 (1dé 6 + 6).";
        }
        if (staminaField == false) {
            staminaErrorMsg.innerText =
                "L'endurance doit etre comprise entre 8 et 18 (2dés 6 + 6).";
        }
        if (luckField == false) {
            luckErrorMsg.innerText =
                'La chance doit etre comprise entre 7 et 12 (1dé 6 + 6).';
        }
        return;
    }

    const character = {
        name: character_name,
        ability: character_ability,
        stamina: character_stamina,
        luck: character_luck,
    };
    const characters = JSON.stringify(character);
    send(characters);
}
