import React, {useEffect, useState} from "react";
import classes from "./TagDescription.module.css"
import config from "../../config";

const TagDescription = (props) => {
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(config.url + '/gettagdescription', {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json'
                    }, body: JSON.stringify({
                        tagName: props.tag
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setDescription(data.description);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (<div className={classes.infoTag}>
        <div className="textContainer">
            <p className={classes.pDescription}>{description}</p>
        </div>
    </div>);
};

export default TagDescription
