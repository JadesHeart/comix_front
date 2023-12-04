import React, {useState, useEffect} from 'react';
import classes from './Header.module.css';
import {useLocation} from 'react-router-dom';

const Header = (props) => {
    const location = useLocation();
    const [isFullScreen, setIsFullScreen] = useState(true);

    useEffect(() => {
        if (location.pathname === '/') {
            const timeout = setTimeout(() => {
                setIsFullScreen(false);
            }, 3000);

            return () => clearTimeout(timeout);
        } else {
            setIsFullScreen(false);
        }
    }, [location.pathname]);

    return (<a href={"/1"}>
        <div className={classes['header-container']}>
            <div className={isFullScreen ? classes['full-screen-image'] : classes['shrinked-image']}>
                {props.children}
            </div>
        </div>
    </a>);
};

export default Header;
