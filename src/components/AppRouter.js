import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../routes/Home";
import RoundInput from "../routes/RoundInput";

const AppRouter = ({ userObj }) => {
    return (
        <Routes>
            <Route path="/" element={<Home userObj={userObj}/>} />
            <Route path="/roundInput" element={<RoundInput />} />
        </Routes>
    );
};

export default AppRouter;