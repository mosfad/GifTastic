//make a call to giphy to output 10 GIFs with "streetfighter" in it's description
var topics = ["Street fighter 2", "Mario Kart", "Mortal Kombat 2", "tekken", "GoldenEye 007"]
var APIKEY = "wapsxKzf4544rsNgy4nnEgULiXvzYfMK";
//var queryTerm = topics[1];
var queryTerm = "Eddie Murphy";
var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + queryTerm + "&api_key=" + APIKEY + "&limit=5");
xhr.done(function(response) { 
    console.log("success got data", response); 
    console.log("This is the embed urls: " + response.data[0].embed_url);
    console.log("The ratings for this GIF is " + response.data[0].rating);
    //put the GIF in an image tag.
    var imageGif = $("<img>");
    imageGif.attr("src", response.data[0].images.original.url);
    imageGif.attr("alt", "GIF is not loading")
    $("#topic-container").append(imageGif);

});


