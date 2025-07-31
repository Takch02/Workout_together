// Express와 CORS 모듈 가져오기
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

const serverURL = "http://ec2-15-165-16-46.ap-northeast-2.compute.amazonaws.com:8080";
const testURL = 'http://localhost:8080';

// JSON 파싱 및 정적 파일 제공 설정
app.use(express.json());
app.use(express.static('public'));

app.use(cors({
    origin: [testURL, serverURL], // 백엔드 URL
    credentials: true
}));

// 루트 경로: login.html 제공
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/login.html');
});


app.get('/:page', (req, res) => {
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