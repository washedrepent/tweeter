$(document).ready(function () {
    //count the number of characters in the textarea
    $("#tweet-text").keydown(function () {
        let input = $(this);
        let counter = input.siblings("div").children("output");

        let text_length = input.val().length;

        //if the length of the text is greater than 140 characters add invalid class
        if (text_length > 140) {
            counter.addClass("invalid");
        } else {
            //remove invalid class if the length is less than 140
            counter.removeClass("invalid");
        }

        //calculate the remaining characters
        counter.text(140 - text_length);
    });
});
