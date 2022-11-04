import { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss'


const styles = createUseStyles({
    ideaTile: {
        width: 200,
        height: 200,
        margin: 10,
        boxShadow: "1px 1px 5px #888888",
        float: "left",
        cursor: "pointer",
        ':hover' : {
            backgroundColor: "#aaaaaa"
        }
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        width: 180,
        margin: 10,
        border: 0
    },
    titleFocused: {
        outlineColor: "#aaaaaa"
    },
    body: {
        padding: 10,
        border: 0
    },
    bodyFocused: {
        outlineColor: "#aaaaaa"
    },
    createdAt: {
        fontSize: 9,
        color: "#888888"
    },
    deleteButton: {
        boxShadow: "1px 1px 3px #888888",
        borderRadius: 3,
        width: 30,
        height: 30,
        float: "right",
        margin: 10,
        background: "grey",
        color: "white"
    }
})

function Idea({ title, body, createdAt, onAddIdea, onDeleteIdea, onUpdateIdea }) {
    const isEmpty = !title && !body && !createdAt;
    const [ isDeleteShown, setIsDeleteShown ] = useState();
    const [ isTitleFocused, setIsTitleFocused ] = useState(false);
    const [ isBodyFocused , setIsBodyFocused ] = useState(false);
    const classes = styles();

    const handleDelete = (title) => {
        console.log("Deleting ", title);
    }

    const handleTitleFocus = (isFocused) => {
        setIsTitleFocused(isFocused);
    }

    const handleBodyFocus = (isFocused) => {
        setIsBodyFocused(isFocused);
    }

    const handleCreateNewIdea = () => {
        console.log("Creating new idea");
    }


    return (!isEmpty ? <div className={classes.ideaTile} onMouseEnter={() => setIsDeleteShown(true)} onMouseLeave={() => setIsDeleteShown(false)}>
        <input 
            className={classes.title + " " + (isTitleFocused && classes.titleFocused)} 
            value={title}
            onFocus={() => handleTitleFocus(true)}
            onBlur={() => handleTitleFocus(false)}></input>
        <div className={classes.createdAt}>{"Created on " + (new Date(createdAt))}</div>
        <textarea className={classes.body + " " + (isBodyFocused && classes.bodyFocused)} 
            value={body}
            onFocus={() => handleBodyFocus(true)}
            onBlur={() => handleBodyFocus(false)} rows={4}></textarea>
        {
            isDeleteShown && <div className={classes.deleteButton} onClick={() => handleDelete(title)}>
                <i className="fa fa-trash" ></i>
            </div>}
    </div> : 
    <div className={classes.ideaTile} onClick={() => this.handleCreateNewIdea()}>
        <h2>+</h2>
    </div>)
}

export default Idea;