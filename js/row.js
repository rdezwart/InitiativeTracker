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


function refreshTable() {
    calcRowNums();
    calcRowActive();
}

$(function () {
    refreshTable();
});
