import React from "react";
import HashtagBtn from './HashtagBtn.jsx';

export default function HashtagList (props) {
    return (<div>
        {
            props.hashtagList.map(function(hashtag, index) {
                return <HashtagBtn key={index} filter={props.filter} hashtag={hashtag}/>
            })
        }
    </div>);
}