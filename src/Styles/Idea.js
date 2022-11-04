import { createUseStyles } from 'react-jss';

const ideaStyles = createUseStyles({
    ideaTile: {
        width: 200,
        height: 200,
        margin: 10,
        boxShadow: "1px 1px 5px #888888",
        float: "left",
        cursor: "pointer"
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
});

export default ideaStyles;