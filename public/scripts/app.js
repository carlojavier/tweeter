/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
    // --- our code goes here ---
    console.log("ready!");

function createTweetElement(tweets) {
    const user = $("<article>").addClass("tweet-content");
    const header = $("<header>")
        .addClass("tweet-header")
        .appendTo(user);
    $('<img>')
        .addClass("logo")
        .attr("src" , tweets.user.avatars.small)
        .appendTo(header);
    $('<p>')
        .text(tweets.user.handle)
        .appendTo(header);
    $('<h2>')
        .text(tweets.user.name)
        .appendTo(header);
    $('<p>')
        .text(tweets.content.text)
        .appendTo(user);
    $('<footer>')
        .addClass("tweet-bottom")
        .text(tweets.created_at)
        .appendTo(user);
        
return user;
}

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
    "user": {
        "name": "Newton",
        "avatars": {
            "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
    },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
}

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('.tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});