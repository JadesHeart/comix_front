import React, {useState} from "react";
import './styles/App.css'
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import ComixPage from "./components/Comix/ComixPage/ComixPage";
import MainPage from "./components/MainPage/MainPage";
import TagPage from "./components/TagPage/TagPage";
import Admin from "./components/admin/admin";
import FindComix from "./components/find/FindComix";


function App() {


    return (
        <Router location={window.location} navigator={window.navigator}>
            <Routes>
                <Route path="/comix/:comixTag/:comixName" element={<ComixPage/>}/>
                <Route path="/:page" element={<MainPage/>}/>
                <Route path="/tag/:tag/:page" element={<TagPage/>}/>
                <Route path="/tag/:tag" element={<TagPage/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/find/:name/:page" element={<FindComix/>}/>
                <Route path="/" element={<MainPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;