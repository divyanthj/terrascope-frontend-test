import { useState, useEffect, useRef } from "react";
import { createUseStyles } from 'react-jss';
import  MIN_CHARACTERS  from "../Constants/mincharacters";
import ideaStyles from "../Styles/Idea";

function Idea({ id, title, body, createdAt, onDeleteIdea, onUpdateIdea, onAddIdea }) {
    const isEmpty = id === undefined;
    const [ bodyCharacterCount, setBodyCharacterCount ] = useState(0);
    const [ isDeleteShown, setIsDeleteShown ] = useState();
    const [ isTitleFocused, setIsTitleFocused ] = useState(false);
    const [ isBodyFocused , setIsBodyFocused ] = useState(false);
    const [ ideaTitle, setIdeaTitle ] = useState(title);
    const [ ideaBody, setIdeaBody ] = useState(body);

    const titleInput = useRef();
    const classes = ideaStyles();

    const handleDelete = (id) => {
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
        onAddIdea();
    }

    useEffect(() => {
        if(title === "") {
            titleInput.current.focus();
        }
        if(body) setBodyCharacterCount(body.length);
    }, [])


    return (!isEmpty ? <div className={classes.ideaTile} onMouseEnter={() => setIsDeleteShown(true)} onMouseLeave={() => setIsDeleteShown(false)}>
        {/* Title input */}
        <input 
            placeholder={"Title"}
            className={classes.title + " " + (isTitleFocused && classes.titleFocused)} 
            ref={titleInput}
            value={ideaTitle}
            onChange={(e) => handleTitleChange(e.target.value)}
            onFocus={() => handleTitleFocus(true)}
            onBlur={() => handleTitleFocus(false)}></input>
        {/* Date Label */}
        <div className={classes.createdAt}>{"Created on " + (new Date(createdAt * 1000).toLocaleString())}</div>
        {/* Body Input */}
        <textarea className={classes.body + " " + (isBodyFocused && classes.bodyFocused)} 
            placeholder={"Idea Body"}
            value={ideaBody}
            onChange={(e) => handleBodyChange(e.target.value)}
            onFocus={() => handleBodyFocus(true)}
            onBlur={() => handleBodyFocus(false)} rows={4}></textarea>
        {
            /* Character count Label*/
            isBodyFocused && 
            bodyCharacterCount < MIN_CHARACTERS.BODY && 
            <div className={classes.characterCounter}>{"Min " + bodyCharacterCount + "/" + MIN_CHARACTERS.BODY}</div>}
        {
            /* Delete Button */
            isDeleteShown && <div className={classes.deleteButton} onClick={() => handleDelete(id)}>
                <i className="fa fa-trash" ></i>
            </div>}
    </div> : 
    
    <div className={classes.ideaTile} onClick={() => handleCreateNewIdea()}>
        {/* Add new Idea Button */}
        <h1>+</h1>
    </div>)
}

export default Idea;