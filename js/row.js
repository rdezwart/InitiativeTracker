function calcRowNums() {
    // Loop through each row in table body
    $("table tbody tr").each(function (i) {
        // Fill in row number
        $(this).children().eq(0).html(i);
    })
}

function calcRowActive() {
    // Loop through each row in table body
    $("table tbody tr").each(function () {
        // Get all columns from this row
        let curRow = $(this);
        let children = curRow.children();

        // Get dice results and roll type
        let dice1 = children.eq(2);
        let dice2 = children.eq(3);
        let rollType = children.eq(5);

        dice1.removeClass("table-active");
        dice2.removeClass("table-active");

        // Highlight which roll was used
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

function calcRowColours() {
    // Loop through all active rolls and set row colour if nat 1 or nat 20
    $(".table-active").each(function() {
        $(this).parent().removeClass("table-success table-danger");

        if ($(this).html() === "20") {
            $(this).parent().addClass("table-success");
        }
        if ($(this).html() === "1") {
            $(this).parent().addClass("table-danger");
        }
    });
}

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

function updateTotals() {
    $("table tbody tr").each(function() {
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

function refreshTable() {
    calcRowNums();
    calcRowActive();
    updateTotals();
    calcRowColours();
}

$(function () {
    refreshTable();
});
