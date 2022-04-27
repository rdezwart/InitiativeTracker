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
        let total = children.eq(6);

        dice1.removeClass("table-active").removeAttr("class");
        dice2.removeClass("table-active").removeAttr("class");
        total.removeClass("table-active").removeAttr("class");

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

        if (dice1.html() === "") {
            dice1.removeClass("table-active").removeAttr("class");
        }
        if (dice2.html() === "") {
            dice2.removeClass("table-active").removeAttr("class");
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
    let rows = $("#charTable tbody tr");

    rows.sort(function (a, b) {
        let aRow = $(a).children();
        let bRow = $(b).children();

        let aTotal = aRow.eq(6);
        let bTotal = bRow.eq(6);

        let aTotalInt = parseInt(aTotal.html());
        let bTotalInt = parseInt(bTotal.html());

        let aCompare = aTotalInt;
        let bCompare = bTotalInt;

        if (aCompare === bCompare) {
            let aBonusInt = parseInt(aRow.eq(4).html());
            let bBonusInt = parseInt(bRow.eq(4).html());

            aCompare = aTotalInt + aBonusInt;
            bCompare = bTotalInt + bBonusInt;

            if (aCompare === bCompare) {
                let aRoll = roll();
                let bRoll = roll();

                let aTotalSplit = aTotal.html().split(".", 2);
                let bTotalSplit = bTotal.html().split(".", 2);

                if (aTotalSplit.length === 2) {
                    aRoll = parseInt(aTotalSplit[1]);
                }
                if (bTotalSplit.length === 2) {
                    bRoll = parseInt(bTotalSplit[1]);
                }

                while (aRoll === bRoll) {
                    aRoll = roll();
                    bRoll = roll();
                }

                aCompare = aTotalInt + aBonusInt + aRoll;
                bCompare = bTotalInt + bBonusInt + bRoll;

                aTotal.addClass("table-active");
                aTotal.html(aTotalInt + "." + aRoll);

                bTotal.addClass("table-active");
                bTotal.html(bTotalInt + "." + bRoll);
            }
        }

        if (aCompare < bCompare) {
            return 1;
        }
        if (aCompare > bCompare) {
            return -1;
        }
        return 0; // shouldn't ever hit this
    });

    $.each(rows, function (index, row) {
        $("table").children("tbody").append(row);
    })
}

// Use after modifying table data, recalculates everything
function refreshTable() {
    calcRowNums();
    calcRowActive();
    calcRowColours();
}

// Driver
$(function () {
    refreshTable();
    updateTotals();
});
