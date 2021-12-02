/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
let createTweetElement = (tweet) => {
    let $newTweet = `<article class="tweet">
        <header>
            <span class="tweet-author">
                <img src="/images/profile-hex.png" />
                ${tweet.user.name}
            </span>
            <h2>${tweet.user.handle}</h2>
        </header>
        <div class="tweet-body">
            <p>
               ${tweet.content.text}
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

const renderTweets = function (tweets) {
    // loops through tweets
    for (let i = 0; i < tweets.length; i++) {
        //calls createTweetElement to format each tweet and append to the the tweets container
        $("#tweets-container").append(createTweetElement(tweets[i]));
    }
};

const loadTweets = function () {
    // get the tweets from the server
    $.get("/tweets", function (data) {
        console.log(data);
        // render the tweets
        renderTweets(data);
    });
};

//wait for the document to be ready, then render the tweets
$(document).ready(() => {
    loadTweets();

    $(function () {
        const $form = $(".new-tweet form");

        // event listener for submit button
        $form.on("submit", function (event) {
            event.preventDefault();
            let valid = true;

            //get the tweet text from the textarea
            let $tweetText = $("#tweet-text");

            //check if the tweet is empty or too long
            if (
                $tweetText.val() === undefined ||
                $tweetText.val() === null ||
                $tweetText.val() === "" ||
                $tweetText.val().length === 0
            ) {
                alert("Please enter a tweet!");
                valid = false;
            } else if ($tweetText.val().length > 140) {
                alert("Your tweet is too long!");
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
                            console.log("Success", data);
                            //clear out the form data
                            $tweetText.val("");
                        } else {
                            console.log("Error", error);
                        }
                    },
                });
            }
        });
    });
});
