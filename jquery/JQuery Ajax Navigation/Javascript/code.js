$("document").ready(function () {

  //Ajax page load

  $("#page").load("pages.html #home");

  $("nav ul li a").click(function () {

    $("#page").load("pages.html #" + $(this).attr("href"));
    return false;

  });

});