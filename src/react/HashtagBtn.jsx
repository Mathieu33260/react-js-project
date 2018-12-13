import React from "react";

export default function HashtagBtn (props) {
    return <button onClick={
        props.filter
    }>{ props.hashtag }</button>
}