$("document").ready(function () {

  //Ajax page load

  $("nav ul li a").click(function () {

    $("#page").load("pages.html #" + $(this).attr("href"));
    return false;

  });
  
});