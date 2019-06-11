$(document).ready(function() {
    // --- our code goes here ---
    console.log("ready!");
    var totalCharacters = 140;
    $('textarea').on('input', function() {
        var length = $(this).val().length;
        var length = totalCharacters - length;
        $('.counter').text(length);
        console.log(this);
    });

});

// document.addEventListener("input", (event) => {
//     console.log(event);
// });
// $('textarea').on("input", function() {
//     console.log(this);
// });