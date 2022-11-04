import { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
    ideaTile: {
        width: 200,
        height: 200,
        margin: 10,
        boxShadow: "1px 1px 5px #888888",
        float: "left"
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        padding: 10
    },
    createdAt: {
        fontSize: 9,
        color: "#888888"
    }
})

function Idea({ title, body, createdAt }) {
    const classes = styles();
    return (<div className={classes.ideaTile}>
        <div className={classes.title}>{title}</div>
        <div className={classes.createdAt}>{"Created on " + (new Date(createdAt))}</div>
        <div>{body}</div>

    </div>)
}

export default Idea;