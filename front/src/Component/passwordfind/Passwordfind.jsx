import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Passwordfind = () => {
    const navigate = useNavigate();
    const [Passwordfind_email, setPasswordfind_email] = useState("");

    const handleChang_Passwordfind = (e) => {
        setPasswordfind_email(e.target.value);
        console.log("데이터 전송");
    };

    const handleClick_passwrodfind = async () => {
        const response = await fetch("http://localhost:8080/Passwordfind", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Passwordfind_email),
        });

        const data = await response.json();
        if (data.Passwordfind_result === true) {
            //비밀번호 수정 페이지 연결
            navigate("/Passwordfix");
        } else {
            alert("입력하신 이메일로 비밀번호를 찾을 수 없습니다.");
        }
    };

    return (
        <>
            <div className="Passwordfind_page">
                <div>
                    <div>
                        <input
                            type="email"
                            id="email"
                            value={Passwordfind_email}
                            onChange={handleChang_Passwordfind}
                            placeholder="이메일을 입력해주세요"
                        />
                    </div>
                    <div>
                        <button onClick={handleClick_passwrodfind}>
                            비밀번호 찾기
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Passwordfind;
