//create an an array of strings, each one related to a topic that interests you
$(document).ready(function() {
var topics = ["Street fighter 2", "Mario Kart", "Mortal Kombat 2", "tekken", "NBA Jam", "Madden NFL 18", "Assassin's Creed Rogue"];
var numGifs = 10;         
var urlArray = [];        //url for animated gifs
var urlArrayStill = [];   //url for still gifs
var prevButtonInfo = "";  //topic from previous button click(used to request more gifs).
//create buttons for each topic in the array

function createButtons() {
    //clear buttons to prevent repeating buttons.
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
function createImages(imgURL, ratingData, j) {
    var imgTag = $("<img>");
    var pRating = $("<p>");
    var divOneGif = $("<div>");
    divOneGif.attr("id", "gif-" + j);
    pRating.addClass("ratings-info");
    pRating.text("Rating: " + ratingData);
    imgTag.addClass("img-gifs");
    imgTag.attr("src", imgURL);
    imgTag.attr("alt", "GIF of......");
    imgTag.attr("width", "250");
    imgTag.attr("height", "150");
    //add rating and corresponding gif to their div.
    $(divOneGif).append(pRating);
    $(divOneGif).append(imgTag);
    //add div for each gif and rating to the gifs container
    $("#gifs-container").append(divOneGif);
}

//function populates url array for a topic
function displayGifs(objArray) {
    //empty url array for each new set of urls.
    urlArray = [];
    urlArrayStill = [];
    //loop through list of gifs 
    for (var i = 0; i < objArray.length; i++) {
        urlArrayStill.push(objArray[i].images.original_still.url);
        urlArray.push(objArray[i].images.original.url);
        createImages(urlArrayStill[i], objArray[i].rating, i);
        console.log(objArray[i].rating);
    }
}

//function uses data from button topics to display 10 gifs
function grabGifs(req) {
    //parameter is a reference from extra gif button click because $(this) reference won't work(undefined).
    console.log("click event happended......");
    //clear old gifs before processing button click
    $("#gifs-container").empty();
    //get button data for used for the query phrase
    var buttonInfo; 
    if (req === "add-gifs" ) {
        //get button info from last stored topic if user requested additional gifs.
        buttonInfo = prevButtonInfo;
        console.log("The previous button's topic is " + prevButtonInfo);
    }
    else {
        //get the button info from the topic button clicked by the user.
        buttonInfo = req; //MAKE CHANGE HERE BY REPLACING "this"!
        //keep numGifs at 10 except a user request was made
        numGifs = 10;
    }
    //store button click for future access, in case user requests more gifs.
    prevButtonInfo = buttonInfo;
    console.log("topic clicked: " + buttonInfo);
    console.log("previous topic clicked: " + prevButtonInfo);
    //put together the various components of the url and make a "get" request.
    var APIKEY = "wapsxKzf4544rsNgy4nnEgULiXvzYfMK";
    var queryTerm = buttonInfo;
    var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + queryTerm + "&api_key=" + APIKEY + "&limit=" + numGifs);
    xhr.done(function(response) { 
    console.log("success got data", response); 
    console.log(response.data.length);
    displayGifs(response.data);
    //change the color of the button clicked
    
})
}
createButtons();

//function handles click event to add a topic
$("#add-topic").on("click", function(event) {
    //prevent form from being submitted....
    event.preventDefault();
    //get the input text
    var newTopic = $("#topic-input").val().trim();
    //append new topic to the topics array
    topics.push(newTopic);
    //create and add button for this topic.
    createButtons();
    //how to clear input after adding button
    $("#topic-input").val("");
})

//function handles click events on any gif 
$(document).on("click", ".img-gifs", function() {
    //get the url of the image clicked
    var clickedUrl = $(this).attr("src");
    //animate gif, if clicked url is a still gif
    if (urlArrayStill.includes(clickedUrl)) {
        //get index of url inside the array
        var indexUrl = urlArrayStill.indexOf(clickedUrl);
        //use index of the URL to animate the gif
        $(this).attr("src", urlArray[indexUrl]);
    }
    else if (urlArray.includes(clickedUrl)) {
         //get index of url inside the array
         var indexUrl = urlArray.indexOf(clickedUrl);
         //use index of the URL to make the gif a still image
         $(this).attr("src", urlArrayStill[indexUrl]);
    }

})

//function handles a request click event to add more gifs.
$("#add-gifs").on("click", function(event) {
    event.preventDefault();
    numGifs = numGifs + 10;
    var idRequestButton = $(this).attr("id");
    console.log(idRequestButton);
    grabGifs(idRequestButton);
});

/*
$(".button-topics").hover(function() {//NOT WORKING AS EXPECTED!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    $(this).css("background-color", "#18548e");
}, function() {
    $(".button-topics").css("background-color", "#1e90ff");
}
)*/

//function handles click event get gifs for each topic; need to use event delegation for buttons that don't exist yet.
$(document).on("click", ".button-topics", function() {
    //reset color of inactive topics buttons
    $(".button-topics").css("background-color", "#1e90ff");
    //change color of clicked topic button 
    $(this).css("background-color", "#18548e");
    console.log($(this).attr("data-name") + "....... <checking clicks for add topic buttons.>");
    var dataName = $(this).attr("data-name");
    grabGifs(dataName);
})



})




