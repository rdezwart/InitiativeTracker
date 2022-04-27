
// Driver
$(function () {
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
        // console.log(data);
    });
    });
})