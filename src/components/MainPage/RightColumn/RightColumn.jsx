import React, {useState, useEffect} from 'react';
import classes from './RightColumn.module.css';
import config from "../../config";

const RightColumn = () => {
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(config.url + '/alltags', {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json'
                    }, body: JSON.stringify()
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data && data.tagList) {
                        setTagList(data.tagList);
                    }
                } else {
                    // Handle the error if needed
                    console.error('Failed to fetch tag list');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run this effect only once

    const dynamicHeight = 20 + tagList.length * 200; // Предположим, что каждый тег имеет высоту 20px


    const imageStyle = {
        position: 'absolute', top: '355px', right: '-600px', // Расположение справа от блока
        zIndex: '-1', // Устанавливаем индекс, чтобы поместить изображение за блоком
        // transform: 'scaleX(-1)' // Отзеркаливание по вертикали
    };
    return (<div className={classes.RightColumn}>
        <p className={classes.firstParagraph}>ТЭГИ:</p>
        {tagList.map((tag, index) => (<a className={classes.tagLink} href={config.reactUrl + "/tag/" + tag} key={index}>
            <p>{tag}</p>
        </a>))}
        <img
            src="/3.png" // Замените на путь к вашему изображению
            alt="Your Image"
            style={imageStyle}
        />
    </div>);
};

export default RightColumn;
