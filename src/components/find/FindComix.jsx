import React from 'react';
import MainContainer from "../MainPage/MainComponent/MainContainer";
import Header from "../MainPage/Header/Header";
import MainContent from "../MainPage/MainContent/MainContent";
import SearchForm from "./SearchForm/SearchForm";
import LeftColumn from "../MainPage/LeftColumn/LeftColumn";
import ComixImgBlock from "../Comix/ComixImgBlock/ComixImgBlock";
import ComixWindow from "../Comix/ComixWindow/ComixWindow";
import {Link, useParams} from "react-router-dom";
import ComixPreview from "../Comix/ComixWindow/ComixPreview";
import ComixName from "../Comix/ComixWindow/ComixName";
import RightColumn from "../MainPage/RightColumn/RightColumn";
import PageNumbers from "../MainPage/PageNumbers/PageNumbers";
import config from "../config";

const FindComix = () => {

    const {page} = useParams(); // Получение значения параметра "page" из URL
    const {name} = useParams(); // Получение значения параметра "page" из URL
    const pageNumber = parseInt(page); // Преобразование значения в число

    return (<MainContainer>
        <Header/>
        <MainContent>

            <SearchForm></SearchForm>

            <LeftColumn from="findcomix" pageNumber={pageNumber} name={name}>
                {(comixList) => (<ComixImgBlock>
                    {comixList.map((comix, index) => (

                        <ComixWindow key={index} link={comix.ComixTag}>
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
        <PageNumbers from="/getquantityname"
                     link={config.reactUrl + "/find/" + name + "/"}
                     name={name}></PageNumbers> {/* Передача функции для обновления текущей страницы */}

    </MainContainer>);
};

export default FindComix;