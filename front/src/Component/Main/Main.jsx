import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
    return (
        <>
            {/* 확인용 */}
            <div className="Main_page">
                <div>
                    <Link to="/Login">로그인</Link>
                </div>
                <div>
                    <Link to="/signup">회원가입</Link>
                </div>
                <div>
                    <Link to="마이페이지">마이페이지</Link>
                </div>
            </div>
        </>
    );
};

export default Main;
