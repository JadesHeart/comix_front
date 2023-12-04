import React from 'react';
import classes from "./ComixWindow.module.css"

const ComixPreview = (props) => {
    return (<div className={classes.ComixPreview}>
            {props.children}
            <img className={classes.ComixPreviewImg} src={props.path} alt="failed load img"/>
        </div>);
};

export default ComixPreview;