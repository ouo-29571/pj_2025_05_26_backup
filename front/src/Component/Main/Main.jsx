import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

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
                    <Link to="/Mypage">마이페이지</Link>
                </div>
                {/* 임시로그아웃 버튼 */}
                <div>
                    <button onClick={handleLogout}>로그아웃</button>
                </div>
            </div>
        </>
    );
};

export default Main;
