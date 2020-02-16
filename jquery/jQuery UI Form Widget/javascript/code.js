$("document").ready(function () {


    // Set up Datepicker
    $("#date").datepicker({
        dateFormat: "dd.mm.yy",
        changeYear: true,
        changeMonth: true,
        showButtonPanel: true,
        yearRange: "-100:+0"
    });

    // Set up radio buttins and checkboxes

    $(function () {
        $(".radio, .checkbox").checkboxradio({
            icon: false
        });
    });


    // Fixes Today button in the Calendar
    $.datepicker._gotoToday = function (id) {
        var target = $(id);
        var inst = this._getInst(target[0]);
        if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
            inst.selectedDay = inst.currentDay;
            inst.drawMonth = inst.selectedMonth = inst.currentMonth;
            inst.drawYear = inst.selectedYear = inst.currentYear;
        } else {
            var date = new Date();
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            // the below two lines are new
            this._setDateDatepicker(target, date);
            this._selectDate(id, this._getDateDatepicker(target));
        }
        this._notifyChange(inst);
        this._adjustDate(target);
    }

    // Set up Select Menu

    $(function () {
        $("#mealOptions").selectmenu();

    });

    $(function () {
        $("button").button({
            icon: "ui-icon-circle-arrow-e",
            iconPosition: "end"

        });

    });

});