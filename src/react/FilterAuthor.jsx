import React from "react";

export default function FilterAuthor (props) {
    return <input onChange={
        props.filter
    }/>
}