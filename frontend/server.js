// Express와 CORS 모듈 가져오기
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

const serverURL = "http://ec2-15-165-16-46.ap-northeast-2.compute.amazonaws.com:8080";
const testURL = "http://localhost:8080";

// JSON 파싱 및 정적 파일 제공 설정
app.use(express.json());
app.use(express.static('public'));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['*'],
    credentials: true
}));

const authMiddleWare = async (req, res, next) => {
    if (req.path === '/') {
        return next();
    }
    try {
        const response = await fetch(`${serverURL}${req.originalUrl}`,
            {
                method : 'GET',
                credentials : 'include',
                headers: {
                    Cookie: req.headers.cookie // 쿠키 직접 전달
                }
            });
        console.log(`status : ${response.url}`);
        if (response.status === 200) {
            //console.log('response', response);
            next();
        } else {
            console.log('response', response);
            res.redirect('/');
        }
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
}

// 루트 경로: login.html 제공
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/login.html');
});


// 동적 HTML 렌더링
/**
 * 앞으로 'html/ '안에 html 추가할 것
 */
app.get('/:page', authMiddleWare, (req, res) => {
    const page = req.params.page; // 예: dashboard, user, profile
    const filePath = path.join(__dirname, `public/html/${page}.html`);

    // 파일 존재 여부 확인
    if (require('fs').existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('페이지 없음');
    }
});


// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다!`);
});