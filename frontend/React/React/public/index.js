const menuData = [
    { id: 1, title: "임시 목록 1" },
    { id: 2, title: "임시 목록 2" }
];

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainScreen = document.getElementById('main-screen');
    const menuScreen = document.getElementById('menu-screen');
    const overlay = document.getElementById('overlay');
    const settingsModal = document.getElementById('settings-modal');
    const menuButton = document.getElementById('menu-button');
    const profileButton = document.getElementById('profile-button');
    const settingsButton = document.getElementById('settings-button');
    const closeSettingsButton = document.getElementById('close-settings');
    const darkModeButton = document.getElementById('dark-mode-button');
    const timerDisplay = document.getElementById('timer');
    const timerButton = document.getElementById('timer-button');

    let timerInterval = null;
    let seconds = 0;

    function updateTimerDisplay() {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        timerDisplay.textContent = `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);
        timerButton.textContent = '종료';
        timerButton.className = 'px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600';
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        seconds = 0;
        updateTimerDisplay();
        timerButton.textContent = '시작';
        timerButton.className = 'px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600';
    }

    timerButton.addEventListener('click', () => {
        if (timerInterval) {
            stopTimer();
        } else {
            startTimer();
        }
    });

    const menuItemsContainer = document.getElementById('menu-items');
    menuData.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'p-2 border-b border-gray-200';
        div.textContent = item.title;
        menuItemsContainer.appendChild(div);
    });

    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainScreen.style.display = 'block';
    }, 2000);

    menuButton.addEventListener('click', () => {
        menuScreen.style.display = 'block';
        overlay.style.display = 'block';
    });

    overlay.addEventListener('click', () => {
        menuScreen.style.display = 'none';
        settingsModal.style.display = 'none';
        overlay.style.display = 'none';
    });

    profileButton.addEventListener('click', () => {
        alert('테스트 중입니다');
    });

    settingsButton.addEventListener('click', () => {
        settingsModal.style.display = 'block';
        overlay.style.display = 'block';
    });

    closeSettingsButton.addEventListener('click', () => {
        settingsModal.style.display = 'none';
        overlay.style.display = 'none';
    });

    darkModeButton.addEventListener('click', () => {
        alert('다크 모드: 준비 중입니다!');
    });
});