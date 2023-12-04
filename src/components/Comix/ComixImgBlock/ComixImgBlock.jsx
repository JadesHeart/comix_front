import React from 'react';
import classes from './ComixImgBlock.module.css';

const ComixImgBlock = (props) => {
    return (
        <div className={classes.ComixImgBlock}>
            {props.children}
        </div>
    );
};

export default ComixImgBlock;
