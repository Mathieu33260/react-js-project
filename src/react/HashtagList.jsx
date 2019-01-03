import React from "react";
import HashtagBtn from './HashtagBtn.jsx';

export default function HashtagList (props) {
    return (<div>
        {
            props.hashtagList.map(function(hashtag, index) {
                return <HashtagBtn key={index} isSelected={props.hashtagsSelected.includes(hashtag)}
                                   filter={props.filter} hashtag={hashtag}/>
            })
        }
            <button onClick={props.filter} value={null}>Supprimer les hashtags</button>
    </div>
    );
}