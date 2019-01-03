import React from "react";

export default function FilterBtn (props) {
    return <button onClick={
        props.filter
    }>Filtrer français / tout</button>
}