// Express와 CORS 모듈 가져오기
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const rootURL = 'http://localhost:8080';


// JSON 파싱 및 정적 파일 제공 설정
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// 루트 경로: login.html 제공
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/js/html/login.html');
});


app.get('/main', async (req, res) => {
    try {
        const response = await fetch('http://localhost:8080/auth',
            {
                headers: {
                    Cookie: req.headers.cookie // 쿠키 직접 전달
                }
        });

        if (response.status === 200) {
            res.sendFile(__dirname + '/public/js/html/main.html');
        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.redirect('/');
    }

});


// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다!`);
});