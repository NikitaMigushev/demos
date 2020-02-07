$("document").ready(function () {


    $("#dialog").dialog({
        autoOpen: false,
        buttons: [{
            text: "Confirm",
            click: function () {
                
                $(this).dialog("close");
            }
        },
        {
            text: "Cancel",
            click: function () {
                $(this).dialog("close");
            }
        }
        ]
    });
    $("#openDlg").click(function () {
        $("#dialog").dialog("open");
    });


});