// 와 개어려워

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

//첫글자 대문자(무조건)
//import Main from "";
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import Passwordfind from "./Component/Passwordfind/Passwordfind";
import Passwordfix from "./Component/Passwordfix/Passwordfix";
import Mypage from "./Component/Mypage/Mypage";
import Userinfofix from "./Component/Userinfofix/Userinfofix";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* 수정할 예정 */}
                    {/* <Route path="/" element={<Main />} /> hubguhghuugh*/}
                    <Route path="/" element={<Login />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Passwordfind" element={<Passwordfind />} />
                    <Route path="/Passwordfix" element={<Passwordfix />} />
                    <Route path="/Mypage" element={<Mypage />} />
                    <Route path="/Userinfofix" element={<Userinfofix />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
