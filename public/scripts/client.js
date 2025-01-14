/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

//formats the tweet and returns the html
let createTweetElement = (tweet) => {
    //escape the tweet text
    let $newTweet = `<article class="tweet">
        <header>
            <span class="tweet-author">
                <img src="${tweet.user.avatars}" />
                ${tweet.user.name}
            </span>
            <h2>${tweet.user.handle}</h2>
        </header>
        <div class="tweet-body">
            <p>
               ${escape(tweet.content.text)}
            </p>
        </div>
        <footer>
            <div>
                <span class="time-since-t">
                    ${timeago.format(new Date(tweet.created_at))}
                </span>
            </div>
            <div class="tweet-foot-icons">
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
            </div>
        </footer>
    </article>`;
    return $newTweet;
};

//render all the tweets
const renderTweets = function (tweets) {
    //order the tweets by date
    tweets.sort(function (tweetA, tweetB) {
        return new Date(tweetB.created_at) - new Date(tweetA.created_at);
    });

    // loops through tweets
    for (let i = 0; i < tweets.length; i++) {
        //calls createTweetElement to format each tweet and append to the the tweets container
        $("#tweets-container").append(createTweetElement(tweets[i]));
    }
};

//load the tweets from the api
const loadTweets = function () {
    // get the tweets from the server
    $.get("/tweets", function (data) {
        console.log(data);
        // render the tweets
        renderTweets(data);
    });
};

//add new tweet to the dom
const newTweet = function () {
    //get the tweets  from the textarea
    $.get("/tweets", function (tweets) {
        //order the tweets by date
        tweets.sort(function (tweetA, tweetB) {
            return new Date(tweetB.created_at) - new Date(tweetA.created_at);
        });

        //prepend the new tweet to the tweets container
        $("#tweets-container").prepend(createTweetElement(tweets[0]));
    });
};

//wait for the document to be ready before running any jQuery functions
$(document).ready(() => {
    //load the tweets from the server
    loadTweets();

    //get the form
    const $form = $(".new-tweet form");

    // event listener on form submission
    $form.on("submit", function (event) {
        //prevent default form submission
        event.preventDefault();

        //flag for validation
        let valid = true;

        //get the tweet text from the textarea
        let $tweetText = $("#tweet-text");

        //hide the error message
        $(".form-error p").hide(200, "linear");

        //validate the tweet text
        //check if the tweet is empty or too long
        if (
            $tweetText.val() === undefined ||
            $tweetText.val() === null ||
            $tweetText.val() === "" ||
            $tweetText.val().length === 0
        ) {
            $(".form-error p").text(
                "The tweet box cannot be empty, try typing something into it!"
            );
            valid = false;
            $(".form-error p").show(200, "linear");
        } else if ($tweetText.val().length > 140) {
            $(".form-error p").text(
                "Your tweet is too long. Try something 140 chars or less!"
            );
            $(".form-error p").show(200, "linear");
            valid = false;
        }

        //if the tweet is valid, send it to the server
        if (valid) {
            //serialize the form data
            let data = $form.serialize();

            //make a post request to the server
            $.ajax({
                type: "POST",
                url: "/tweets/",
                dataType: "json",
                data: data,
                complete: function (data) {
                    //get status code
                    let status = data.status;
                    //if status is 201, then the tweet was created successfully
                    if (status === 201) {
                        //clear out the form data
                        $tweetText.val("");
                        //add the new tweet to the dom
                        newTweet();

                        //reset the counter
                        $("#tweet-text")
                            .siblings("div")
                            .children("output")
                            .text(140);
                    } else {
                        //print error message to console
                        console.error("Error With AJAX POST Request:", data);

                        //show user there was an error
                        $(".form-error p").text(
                            "Something went Wrong, Check the console for more details!"
                        );
                        $(".form-error").show(200, "linear");
                    }
                },
            });
        }
    });

    //click event on the new tweet button
    $(".right-nav").on("click", function () {
        //toggle the new tweet form
        $(".new-tweet").toggle(300, "linear");
        $("#tweet-text").focus();
    });

    //check if scrolling
    $(window).scroll(function () {
        //if moving down show icon
        if ($(window).scrollTop() > 20) {
            $(".icon-scroll-up").show(100, "linear");
        } else {
            $(".icon-scroll-up").hide(100, "linear");
        }
    });

    //scroll back to top when scroll up icon is clicked
    $(".icon-scroll-up").on("click", function () {
        $("html, body").animate(
            {
                scrollTop: 0,
            },
            500,
            "linear"
        );
    });
});
