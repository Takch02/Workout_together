// JSON 데이터: 목록 항목을 정의합니다.
const menuData = [
    { id: 1, title: "임시 목록 1" },
    { id: 2, title: "임시 목록 2" }
];

// 페이지가 로드되면 실행되는 함수
document.addEventListener('DOMContentLoaded', () => {
    // 로딩 화면 요소
    const loadingScreen = document.getElementById('loading-screen');
    // 메인 화면 요소
    const mainScreen = document.getElementById('main-screen');
    // 목록 화면 요소
    const menuScreen = document.getElementById('menu-screen');
    // 반투명 오버레이
    const overlay = document.getElementById('overlay');
    // 설정 모달 창
    const settingsModal = document.getElementById('settings-modal');
    // 버튼 요소들
    const menuButton = document.getElementById('menu-button');
    const profileButton = document.getElementById('profile-button');
    const settingsButton = document.getElementById('settings-button');
    const closeSettingsButton = document.getElementById('close-settings');
    const darkModeButton = document.getElementById('dark-mode-button');

    // JSON 데이터를 사용해 목록 항목을 동적으로 추가
    const menuItemsContainer = document.getElementById('menu-items');
    menuData.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'p-2 border-b border-gray-200'; // 얇은 회색 선
        div.textContent = item.title;
        menuItemsContainer.appendChild(div);
    });

    // 2초 후 로딩 화면 숨기고 메인 화면 표시
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainScreen.style.display = 'block';
    }, 2000);

    // 목록 버튼 클릭: 목록 화면과 오버레이 표시
    menuButton.addEventListener('click', () => {
        menuScreen.style.display = 'block';
        overlay.style.display = 'block';
    });

    // 오버레이 클릭: 목록 화면 닫기
    overlay.addEventListener('click', () => {
        menuScreen.style.display = 'none';
        overlay.style.display = 'none';
    });

    // 프로필 버튼 클릭: 테스트 알림창
    profileButton.addEventListener('click', () => {
        alert('테스트 중입니다');
    });

    // 설정 버튼 클릭: 설정 모달 표시
    settingsButton.addEventListener('click', () => {
        settingsModal.style.display = 'block';
        overlay.style.display = 'block';
    });

    // 설정 닫기 버튼 클릭
    closeSettingsButton.addEventListener('click', () => {
        settingsModal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // 다크 모드 버튼 클릭: 현재는 알림만 표시
    darkModeButton.addEventListener('click', () => {
        alert('다크 모드: 준비 중입니다!');
    });
});