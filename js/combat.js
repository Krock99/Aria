function startCombat() {
    // On cache la phrase de game over pour le cas où on relance un Nième combat
    document.getElementById('win').style.display = 'none';
    document.getElementById('lose').style.display = 'none';

    // On récupère les informations du joueur à partir du formulaire
    playerEndurance = document.getElementById('playerEndurance').value;
    playerSkill = document.getElementById('playerSkill').value;
    playerAttackBonus = document.getElementById('playerAttackBonus').value;
    enemyEndurance = document.getElementById('enemyEndurance').value;
    enemySkill = document.getElementById('enemySkill').value;
    enemyName = document.getElementById('enemyName').value;

    // On définit les variables pour les forces d'attaque
    let enemyAttack;
    let playerAttack;

    // On lance les dés pour l'ennemi et on calcule sa force d'attaque
    let enemyDice1 = Math.floor(Math.random() * 6) + 1;
    let enemyDice2 = Math.floor(Math.random() * 6) + 1;
    enemyAttack =
        parseInt(enemyDice1) + parseInt(enemyDice2) + parseInt(enemySkill);

    // On lance les dés pour le joueur et on calcule sa force d'attaque
    let playerDice1 = Math.floor(Math.random() * 6) + 1;
    let playerDice2 = Math.floor(Math.random() * 6) + 1;
    playerAttack =
        parseInt(playerDice1) +
        parseInt(playerDice2) +
        parseInt(playerSkill) +
        parseInt(playerAttackBonus);

    // On compare les forces d'attaque et on met à jour les points de vie en conséquence
    if (playerAttack > enemyAttack) {
        enemyEndurance -= 2;
        damageTaken = 'Votre adversaire perd 2 points de vie.';
    } else if (playerAttack < enemyAttack) {
        playerEndurance -= 2;
        damageTaken = 'Vous perdez 2 points de vie.';
    } else {
        damageTaken = 'Aucun des joueurs ne perd de point de vie.';
    }

    document.getElementById('enemy-attack').innerHTML = enemyAttack;
    document.getElementById('player-attack').innerHTML = playerAttack;
    document.getElementById('damage-taken').innerHTML = damageTaken;
    document.getElementById('enemy-endurance').innerHTML = enemyEndurance;
    document.getElementById('enemy-name-attack').innerHTML = enemyName;
    document.getElementById('enemy-name-life').innerHTML = enemyName;
    document.getElementById('player-endurance').innerHTML = playerEndurance;
    document.getElementById('combat-results').style.display = 'block';
    document.getElementById('nextButton').style.display = 'block';

    if (enemyEndurance <= 0) {
        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('combat-results').style.display = 'block';
        document.getElementById('win').style.display = 'block';
    }
    if (playerEndurance <= 0) {
        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('combat-results').style.display = 'block';
        document.getElementById('lose').style.display = 'block';
    }
}

function nextTurn() {
    // On définit les variables pour les forces d'attaque
    let enemyAttack;
    let playerAttack;

    // On lance les dés pour l'ennemi et on calcule sa force d'attaque
    let enemyDice1 = Math.floor(Math.random() * 6) + 1;
    let enemyDice2 = Math.floor(Math.random() * 6) + 1;
    enemyAttack =
        parseInt(enemyDice1) + parseInt(enemyDice2) + parseInt(enemySkill);

    // On lance les dés pour le joueur et on calcule sa force d'attaque
    let playerDice1 = Math.floor(Math.random() * 6) + 1;
    let playerDice2 = Math.floor(Math.random() * 6) + 1;
    playerAttack =
        parseInt(playerDice1) +
        parseInt(playerDice2) +
        parseInt(playerSkill) +
        parseInt(playerAttackBonus);

    // On compare les forces d'attaque et on met à jour les points de vie en conséquence
    if (playerAttack > enemyAttack) {
        enemyEndurance -= 2;
        damageTaken = 'Votre adversaire perd 2 points de vie.';
    } else if (playerAttack < enemyAttack) {
        playerEndurance -= 2;
        damageTaken = 'Vous perdez 2 points de vie.';
    } else {
        damageTaken = 'Aucun des joueurs ne perd de point de vie.';
    }

    document.getElementById('enemy-attack').innerHTML = enemyAttack;
    document.getElementById('player-attack').innerHTML = playerAttack;
    document.getElementById('damage-taken').innerHTML = damageTaken;
    document.getElementById('enemy-endurance').innerHTML = enemyEndurance;
    document.getElementById('enemy-name-attack').innerHTML = enemyName;
    document.getElementById('enemy-name-life').innerHTML = enemyName;
    document.getElementById('player-endurance').innerHTML = playerEndurance;
    document.getElementById('combat-results').style.display = 'block';

    if (enemyEndurance <= 0) {
        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('combat-results').style.display = 'block';
        document.getElementById('win').style.display = 'block';
    }
    if (playerEndurance <= 0) {
        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('combat-results').style.display = 'block';
        document.getElementById('lose').style.display = 'block';
    }
}
