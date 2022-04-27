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

$(function() {
    $("#charForm").submit(function(e) {
        e.preventDefault();
        let data = $(this).serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        console.log(data);
    });
})