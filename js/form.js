// Event listener
$("#rollButton").click(function () {
    rollRows();
    refreshTable();
    updateTotals();
});

$("#sortButton").click(function () {
    sortTable();
    calcRowNums();
});

$("#bothButton").click(function () {
    rollRows();
    refreshTable();
    updateTotals();
    sortTable();
    calcRowNums();
});

$(function () {
    $("#charForm").submit(function (e) {
        e.preventDefault();
        let data = $(this).serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        console.log(data);
    });
})