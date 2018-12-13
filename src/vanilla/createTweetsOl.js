import createTweetLi from './createTweetLi.js';
import customSort from './sort';

export default tweets => {
    tweets = customSort(tweets);
    let ul = document.createElement('ul');
    tweets.forEach(function (tweet) {
        ul.append(createTweetLi(tweet));
    });
    return ul;
};