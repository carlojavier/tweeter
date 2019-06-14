/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // --- our code goes here ---
  console.log("ready!");
  $('.new-tweet').slideToggle()
  $('.error-message').slideToggle()
  
  function renderTweets(tweets) {
    tweets.forEach((tweet, i) => {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
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
      .text(moment(created_at).fromNow())
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
    if ($text === 0 || $text > 140) {
      $('.error-message').slideDown();
    } else {
      $('.error-message').slideUp();
      $.post(`/tweets`, $('#sentTweet').serialize(), (newTweet) => {
        loadTweets(newTweet);
        $('textarea').val('');
      })
    }  
  })

  $('.compose').click(function() {
    console.log("click");
    $('.new-tweet').slideToggle()
    $('.textarea').focus();
  });

})