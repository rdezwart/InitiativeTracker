// Loop through each row in table body and number it based on index
function calcRowNums() {
    $("table tbody tr").each(function (i) {
        $(this).children().eq(0).html(i);
    })
}

// Loop through each row in table body and highlight the active die based on roll type
function calcRowActive() {
    $("table tbody tr").each(function () {
        let curRow = $(this);
        let children = curRow.children();

        let dice1 = children.eq(2);
        let dice2 = children.eq(3);
        let rollType = children.eq(5);

        dice1.removeClass("table-active");
        dice2.removeClass("table-active");

        switch (rollType.html()) {
            case "Advantage":
                if (parseInt(dice1.html()) >= parseInt(dice2.html()))
                    dice1.addClass("table-active");
                else
                    dice2.addClass("table-active");
                break;

            case "Disadvantage":
                if (parseInt(dice1.html()) <= parseInt(dice2.html()))
                    dice1.addClass("table-active");
                else
                    dice2.addClass("table-active");
                break;

            default:
                dice1.addClass("table-active");
                break;
        }
    });
}

// Loop through all active dice and set the row colour to red or green, based on nat 1 or nat 20
function calcRowColours() {
    $(".table-active").each(function () {
        $(this).parent().removeClass("table-success table-danger").removeAttr("class");

        if ($(this).html() === "20") {
            $(this).parent().addClass("table-success");
        }
        if ($(this).html() === "1") {
            $(this).parent().addClass("table-danger");
        }
    });
}

// Loop through each row in table body and roll corresponding D20s for each, using roll type
function rollRows() {
    $("table tbody tr").each(function () {
        let curRow = $(this);
        let children = curRow.children();

        let dice1 = children.eq(2);
        let dice2 = children.eq(3);
        let rollType = children.eq(5);

        let res1 = roll();
        let res2 = roll();

        dice1.html(String(res1));

        if (rollType.html() === "Advantage") {
            dice2.html(String(res2));
        } else if (rollType.html() === "Disadvantage") {
            dice2.html(String(roll()));
        }
    });
}

// Loop through each row in table body and calculate active roll + bonus, then place result in last column
function updateTotals() {
    $("table tbody tr").each(function () {
        let curRow = $(this);
        let children = curRow.children();

        let active = curRow.children(".table-active");

        let bonus = children.eq(4);
        let rollType = children.eq(5);
        let result = children.eq(6);

        if (rollType.html() === "Advantage") {
            result.html(parseInt(active.html()) + parseInt(bonus.html()));
        } else if (rollType.html() === "Disadvantage") {
            result.html(parseInt(active.html()) + parseInt(bonus.html()));
        } else {
            result.html(parseInt(active.html()) + parseInt(bonus.html()));
        }
    });
}

function sortTable() {
    let rows = $("table tbody tr");

    rows.sort(function(a, b) {
        let aRow = $(a).children();
        let bRow = $(b).children();

        let aTotal = aRow.eq(6);
        let bTotal = bRow.eq(6);

        let aTotalInt = parseInt(aTotal.text());
        let bTotalInt = parseInt(bTotal.text());

        if (aTotalInt < bTotalInt) {
            return 1;
        }
        if (aTotalInt > bTotalInt) {
            return -1;
        }
        if (aTotalInt === bTotalInt) {
            let aBonusInt = parseInt(aRow.eq(4).text());
            let bBonusInt = parseInt(bRow.eq(4).text());

            if (aBonusInt < bBonusInt) {
                return 1;
            }
            if (aBonusInt > bBonusInt) {
                return -1;
            }
            if (aBonusInt === bBonusInt) {
                updateTotals();

                let aRoll = roll();
                let bRoll = roll();

                // console.log("Tiebreaker! a: " + aRoll + "  |  b: " + bRoll);
                aTotal.html(aTotal.html() + "." + aRoll);
                bTotal.html(bTotal.html() + "." + bRoll);

                while (aRoll === bRoll) {
                    aRoll = roll();
                    bRoll = roll();

                    // console.log("Rerolling! a: " + aRoll + "  |  b: " + bRoll);
                    aTotal.html(aTotal.html() + "." + aRoll);
                    bTotal.html(bTotal.html() + "." + bRoll);
                }

                aTotal.addClass("table-active");
                bTotal.addClass("table-active");

                if (aRoll < bRoll) {
                    return 1;
                }
                if (aRoll > bRoll) {
                    return -1;
                }
            }
        }
        return 0;
    });

    $.each(rows, function(index, row) {
        $("table").children("tbody").append(row);
    })
}

// Use after modifying table data, recalculates everything
function refreshTable() {
    calcRowNums();
    calcRowActive();
    calcRowColours();
    updateTotals();
}

// Driver
$(function () {
    refreshTable();
});
