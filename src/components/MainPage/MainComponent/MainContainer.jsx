import React from 'react';
import classes from "./MainComponent.module.css"


const MainContainer = (props) => {
    return (
            <div  className={classes.MainContainer}>
                {props.children}
            </div>
    );
};

export default MainContainer;