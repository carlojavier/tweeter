/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // --- our code goes here ---
  console.log("ready!");

  function renderTweets(tweets) {
    tweets.forEach((tweet, i) => {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').append($tweet);
    });
  }

  function createTweetElement({ user, content, created_at }) {
    const tweet = $("<article>").addClass("tweet-content");
    const header = $("<header>")
      .addClass("tweet-header")
      .appendTo(tweet);
    $('<img>')
      .addClass("logo")
      .attr("src", user.avatars.small)
      .appendTo(header);
    $('<p>')
      .text(user.handle)
      .appendTo(header);
    $('<h2>')
      .text(user.name)
      .appendTo(header);
    $('<p>')
      .text(content.text)
      .appendTo(tweet);
    $('<footer>')
      .addClass("tweet-bottom")
      .text(created_at)
      .appendTo(tweet);
    //     //
    return tweet;
  }

  function loadTweets() {
      $.get("/tweets")
      .then((data) => {
        renderTweets(data)
      })
  }
  loadTweets();

  $('#sentTweet').on('submit', (event) => {
    event.preventDefault();
    const $text = $('textarea').val().length
    if ($text === 0) {
      alert("umm, say something?")
    } else if ($text > 140 ) {
      alert("keep it under 140 please.")
    } else {
      $.post(`/tweets`, $('#sentTweet').serialize(), (newTweet) => {
        loadTweets(newTweet);
      })
    }

  })

})