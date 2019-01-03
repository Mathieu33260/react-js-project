import React from "react";

export default function HashtagBtn (props) {
    return <button onClick={
        props.filter
    } value={props.hashtag} className={props.isSelected ? 'selected' : ''}>{ props.hashtag }</button>
}