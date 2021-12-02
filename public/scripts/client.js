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
        let $newTweet = createTweetElement(tweets[i]);
        console.log($newTweet);

        //calls createTweetElement to format each tweet and append to the the tweets container
        $("#tweets-container").append($newTweet);
    }
};

// Fake data taken from initial-tweets.json
const data = [
    {
        user: {
            name: "Newton",
            avatars: "https://i.imgur.com/73hZDYK.png",
            handle: "@SirIsaac",
        },
        content: {
            text: "If I have seen further it is by standing on the shoulders of giants",
        },
        created_at: 1461116232227,
    },
    {
        user: {
            name: "Descartes",
            avatars: "https://i.imgur.com/nlhLi3I.png",
            handle: "@rd",
        },
        content: {
            text: "Je pense , donc je suis",
        },
        created_at: 1461113959088,
    },
];

//wait for the document to be ready, then render the tweets
$(document).ready(() => {
    renderTweets(data);
});
