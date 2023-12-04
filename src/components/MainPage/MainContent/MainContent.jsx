import React from 'react';
import classes from "./MainContent.module.css"


const MainContent = (props) => {
    return (
        <div className={classes.MainContent}>
            {props.children}
        </div>
    );
};

export default MainContent;