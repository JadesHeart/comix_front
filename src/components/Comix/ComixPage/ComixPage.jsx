import React from 'react';
import {useParams} from "react-router-dom";
import MainContainer from "../../MainPage/MainComponent/MainContainer";
import Header from "../../MainPage/Header/Header";
import MainContent from "../../MainPage/MainContent/MainContent";
import RightColumn from "../../MainPage/RightColumn/RightColumn";
import {useState, useEffect} from 'react';
import classes from "./ComixPage.module.css"
import DescriptionComix from "../DescriptionComix/DescriptionComix";
import config from "../../config";

const ComixPhotoListColumn = ({images}) => {
    return (<div className={classes.IMGdiv}>
        {images.map((image, index) => (
            <img className={classes.comixIMG} key={index} src={`data:image/jpg;base64,${image}`}
                 alt={`Image ${index}`}/>))}
    </div>);
};

const ComixPage = () => {
    const {comixTag} = useParams();
    const {comixName} = useParams();
    const [images, setImages] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0); // Перемещение вверх страницы при загрузке компонента

        const fetchData = async () => {
            try {
                const response = await fetch(config.url + `/comix/${comixTag}/${comixName}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const imageData = await response.json();
                setImages(imageData.images); // Предположим, что возвращается объект с ключом "images" содержащим массив изображений в формате base64
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [comixTag, comixName]);

    return (<MainContainer>
        <Header/>
        <DescriptionComix name={comixName} tag={comixTag}></DescriptionComix>
        <MainContent>
            <RightColumn></RightColumn>
            <ComixPhotoListColumn images={images}/>
        </MainContent>
    </MainContainer>);
};

export default ComixPage;