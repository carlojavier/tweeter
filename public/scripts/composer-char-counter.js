$(document).ready(function() {
    
    var totalCharacters = 140;
    $('textarea').on('input', function() {
        var length = $(this).val().length;
        length = totalCharacters - length;
        $('.counter').text(length);

        if (length < 0) {
            $('.counter').css('color', 'red');
        }
    });
});