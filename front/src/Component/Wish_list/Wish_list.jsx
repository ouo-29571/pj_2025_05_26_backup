import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Wish_list.css";

const Wish_list = () => {
    const navigate = useNavigate("");

    const [userName, setUserName] = useState("");
    const [Wish_list_search, setWish_list_search] = useState("");

    async function set_Username(email) {
        const response = await fetch("http://localhost:8080/Mypage_userName", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ User_email: email }),
        });

        const data = await response.json();
        if (data.User_Name && response.ok) {
            setUserName(data.User_Name);
        } else {
            console.log("이름이 없습니다.");
        }
    }

    //마이페이지 클릭시 로그인상태가 아닐경우 로그인 페이지로
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));

        if (!user || !user.token) {
            navigate("/Login");
        } else {
            set_Username(user.name);
        }
    }, [navigate]);

    const handlechange_Wish_list_search = (e) => {
        setWish_list_search(e.target.value);
        console.log("데이터 전송");
    };

    //상품명 검색결과
    const handleclick_search = async () => {
        const response = await fetch("http://localhost:8080/get_Search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Wish_list_search }),
        });
        const data = await response.json();
    };

    return (
        <>
            <div className="Wish_list_page">
                <div className="Wish_list_top">
                    <div className="Wish_list_logo">
                        <img src="../img/free-icon-logo-5448104.png" />
                    </div>
                    <div>
                        <span className="DB_input_username">{userName}</span>
                        <span>님</span>
                    </div>
                    <div className="Wish_list_search_box">
                        <div>
                            <input
                                type="text"
                                onChange={handlechange_Wish_list_search}
                                placeholder="상품명을 입력하세요"
                            />
                        </div>
                        <div>
                            <img
                                src="../img/free-icon-magnifier-2311526.png"
                                onClick={handleclick_search}
                            />
                        </div>
                    </div>
                </div>
                <div className="Wish_list_main">
                    <div className="Wish_list_subject">
                        <span>위시리스트</span>
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    );
};

export default Wish_list;
