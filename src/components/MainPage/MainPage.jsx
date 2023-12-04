import React from 'react';
import MainContainer from "./MainComponent/MainContainer";
import Header from "./Header/Header";
import MainContent from "./MainContent/MainContent";
import LeftColumn from "./LeftColumn/LeftColumn";
import ComixImgBlock from "../Comix/ComixImgBlock/ComixImgBlock";
import ComixWindow from "../Comix/ComixWindow/ComixWindow";
import ComixPreview from "../Comix/ComixWindow/ComixPreview";
import ComixName from "../Comix/ComixWindow/ComixName";
import RightColumn from "./RightColumn/RightColumn";
import {Link, useParams} from "react-router-dom";
import PageNumbers from "./PageNumbers/PageNumbers";
import SearchForm from "../find/SearchForm/SearchForm";
import config from "../config";

const MainPage = () => {
    const {page} = useParams();
    const pageNumber = parseInt(page);

    return (<MainContainer>
        <Header/>
        <MainContent>

            <SearchForm></SearchForm>

            <LeftColumn from="getmainpagecomix" pageNumber={pageNumber}>
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
        <PageNumbers from="getquantitycomix"
                     link={config.reactUrl + "/"}></PageNumbers>

    </MainContainer>);
};

export default MainPage;