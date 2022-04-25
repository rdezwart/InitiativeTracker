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

function refreshTable() {
    calcRowNums();
    calcRowActive();
    calcRowColours();
}

$(function () {
    refreshTable();
});
