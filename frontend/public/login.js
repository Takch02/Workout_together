// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 요소 가져오기
    const loadingScreen = document.getElementById('loading-screen');
    const authScreen = document.getElementById('auth-screen');
    
    const overlay = document.getElementById('overlay');
    const signupModal = document.getElementById('signup-modal');
    const loginButton = document.getElementById('login-button');
    const signupLink = document.getElementById('signup-link');
    const signupButton = document.getElementById('signup-button');
    const closeSignupButton = document.getElementById('close-signup');
    const loginIdInput = document.getElementById('login-id');
    const loginPwInput = document.getElementById('login-pw');
    const signupIdInput = document.getElementById('signup-id');
    const signupPwInput = document.getElementById('signup-pw');
    const signupNicknameInput = document.getElementById('signup-nickname');


    // 로딩 화면: 2초 후 로그인/회원가입 화면으로 전환
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        authScreen.style.display = 'flex';
    }, 2000);



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
            const response = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id, user_pw }),
                credentials: 'include' // 인증 정보(쿠키)를 포함하여 요청
            });

            console.log('응답 상태:', response.status, 'OK:', response.ok);
            console.log('응답 헤더:', response.headers.get('content-type'));
            // 백엔드에서 정보를 줌
            if (response.ok) {

                window.location.href = '/main';

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
            const response = await fetch('http://localhost:8080/user/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id, user_pw, nickname }),
                credentials: 'include' // 인증 정보(쿠_키)를 포함하여 요청
            });

            console.log('응답 상태:', response.status, 'OK:', response.ok);
            console.log('응답 헤더:', response.headers.get('content-type'));
            // 백엔드에서 정보를 줌
            if (response.ok) {  //
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