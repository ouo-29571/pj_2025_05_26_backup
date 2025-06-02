const mariadb = require("mariadb");
const express = require("express");
const cors = require("cors");

const app = express();

const pool = mariadb.createPool({
    host: "192.168.0.191", //127.0.01
    user: "4team", //root
    password: "4team", //root
    database: "4team", //test_del
    port: "3306",
});

app.use(cors());
app.use(express.json());

//회원가입

//이메일 중복확인
async function find_email(Signup_email) {
    const conn = await pool.getConnection();
    //배열형식으로만 받을 수 있음
    const [rows] = await conn.query(
        //수를 반환하되 coout라는 행으로 따로 저장
        "SELECT COUNT(*) AS count FROM signup_test WHERE email = ?",
        [Signup_email]
    );
    //conn종료(?)
    conn.release();
    return [rows];
}
app.post("/check_email", async (req, res) => {
    const { Signup_email } = req.body;
    const rows = await find_email(Signup_email);
    if (rows[0].count > 0) {
        //row[0]:데이터 / row[1]: 데이터 정보
        email_exit = true;
    } else {
        email_exit = false;
    }

    //프론트한테 값 전달
    res.json({ email_exit });
});

app.listen(8080, () => {
    console.log("서버 실행중");
});

//회원가입 정보 저장
async function signup_data(
    Signup_email,
    Signup_password,
    Signup_name,
    Signup_tel
) {
    const conn = await pool.getConnection();
    await conn.query(
        "INSERT INTO signup_test(email, password, name, tel) VALUES(?, ?, ?, ?)",
        [Signup_email, Signup_password, Signup_name, Signup_tel]
    );
    conn.release();
}
app.post("/signup", async (req, res) => {
    const { Signup_email, Signup_password, Signup_name, Signup_tel } = req.body;
    await signup_data(Signup_email, Signup_password, Signup_name, Signup_tel);
});

//로그인

async function login_data(login_email, login_password) {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
        "SELECT COUNT(*) AS count FROM signup_test WHERE email= ? AND PASSWORD= ?",
        [login_email, login_password]
    );

    conn.release();
    return [rows];
}

app.post("/login_submit", async (req, res) => {
    const { login_email, login_password } = req.body;
    const rows = await login_data(login_email, login_password);

    login_check = false;
    if (rows[0].count > 0) {
        login_check = true;
    }

    res.json({ login_check });
});

//비밀번호 찾기 수정
async function Passwordfind_data(Passwordfind_email) {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
        "SELECT COUNT(*) AS count FROM signup_test WHERE email= ?",
        [Passwordfind_email]
    );

    conn.release();
    return [rows];
}
app.post("/Passwordfind", async (req, res) => {
    const { Passwordfind_email } = req.body;
    const rows = await Passwordfind_data(Passwordfind_email);

    if (rows[0].count > 0) {
        Passwordfind_result = true;
    } else {
        Passwordfind_result = false;
    }
    res.json({ Passwordfind_result });
});

//마이페이지

async function find_userName(User_email) {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
        "SELECT name FROM signup_test WHERE email= ?",
        [User_email]
    );
    conn.release();
    return [rows];
}
app.post("/Mypage_userName", async (req, res) => {
    const { User_email } = req.body;
    const rows = await find_userName(User_email);
    User_Name = rows[0].name;
    res.json({ User_Name });
});
