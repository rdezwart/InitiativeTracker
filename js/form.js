// Updates the deleteRow form with the appropriate values
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
    // Update deleteRow form maximum value to be in range
    updateMaxIndex();
    let deleteIndex = $("#deleteIndex");
    deleteIndex.val(deleteIndex.attr("max"));

    // ---- Button Listeners ---- //

    // When clicked, make rolls for all table rows, update visuals, then calculate totals
    $("#rollButton").click(function () {
        rollRows();
        refreshTable();
        updateTotals();
    });

    // When clicked, sort the table and update indexes
    $("#sortButton").click(function () {
        sortTable();
        calcRowNums();
    });

    // When clicked, trigger both other buttons
    $("#bothButton").click(function () {
        rollRows();
        refreshTable();
        updateTotals();
        sortTable();
        calcRowNums();
    });

    // ---- Form Listeners ---- //

    // When submitted, stop submission, then add new table row with form data
    $("#charForm").submit(function (e) {
        e.preventDefault();
        // https://stackoverflow.com/a/24012884
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
    });

    // When submitted, stop submission, then remove specified row from table
    $("#deleteForm").submit(function (e) {
        e.preventDefault();
        // https://stackoverflow.com/a/24012884
        let data = $(this).serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        // Index has already been verified as within range
        $("#charTable tbody tr").eq(data["index"]).remove();
        refreshTable();
        updateMaxIndex();
    });
})
