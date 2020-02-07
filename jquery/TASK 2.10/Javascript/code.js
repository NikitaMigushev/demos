$("document").ready(function () {


    //Make ul sortable and connect with each other in order to drag and drop

    $(".to-do-tasks ul").sortable({
        connectWith: ".connectedSortable ul"
    });
    $(".in-progress-tasks ul").sortable({
        connectWith: ".connectedSortable ul"
    });
    $(".done-tasks ul").sortable({
        connectWith: ".connectedSortable ul"
    });

    //When click Add new task - display AddTask text area

    $(".addTaskDiv").click(function () {
        $(".addTaskDiv").hide()
        $(".textAreaDiv").show()
        $("#addTaskArea").focus()

    })

    //When cancel while adding Task hide add task text area and clear text area

    $(".cancelIcon").click(function () {
        $("#addTaskArea").val('')
        $(".textAreaDiv").hide()
        $(".addTaskDiv").show()

    })


    //Add New Task Button

    $(".addTaskButton").click(function () {
        if (!$("#addTaskArea").val()) {
            return false
        } else {
            $(".to-do-tasks ul").append("<li class='task'>" + $("#addTaskArea").val() + "<i class='far fa-trash-alt'></i></li>")
            $("#addTaskArea").val('')
            $(".textAreaDiv").hide()
            $(".addTaskDiv").show()
        }
    })

    //When press Enter - Add Task

    $('#addTaskArea').keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13' && !$("#addTaskArea").val()) {
            return false
        } else if (keycode == '13') {
            $(".to-do-tasks ul").append("<li class='task'>" + $("#addTaskArea").val() + "<i class='far fa-trash-alt'></i></li>")
            $("#addTaskArea").val('')
            $(".textAreaDiv").hide()
            $(".addTaskDiv").show()
        } else {

        }
    });

    //Delete Task

    $(document).on('click', '.task i', function () {
        var p = $(this).parent();
        p.remove();
    })

}); // end document.ready