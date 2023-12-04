import React from 'react';
import classes from "./ComixWindow.module.css"

const ComixName = (props) => {
    return (<div>
            <div className={classes.ComixName}>
                <p>{props.name}</p>
                <p>{props.tag}</p>
                <p>{props.time}</p>
            </div>
        </div>);
};

export default ComixName;