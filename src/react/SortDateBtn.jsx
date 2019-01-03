import React from "react";

export default function SortDateBtn (props) {
    return <button onClick={
        props.sortDate
    }>Trier par date</button>
}