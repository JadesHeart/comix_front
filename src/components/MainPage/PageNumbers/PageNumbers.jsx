import React from 'react';
import classes from "./PageNumbers.module.css"
import {useState, useEffect} from 'react';
import config from "../../config";

const PageNumbers = (props) => {
    const [numberOfButtons, setNumberOfButtons] = useState(1);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(config.url + '/' + props.from, {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json'
                    }, body: JSON.stringify({
                        tagName: props.tagName || "", name: props.tagName || ""
                    })
                });

                const data = await response.json();
                setNumberOfButtons(data.NumberOfComix);
            } catch (error) {
                console.error('Ошибка при выполнении POST запроса:', error);
            }
        };

        fetchData();
    }, []);


    return (<div className={classes.numbersBlock}>
        <ul className={classes.pagination}>
            {[...Array(numberOfButtons).keys()].map((buttonNumber) => (<li key={buttonNumber}>
                <a href={`${props.link}${buttonNumber + 1}`}>
                    {buttonNumber + 1}
                </a>
            </li>))}
        </ul>
    </div>);
};

export default PageNumbers;