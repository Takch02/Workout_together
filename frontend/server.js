// Express와 CORS 모듈 가져오기
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// JSON 파싱 및 정적 파일 제공 설정
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const authMiddleWare = async (req, res, next) => {
    if (req.path === '/') {
        return next();
    }
    try {
        const response = await fetch(`http://localhost:8080${req.originalUrl}`,
            {
                method : 'GET',
                credentials : 'include',
                headers: {
                    Cookie: req.headers.cookie // 쿠키 직접 전달
                }
            });
        console.log(`status : ${response.url}`);
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

// 루트 경로: login.html 제공
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/login.html');
});


// 동적 HTML 렌더링
/**
 * 앞으로 'html/ '안에 html 추가할 것
 */
app.get('/:page', authMiddleWare, (req, res) => {
    console.log(":page 실행됨");
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