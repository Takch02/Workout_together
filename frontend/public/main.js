const menuButton = document.getElementById('menu-button');
const profileButton = document.getElementById('profile-button');
const settingsButton = document.getElementById('settings-button');
const closeSettingsButton = document.getElementById('close-settings');
const darkModeButton = document.getElementById('dark-mode-button');
const timerDisplay = document.getElementById('timer');
const timerButton = document.getElementById('timer-button');
const settingsModal = document.getElementById('settings-modal');
const menuScreen = document.getElementById('menu-screen');
const overlay = document.getElementById('overlay');

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

const menuData = [];

// 메뉴 항목 동적 생성
const menuItemsContainer = document.getElementById('menu-items');
menuData.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'p-2 border-b border-gray-200';
    div.textContent = item.title;
    menuItemsContainer.appendChild(div);
});

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