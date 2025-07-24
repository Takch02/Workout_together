// Express와 CORS 모듈 가져오기
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;


// JSON 파싱 및 정적 파일 제공 설정
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const authMiddleWare = async (req, res, next) => {
    try {
        const response = await fetch('http://localhost:8080/auth',
            {
                method : 'GET',
                credentials : 'include',
                headers: {
                    Cookie: req.headers.cookie // 쿠키 직접 전달
                }
            });
        if (response.status === 200) {
            next();
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
}

app.use('/main', authMiddleWare);

// 루트 경로: login.html 제공
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/login.html');
});


app.get('/main', async (req, res) => {
    res.sendFile(__dirname + '/public/html/main.html');
});


// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다!`);
});