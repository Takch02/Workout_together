// Express 라이브러리를 불러옵니다. 웹 서버를 쉽게 만들 수 있게 해줍니다.
const express = require('express');
// Express 애플리케이션 객체를 생성합니다.
const app = express();
// 서버가 사용할 포트 번호를 설정합니다.
const port = 3000;

// 정적 파일(HTML, CSS, JS)을 제공하기 위해 public 폴더를 설정합니다.
app.use(express.static('public'));

// "/" 경로로 들어오면 index.html을 보냅니다.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// 서버를 시작합니다.
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다!`);
});