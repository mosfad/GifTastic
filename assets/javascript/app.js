//make a call to giphy to output 10 GIFs with "streetfighter" in it's description
//create an an array of strings, each one related to a topic that interests you
$(document).ready(function() {
var topics = ["Street fighter 2", "Mario Kart", "Mortal Kombat 2", "tekken", "GoldenEye 007"];
var numGifs = 10;
var urlArray = [];
//create buttons for each topic in the array
function createButtons() {
    $("#buttons-container").empty();
    for (var i = 0; i < topics.length; i++){
        var newButton = $("<button>");
        newButton.addClass("button-topics");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        console.log(newButton.text());
        $("#buttons-container").append(newButton); //WHY IS THIS CODE NOT APPENDING  TO THE buttons-container? HAD TO USE DOCUMENT.ONREADY TO FIX THIS ISSUE!
    }
    
}
//function adds url to html document.
function createImages(imgURL) {
    var imgTag = $("<img>");
    imgTag.attr("src", imgURL);
    imgTag.attr("alt", "GIF of......");
    $("#gif-container").append(imgTag);
    
}
//function populates url array for a topic
function displayGifs(objArray) {
    for (var i = 0; i < objArray.length; i++) {
        urlArray.push(objArray[i].images.original.url);
        //create image using each url.
        createImages(urlArray[i]);
    }
}
//function uses data from button topics to display 10 gifs
function grabGifs() {
    //get button data for used for the query phrase
    var buttonInfo = $(this).attr("data-name");
    //put together the various components of the url and make a "get" request.
    var APIKEY = "wapsxKzf4544rsNgy4nnEgULiXvzYfMK";
    var queryTerm = buttonInfo;
    var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + queryTerm + "&api_key=" + APIKEY + "&limit=" + numGifs);
    xhr.done(function(response) { 
    console.log("success got data", response); 
    //console.log("This is the embed urls: " + response.data[0].embed_url);
    console.log("The ratings for this GIF is " + response.data[0].rating);
    //put all the original URLs in an array=========================how do I animate a still gif when clicked++++++++++++++++++++++++++++++++++++++++++
    displayGifs(response.data);
    
    
    //put the GIFs in an image tag.
    /*var imageGif = $("<img>");
    imageGif.attr("src", response.data[0].images.original.url);
    imageGif.attr("alt", "GIF is not loading")
    $("#topic-container").append(imageGif);*/

})
}
createButtons();

//function handles button click event for each topic
$(".button-topics").on("click", grabGifs);
/*
//put together the various components of the url and make a "get" request.
var APIKEY = "wapsxKzf4544rsNgy4nnEgULiXvzYfMK";
var queryTerm = "Eddie Murphy";
var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + queryTerm + "&api_key=" + APIKEY + "&limit=5");
xhr.done(function(response) { 
    console.log("success got data", response); 
    //console.log("This is the embed urls: " + response.data[0].embed_url);
    console.log("The ratings for this GIF is " + response.data[0].rating);
    //put the GIF in an image tag.
    /*var imageGif = $("<img>");
    imageGif.attr("src", response.data[0].images.original.url);
    imageGif.attr("alt", "GIF is not loading")
    $("#topic-container").append(imageGif);*/

//});
})


