function calcRows() {
    let rows = $(".rowNum");

    for (let i = 0; i < rows.length; i++) {
        rows.eq(i).html(i);
    }
}

$(function () {
    calcRows();
});
