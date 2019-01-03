import React from "react";
import Tweet from './Tweet.jsx';

export default function Liste (props) {
        return (<ul>
            {
                props.tweetList.map(function(tweet) {
                    return <Tweet key={tweet.id} tweet={tweet} isRt={'retweeted_status' in tweet}/>
                })
            }
        </ul>);
}