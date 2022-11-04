import { useState, useEffect, useRef } from "react";
import { createUseStyles } from 'react-jss';
import  MIN_CHARACTERS  from "../Constants/mincharacters";


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
    },
    characterCounter: {
        fontSize: 12,
        color: "#888888",
        float: "left",
        margin: 10
    }
})

function Idea({ id, title, body, createdAt, onDeleteIdea, onUpdateIdea, onAddIdea }) {
    const isEmpty = id === undefined;
    const [ bodyCharacterCount, setBodyCharacterCount ] = useState(0);
    const [ isDeleteShown, setIsDeleteShown ] = useState();
    const [ isTitleFocused, setIsTitleFocused ] = useState(false);
    const [ isBodyFocused , setIsBodyFocused ] = useState(false);
    const [ ideaTitle, setIdeaTitle ] = useState(title);
    const [ ideaBody, setIdeaBody ] = useState(body);
    const titleInput = useRef();
    const classes = styles();

    const handleDelete = (id) => {
        console.log("Deleting ", id);
        onDeleteIdea(id);
    }

    const handleUpdate = (id) => {
        onUpdateIdea(id, ideaTitle, ideaBody);
    }

    const handleBodyChange = (value) => {
        setIdeaBody(value);
        setBodyCharacterCount(value.length);
    }

    const handleTitleChange = (value) => {
        setIdeaTitle(value);
    }

    const handleTitleFocus = (isFocused) => {
        setIsTitleFocused(isFocused);
        if(!isFocused) handleUpdate(id, title, body, createdAt);
    }

    const handleBodyFocus = (isFocused) => {
        setIsBodyFocused(isFocused);
        if(!isFocused) handleUpdate(title, body);
    }

    const handleCreateNewIdea = () => {
        console.log("Creating new idea");
        onAddIdea();
    }

    useEffect(() => {
        if(title === "") {
            titleInput.current.focus();
        }
        if(body) setBodyCharacterCount(body.length);
    }, [])


    return (!isEmpty ? <div className={classes.ideaTile} onMouseEnter={() => setIsDeleteShown(true)} onMouseLeave={() => setIsDeleteShown(false)}>
        <input 
            placeholder={"Title"}
            className={classes.title + " " + (isTitleFocused && classes.titleFocused)} 
            ref={titleInput}
            value={ideaTitle}
            onChange={(e) => handleTitleChange(e.target.value)}
            onFocus={() => handleTitleFocus(true)}
            onBlur={() => handleTitleFocus(false)}></input>
        <div className={classes.createdAt}>{"Created on " + (new Date(createdAt * 1000))}</div>
        <textarea className={classes.body + " " + (isBodyFocused && classes.bodyFocused)} 
            placeholder={"Idea Body"}
            value={ideaBody}
            onChange={(e) => handleBodyChange(e.target.value)}
            onFocus={() => handleBodyFocus(true)}
            onBlur={() => handleBodyFocus(false)} rows={4}></textarea>
        {
            isBodyFocused && 
            bodyCharacterCount < MIN_CHARACTERS.BODY && 
            <div className={classes.characterCounter}>{"Min " + bodyCharacterCount + "/" + MIN_CHARACTERS.BODY}</div>}
        {
            isDeleteShown && <div className={classes.deleteButton} onClick={() => handleDelete(id)}>
                <i className="fa fa-trash" ></i>
            </div>}
    </div> : 
    <div className={classes.ideaTile} onClick={() => handleCreateNewIdea()}>
        <h2>+</h2>
    </div>)
}

export default Idea;