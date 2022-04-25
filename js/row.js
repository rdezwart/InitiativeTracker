function calcRowNums() {
    // Loop through each row in table body
    $("table tbody tr").each(function (i) {
        // Fill in row number
        $(this).children().eq(0).html(i);
    })
}


function refreshTable() {
    calcRowNums();
}

$(function () {
    refreshTable();
});
