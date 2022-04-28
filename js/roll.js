// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Rolls RPG dice based on input string
function roll(dice = "1d20") {
    let arr = dice.split("d", 2);

    if (arr[0] === "") {
        arr[0] = "1";
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i]);
    }

    let numDice = arr[0];
    let diceVal = arr[1];
    let sum = 0;

    for (let i = 0; i < numDice; i++) {
        let roll = getRandomIntInclusive(1, diceVal);
        sum += roll;
    }

    return sum;
}
