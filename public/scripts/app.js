/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  
  $('.new-tweet').slideToggle()
  $('.error-message').slideToggle()
  
  function renderTweets(tweets) {
    tweets.forEach((tweet, i) => {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
    });
  }

  function createTweetElement({ user, content, created_at }) {
    const tweet = $('<article>').addClass('tweet-content');
    const header = $('<header>')
      .addClass('tweet-header')
      .appendTo(tweet);
    $('<img>')
      .addClass('logo')
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
    const footer = $('<footer>')
      .addClass('tweet-bottom')
      .text(moment(created_at).fromNow())
      .addClass('icons')
      .appendTo(tweet);
    const icons =  $('<div>')
      .addClass('icons')
      .appendTo(footer);
      $('<i>')
      .addClass('fas fa-flag')
      .appendTo(icons);
      $('<i>')
      .addClass('fas fa-retweet')
      .appendTo(icons);
      $('<i>')
      .addClass('fas fa-heart')
      .appendTo(icons);
  
    return tweet;
  }

  function loadTweets() {
      $.get('/tweets')
      .then((data) => {
        renderTweets(data)
      })
  }
  loadTweets();

  $('#sentTweet').on('submit', (event) => {
    event.preventDefault();
    const $form = $(event.target);
    const $textarea = $form.find('textarea');
    const $counter = $form.find('.counter');
    const textLength = $textarea.val().length
    const $errorMessage = $('.error-message');
    if (textLength === 0 || textLength > 140) {
      $errorMessage.slideDown();
    } else {
      $errorMessage.slideUp();
      $.post(`/tweets`, $form.serialize(), (newTweet) => {
        loadTweets(newTweet);
        $textarea.val('');
        $counter.text(140);
      });
    }  
  });
  $('.compose').click(function() {
    console.log("click");
    $('.new-tweet').slideToggle()
    $('.textarea').focus();
  });
});