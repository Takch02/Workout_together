// Express와 CORS 모듈 가져오기
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// JSON 파싱 및 정적 파일 제공 설정
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// 루트 경로: index.html 제공
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// 로그인 엔드포인트 (주석 처리: 실제 로직은 백엔드에서 제공)
// app.post('/api/login', (req, res) => {
//     const { user_id, user_pw } = req.body;
//     // 백엔드에서 정보를 줌
//     // 예: 사용자 인증 후 성공 시 { success: true } 반환
//     res.json({ success: true });
// });

// 회원가입 엔드포인트 (주석 처리: 실제 로직은 백엔드에서 제공)
// app.post('/api/signup', (req, res) => {
//     const { user_id, user_pw, nickname } = req.body;
//     // 백엔드에서 정보를 줌
//     // 예: 사용자 등록 후 성공 시 { success: true } 반환
//     res.json({ success: true });
// });

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다!`);
});