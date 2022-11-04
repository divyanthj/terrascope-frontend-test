import { createUseStyles } from 'react-jss';

const ideaStyles = createUseStyles({
    ideaTile: {
        width: 150,
        height: 150,
        margin: 10,
        boxShadow: "1px 1px 5px #888888",
        float: "left",
        cursor: "pointer"
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        width: 120,
        margin: 7,
        border: 0,
        textOverflow: "ellipsis"
    },
    titleFocused: {
        outlineColor: "#aaaaaa"
    },
    body: {
        padding: 7,
        border: 0,
        width: 120
    },
    bodyFocused: {
        outlineColor: "#aaaaaa"
    },
    createdAt: {
        fontSize: 9,
        padding: 7,
        color: "#888888"
    },
    deleteButton: {
        boxShadow: "1px 1px 3px #888888",
        fontSize: 12,
        borderRadius: 3,
        width: 18,
        height: 18,
        float: "right",
        margin: 7,
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