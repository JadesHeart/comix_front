import React from 'react';
import classes from './admin.module.css'; // Используйте ваш путь к файлу стилей


const Header = () => {

    return (
        <a href={"/1"}>
            <div className={classes.adminHeader}>
                <img src="/10.png" alt="" className={classes.adminHeaderIMG}/>
            </div>

        </a>
    );
};

export default Header;
