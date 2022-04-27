function updateMaxIndex() {
    let numRows = $("#charTable tbody tr").length;
    let deleteIndex = $("#deleteIndex");
    let deleteButton = $("#deleteButton");

    let rollButton = $("#rollButton");
    let sortButton = $("#sortButton");
    let bothButton = $("#bothButton");

    if (numRows === 0) {
        deleteIndex.prop("disabled", true);
        deleteButton.prop("disabled", true);

        rollButton.prop("disabled", true);
        sortButton.prop("disabled", true);
        bothButton.prop("disabled", true);
    } else {
        deleteIndex.attr("max", numRows - 1);

        deleteIndex.prop("disabled", false);
        deleteButton.prop("disabled", false);

        rollButton.prop("disabled", false);
        sortButton.prop("disabled", false);
        bothButton.prop("disabled", false);
    }

    if (deleteIndex.val() > deleteIndex.attr("max")) {
        deleteIndex.val(deleteIndex.val() - 1);
    }
}

// Driver
$(function () {
    updateMaxIndex();

    let deleteIndex = $("#deleteIndex");
    deleteIndex.val(deleteIndex.attr("max"));

    // Button listeners

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

    // Form listeners

    $("#charForm").submit(function (e) {
        e.preventDefault();
        let data = $(this).serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        $("#charTable > tbody:last-child").append(
            "<tr>" +
            "<th scope='row'></th>" +
            "<td>" + data["name"] + "</td>" +
            "<td></td>" +
            "<td></td>" +
            "<td>" + (parseInt(data["bonus"]) < 0 ? "" : "+") + data["bonus"] + "</td>" +
            "<td>" + data["type"] + "</td>" +
            "<td></td>" +
            "</tr>"
        );

        refreshTable();
        updateMaxIndex();
        // console.log(data);
    });

    $("#deleteForm").submit(function (e) {
        e.preventDefault();
        let data = $(this).serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        // console.log(data);

        $("#charTable tbody tr").eq(data["index"]).remove();
        refreshTable();
        updateMaxIndex();
    });
})
