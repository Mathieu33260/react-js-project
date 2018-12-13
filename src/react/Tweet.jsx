import React from "react";

export default function Tweet (props) {
        return <li>{ props.tweet.user.name } { props.tweet.text } { props.tweet.created_at }</li>
}