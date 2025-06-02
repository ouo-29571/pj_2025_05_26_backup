import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Userinfofix.css";

const Userinfofix = () => {
    const navigate = useNavigate();

    const [confirmPassword, setConfirmPassword] = useState("");
    //에러문구
    const [Userinfofix_error, setUserinfofix_error] = useState({
        Userinfofix_error_email: "",
        Userinfofix_error_password: "",
    });

    //DB에 저장하기 위해
    const [Userinfofix_form, setUserinfofix_form] = useState({
        Userinfofix_email: "",
        Userinfofix_password: "",
        Userinfofix_name: "",
        Userinfofix_tel: "",
    });

    useEffect( async() => {
        const response = await fetch("http://localhost:8080/get_userinfo", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Userinfofix_data),
        });
        const data = await response.json();
        if (data.userinfo != null) {
            setUserinfofix_form((prev) => ({ ...prev, [id]: value }));
        }
    }

    useEffect(() => {
        //localStorage에 저장된 user 정보 가져오기
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.token) {
            navigate("/Login");
        } else {
            //DB에 저장된 회원정보 가져오기
            Set_Userinfofix_form(Userinfofix_data);
        }
    }, [navigate]);

    const handlewheel_input = (e) => {
        e.target.blur();
    };

    //이메일 중복확인
    const handleBlurOrEnter_email = async (e) => {
        const email_value = e.target.value;
        //form 이메일 값 전달
        setUserinfofix_form((prev) => ({
            ...prev,
            Userinfofix_email: email_value,
        }));

        //DB 값 전달
        const response = await fetch("http://localhost:8080/check_email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", //데이터 타입 : 데이터형식(json)
            },
            //객체형식 데이터 전달
            body: JSON.stringify({ Userinfofix_email: email_value }),
        });

        //받은 값 활용
        //서버에서 받은 json데이터를 자바스크립트 객체로 변환하여 저장
        const data = await response.json();
        if (data.email_exit === true) {
            setUserinfofix_error((prev) => ({
                ...prev,
                Userinfofix_error_email: "이미 존재하는 이메일입니다.",
            }));
        } else {
            setUserinfofix_error((prev) => ({
                ...prev,
                Userinfofix_error_email: "",
            }));
        }
    };

    //재확인 비밀번호 값 저장
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    // 비밀번호, 비밀번호학인의 필드값 일치하는지 판단
    const handleBlurOrEnter = () => {
        if (Userinfofix_form.Userinfofix_password != confirmPassword) {
            //prev: 이전 상태값 복사 후 키(password)를 덮어쓰기하여 업데이트
            setUserinfofix_error((prev) => ({
                ...prev,
                Userinfofix_error_password: "비밀번호가 일치하지 않습니다.",
            }));
        } else {
            //에러문구 삭제
            setUserinfofix_error((prev) => ({
                ...prev,
                Userinfofix_error_password: "",
            }));
        }
    };

    //DB에 전달한 form에 값 저장
    function handleChange(e) {
        const { id, value } = e.target;
        setUserinfofix_form((prev) => ({ ...prev, [id]: value }));
    }

    const handleUserinfofix_Submit = async (e) => {
        //에러에 문구가 있으닌 true
        if (Userinfofix_error.Userinfofix_error_password) {
            alert("비밀번호가 일치하지 않습니다.");
            e.preventDefault();
        } else if (Userinfofix_error.Userinfofix_error_email) {
            alert("중복된 이메일입니다.");
            //새로고침 방지용
            e.preventDefault();
        } else {
            //DB에 화원가입정보 보내기
            const response = await fetch("http://localhost:8080/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Userinfofix_form),
            });
            //fetch의 반환값(response.ok / response.json()) = 상태값 200-299이면 true / false(웹 개발자모드에서 http상태코드 오류)
            if (response.ok) {
                //회원가입 성공
            }
        }
    };

    //회원정보 취소버튼
    const handle_userinfofixback = () => {
        navigate("/Mypage");
    };

    return (
        <>
            <div className="signup_page">
                <div>{/* 상단 헤더 추가 예정 */}</div>
                {/* 회원가입 */}
                <div className="signupcontainer">
                    <div className="signup_logo">
                        <img src="../img/free-icon-logo-5448104.png" />
                    </div>
                    <div>
                        <form
                            className="signupform"
                            onSubmit={handleUserinfofix_Submit}
                        >
                            <div className="input-container">
                                <div>
                                    {/* htmlFor: 글씨를 클릭했을때 input으로 이동하므로 id와 세트로 생각하면될듯?? */}
                                    <label htmlFor="Userinfofix_email">
                                        이메일
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        id="Userinfofix_email"
                                        placeholder="이메일을 입력하세요"
                                        value={
                                            Userinfofix_form.Userinfofix_email
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlurOrEnter_email} //input바깥영역을 눌렀을 경우 발생하는 이벤트 (반대; onFocus)
                                        onKeyDown={(e) => {
                                            //키보드 눌렀을 경우 발생
                                            if (e.key === "Enter")
                                                handleBlurOrEnter_email();
                                        }}
                                        required /*필수 입력란*/
                                    />
                                </div>
                            </div>
                            {Userinfofix_error.Userinfofix_error_email && (
                                <p style={{ color: "red" }}>
                                    {Userinfofix_error.Userinfofix_error_email}
                                </p>
                            )}
                            <div className="input-container">
                                <div>
                                    <label htmlFor="Userinfofix_password">
                                        비밀번호
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        id="Userinfofix_password"
                                        value={
                                            Userinfofix_form.Userinfofix_password
                                        }
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        onBlur={handleBlurOrEnter} //input바깥영역을 눌렀을 경우발생하는 이벤트 (반대; onFocus)
                                        onKeyDown={(e) => {
                                            //키보드 눌렀을 경우 발생
                                            if (e.key === "Enter")
                                                handleBlurOrEnter();
                                        }}
                                        placeholder="비밀번호를 입력하세요"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-container">
                                <div>
                                    <label htmlFor="confirmPassword">
                                        비밀번호 확인
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        placeholder="비밀번호를 입력하세요"
                                        required
                                        onChange={handleConfirmPasswordChange}
                                        onBlur={handleBlurOrEnter} //input바깥영역을 눌렀을 경우발생하는 이벤트 (반대; onFocus)
                                        onKeyDown={(e) => {
                                            //키보드 눌렀을 경우 발생
                                            if (e.key === "Enter")
                                                handleBlurOrEnter();
                                        }}
                                    />
                                </div>
                            </div>
                            {Userinfofix_error.Userinfofix_error_password && (
                                <p style={{ color: "red" }}>
                                    {
                                        Userinfofix_error.Userinfofix_error_password
                                    }
                                </p>
                            )}
                            <div className="input-container">
                                <div>
                                    <label htmlFor="Userinfofix_name">
                                        이름
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        id="Userinfofix_name"
                                        value={
                                            Userinfofix_form.Userinfofix_name
                                        }
                                        placeholder="이름을 입력하세요"
                                        required
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="input-container">
                                <div>
                                    <label htmlFor="Userinfofix_tel">
                                        전화번호
                                    </label>
                                </div>
                                <div>
                                    <input
                                        className="Signup_tel_input"
                                        type="number"
                                        id="Userinfofix_tel"
                                        value={Userinfofix_form.Userinfofix_tel}
                                        placeholder="전화번호를 입력하세요 (-제외)"
                                        required
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        //마우스 휠 이벤트
                                        onWheel={handlewheel_input}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="userinfofix_submit_btn"
                            >
                                수정
                            </button>
                        </form>
                        <div>
                            <button
                                className="userinfofix_back_btn"
                                onClick={handle_userinfofixback}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
                <div>{/* footer추가예정 */}</div>
            </div>
        </>
    );
};

export default Userinfofix;
