import React from "react";

export default function Tweet (props) {
        return (<li className={ props.isRt ? 'isRt' : ''}>
                    <p>{ props.tweet.user.name }</p>
                    <p>{ props.tweet.text }</p>
                    <p>{ props.tweet.created_at }</p>
                    <img src={ props.tweet.user.profile_image_url } />
            </li>)
}