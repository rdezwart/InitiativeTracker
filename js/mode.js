// Driver
$(function () {
    // When clicked, toggle dark mode
    // On page load, update switch with current theme
    $("#toggleSwitch").change(function() {
        darkmode.toggleDarkMode();
    }).prop("checked", darkmode.inDarkMode);
});
