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
