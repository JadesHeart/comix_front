import React from 'react';
import classes from "./DescriptionComix.module.css"
import {useState, useEffect} from 'react';
import config from "../../config";

const DescriptionComix = ({tag, name}) => {
    const [comixData, setComixData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(config.url + '/getcomix', {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json'
                    }, body: JSON.stringify({
                        tagName: tag, name: name
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    setComixData(data); // Сохраняем данные в переменной comixData
                } else {
                    // Обработка ошибки, если сервер вернул ошибку
                    console.error('Ошибка при получении данных:', response.status);
                }
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        fetchData();
    }, [tag, name]);

    return (<div className={classes.descriptionBlock}>
        <div className={classes.descriptionImg}>
            <img
                className={classes.descriptionImg}
                src={config.url + `/${tag}/${name}/1.jpg`}
                alt="Изображение"
            />
        </div>
        <div className={classes.descriptionContent}>
            <h2>{name}</h2>

            {comixData && (<>
                <p> Описание: {comixData.description}</p>
                <p> Тэг: {tag}</p>
                <p> Дата загрузки📅: {comixData.upload_date.slice(0, 10).split('-').reverse().join('.')}</p>
                <p> Количество просмотров👁️‍🗨️: {comixData.views}</p>

            </>)}
        </div>
    </div>);
};

export default DescriptionComix;