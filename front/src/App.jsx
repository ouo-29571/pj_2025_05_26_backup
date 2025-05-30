import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Main from "./Component/Main/Main";
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
                    <Route path="/Login" element={<Login />} />
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
