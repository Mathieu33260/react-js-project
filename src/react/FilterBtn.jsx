import React from "react";

export default function FilterBtn (props) {
    return <button onClick={
        props.filter
    }>Filter</button>
}