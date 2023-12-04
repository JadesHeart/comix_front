import React, {useState, useEffect} from 'react';
import classes from './LeftColumn.module.css';
import config from "../../config";

const LeftColumn = (props) => {
    const [comixList, setComixList] = useState([]);
    console.log(props.pageNumber)
    useEffect(() => {
        // Выполняем POST запрос при монтировании компонента
        fetch(config.url + '/' + props.from, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                pageNumber: props.pageNumber || 1,
                tagName: props.tagName,
                name: props.name,
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Распаковка JSON и установка списка
                const extractedComixList = data.comixFromForMainPage.map(comix => ({
                    ComixName: comix.ComixName,
                    ComixTag: comix.ComixTag,
                    Description: comix.Description,
                    ComixDate: comix.ComixDate,
                    Views: comix.Views,
                }));
                setComixList(extractedComixList);
            })
            .catch(error => {
                console.error('Ошибка при выполнении запроса:', error);
            });
    }, []);

    return (<div className={classes.LeftColumn}>
        {props.children(comixList)}
    </div>);
};

export default LeftColumn;
