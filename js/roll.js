// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function roll(dice = "1d20", bonus = 0) {
    let arr = dice.split("d", 2);

    if (arr[0] === "") {
        arr[0] = "1";
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i]);
    }
    // console.log(arr);

    let numDice = arr[0];
    let diceVal = arr[1];
    let sum = 0;

    for (let i = 0; i < numDice; i++) {
        let roll = getRandomIntInclusive(1, diceVal);
        console.log(roll);
        sum += roll;
    }

    return sum + bonus;
}

$(function () {
    // for (let i = 0; i < 10; i++) {
    //     console.log(roll("1d20"));
    // }

    // console.log(roll("d20"));

    // console.log(roll("3d6"));

    console.log(roll("1d20", 4));
});