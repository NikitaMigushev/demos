$("document").ready(function () {

  // Create getRandom function

  function getRandomNumber() {

    var result = Math.floor(Math.random() * 501);
    return result;
  }

  // Flickr public API

  var flickrApi = "https://www.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

  // Create randomTags. Random words are in randomwords.js file

  var randomTags = '"' + randomWords[getRandomNumber()] + '"' + "," +
    '"' + randomWords[getRandomNumber()] + '"' + "," +
    '"' + randomWords[getRandomNumber()] + '"' + "," +
    '"' + randomWords[getRandomNumber()] + '"' + "," +
    '"' + randomWords[getRandomNumber()] + '"'

  //Discliamer of what tags have been chosed

  $(".randomTags").append("Here are some pictures with following tags: " + randomTags);

  console.log(randomTags);

  // Get json objects through FlickrAPI

  $.getJSON(flickrApi, {
    //options
    tags: randomTags,
    tagmode: "any",
    format: "json"

  }).done(function (data) {
    //if success
    console.log(data);

    //parse through items and create img tags in html
    $.each(data.items, function (index, item) {

      console.log(item)
      $("<img>").attr({
        src: item.media.m,
        title: "Title: " + item.title + " " + "Author: " + item.author + " " + "Tags: " + item.tags

      }).appendTo(".flickr");
    });
  }).fail(function () {
    //if fail

    alert("Ajax call failed.");

  })

}); // end document.ready