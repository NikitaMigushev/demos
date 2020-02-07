$("document").ready(function () {

    $("#date").datepicker({
        dateFormat: "dd.mm.yy",
        changeYear: true,
        changeMonth: true,
        showButtonPanel: true,
        yearRange: "-100:+0"
    });

});