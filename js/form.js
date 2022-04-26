// Event listener
$("#rollButton").click(function () {
    rollRows();
    refreshTable();
});

$("#sortButton").click(function() {
    refreshTable();
    sortTable();
    calcRowNums();
});

$("#bothButton").click(function() {
    rollRows();
    refreshTable();
    sortTable();
    calcRowNums();
});