// JSON 데이터: 메뉴 항목 정의
const menuData = [
    { id: 1, title: "임시 목록 1" },
    { id: 2, title: "임시 목록 2" }
];

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 요소 가져오기
    const loadingScreen = document.getElementById('loading-screen');
    const authScreen = document.getElementById('auth-screen');
    const mainScreen = document.getElementById('main-screen');
    const menuScreen = document.getElementById('menu-screen');
    const overlay = document.getElementById('overlay');
    const settingsModal = document.getElementById('settings-modal');
    const signupModal = document.getElementById('signup-modal');
    const menuButton = document.getElementById('menu-button');
    const profileButton = document.getElementById('profile-button');
    const settingsButton = document.getElementById('settings-button');
    const closeSettingsButton = document.getElementById('close-settings');
    const darkModeButton = document.getElementById('dark-mode-button');
    const timerDisplay = document.getElementById('timer');
    const timerButton = document.getElementById('timer-button');
    const loginButton = document.getElementById('login-button');
    const signupLink = document.getElementById('signup-link');
    const signupButton = document.getElementById('signup-button');
    const closeSignupButton = document.getElementById('close-signup');
    const loginIdInput = document.getElementById('login-id');
    const loginPwInput = document.getElementById('login-pw');
    const signupIdInput = document.getElementById('signup-id');
    const signupPwInput = document.getElementById('signup-pw');
    const signupNicknameInput = document.getElementById('signup-nickname');

    // 타이머 변수
    let timerInterval = null;
    let seconds = 0;

    // 타이머 표시 업데이트
    function updateTimerDisplay() {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        timerDisplay.textContent = `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    // 타이머 시작
    function startTimer() {
        timerInterval = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);
        timerButton.textContent = '종료';
        timerButton.className = 'px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600';
    }

    // 타이머 종료 및 리셋
    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        seconds = 0;
        updateTimerDisplay();
        timerButton.textContent = '시작';
        timerButton.className = 'px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600';
    }

    // 타이머 버튼 클릭 이벤트
    timerButton.addEventListener('click', () => {
        if (timerInterval) {
            stopTimer();
        } else {
            startTimer();
        }
    });

    // 메뉴 항목 동적 생성
    const menuItemsContainer = document.getElementById('menu-items');
    menuData.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'p-2 border-b border-gray-200';
        div.textContent = item.title;
        menuItemsContainer.appendChild(div);
    });

    // 로딩 화면: 2초 후 로그인/회원가입 화면으로 전환
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        authScreen.style.display = 'flex';
    }, 2000);

    // 메뉴 버튼: 메뉴 화면 표시
    menuButton.addEventListener('click', () => {
        menuScreen.style.display = 'block';
        overlay.style.display = 'block';
    });

    // 오버레이 클릭: 메뉴, 설정, 회원가입 모달 닫기
    overlay.addEventListener('click', () => {
        menuScreen.style.display = 'none';
        settingsModal.style.display = 'none';
        signupModal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // 프로필 버튼: 테스트 알림
    profileButton.addEventListener('click', () => {
        alert('테스트 중입니다');
    });

    // 설정 버튼: 설정 모달 표시
    settingsButton.addEventListener('click', () => {
        settingsModal.style.display = 'block';
        overlay.style.display = 'block';
    });

    // 설정 닫기 버튼
    closeSettingsButton.addEventListener('click', () => {
        settingsModal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // 다크 모드 버튼: 준비 중 알림
    darkModeButton.addEventListener('click', () => {
        alert('다크 모드: 준비 중입니다!');
    });

    // 회원가입 링크: 회원가입 모달 표시
    signupLink.addEventListener('click', () => {
        signupModal.style.display = 'block';
        overlay.style.display = 'block';
    });

    // 회원가입 모달 닫기 버튼
    closeSignupButton.addEventListener('click', () => {
        signupModal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // 로그인 버튼: 백엔드에 데이터 전송
    loginButton.addEventListener('click', async () => {
        const user_id = loginIdInput.value.trim();
        const user_pw = loginPwInput.value.trim();
        if (!user_id || !user_pw) {
            alert('ID와 비밀번호를 입력하세요.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id, user_pw })
            });
            const data = await response.json();
            // 백엔드에서 정보를 줌
            if (data.success) {
                authScreen.style.display = 'none';
                mainScreen.style.display = 'block';
            } else {
                alert('로그인 실패');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('서버 오류가 발생했습니다.');
        }
    });

    // 회원가입 버튼: 백엔드에 데이터 전송
    signupButton.addEventListener('click', async () => {
        const user_id = signupIdInput.value.trim();
        const user_pw = signupPwInput.value.trim();
        const nickname = signupNicknameInput.value.trim();
        if (!user_id || !user_pw || !nickname) {
            alert('모든 필드를 입력하세요.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id, user_pw, nickname })
            });
            const data = await response.json();
            // 백엔드에서 정보를 줌
            if (data.success) {
                alert('회원가입 성공! 로그인 화면으로 이동합니다.');
                signupModal.style.display = 'none';
                overlay.style.display = 'none';
                signupIdInput.value = '';
                signupPwInput.value = '';
                signupNicknameInput.value = '';
            } else {
                alert('회원가입 실패');
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
            alert('서버 오류가 발생했습니다.');
        }
    });
});