$(document).ready(function () {
    //count the number of characters in the textarea
    $("#tweet-text").keyup(function () {
        var input = $(this);
        var counter = input.siblings("div").children("output");

        var text_length = input.val().length;

        if (text_length > 140) {
            counter.addClass("invalid");
        } else {
            counter.removeClass("invalid");
        }

        counter.text(140 - text_length);
    });
});
