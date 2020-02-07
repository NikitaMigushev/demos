$("document").ready(function () {

        $( function() {
            $("#sortable").sortable();
        $( "#sortable" ).disableSelection();
      } );

    $('#addTask').click(function() {
      $('#sortable').prepend('<li class="ui-state-default blue">New Task</li>')
    })
 
});