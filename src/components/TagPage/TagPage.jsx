import React from 'react';
import MainContainer from "../MainPage/MainComponent/MainContainer";
import Header from "../MainPage/Header/Header";
import MainContent from "../MainPage/MainContent/MainContent";
import LeftColumn from "../MainPage/LeftColumn/LeftColumn";
import ComixImgBlock from "../Comix/ComixImgBlock/ComixImgBlock";
import ComixWindow from "../Comix/ComixWindow/ComixWindow";
import {Link, useParams} from "react-router-dom";
import ComixPreview from "../Comix/ComixWindow/ComixPreview";
import ComixName from "../Comix/ComixWindow/ComixName";
import RightColumn from "../MainPage/RightColumn/RightColumn";
import PageNumbers from "../MainPage/PageNumbers/PageNumbers";
import TagDescription from "./TagDescription/TagDescription";
import config from "../config";


const TagPage = () => {
    const {tag} = useParams();
    const {page} = useParams();
    const pageNumber = parseInt(page);
    const imageStyle = {
        margin: '0px', top: '355px', widths: '100%', height: '100%', right: '-600px', zIndex: '-1',
    };
    return (

        <MainContainer>
            <Header/>
            <MainContent>

                <LeftColumn from="getalltagcomix" pageNumber={pageNumber} tagName={tag}>
                    {(comixList) => (<ComixImgBlock>
                        <img
                            src="/7.png" // Замените на путь к вашему изображению
                            alt="Your Image"
                            style={imageStyle}
                        />
                        <TagDescription tag={tag}></TagDescription>
                        {comixList.map((comix, index) => (<ComixWindow key={index} link={comix.ComixTag}>
                            <Link to={`/comix/${comix.ComixTag}/${comix.ComixName}`}>
                                <ComixPreview
                                    path={config.url + "/" + comix.ComixTag + "/" + comix.ComixName + "/1.jpg"}/>
                                <ComixName name={comix.ComixName}
                                           time={comix.ComixDate.slice(0, 10).split('-').reverse().join('.')}
                                           tag={comix.ComixTag}/>
                            </Link>
                        </ComixWindow>))}
                    </ComixImgBlock>)}
                </LeftColumn>
                <RightColumn>
                </RightColumn>
            </MainContent>
            <PageNumbers from="getquantitytag" link={config.reactUrl + "/tag/" + tag + "/"}
                         tagName={tag}></PageNumbers>
        </MainContainer>);
};

export default TagPage;