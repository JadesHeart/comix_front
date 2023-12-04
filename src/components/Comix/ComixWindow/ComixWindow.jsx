import React from 'react';
import classes from "./ComixWindow.module.css"
import {Link} from 'react-router-dom';

const ComixWindow = (props) => {
    return (

        <Link className={classes.ComixWindow} to={props.link}>
            {props.children}
        </Link>);
};

export default ComixWindow;
