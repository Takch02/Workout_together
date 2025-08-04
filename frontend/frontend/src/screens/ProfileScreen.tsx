import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity, // 터치 효과를 줄 수 있는 버튼 컴포넌트
  Alert, // 네이티브 알림창을 띄우는 컴포넌트
} from 'react-native';

// 프로필 화면 컴포넌트
const ProfileScreen = () => {
  // '설정' 버튼을 눌렀을 때 실행될 함수
  const handleSettingsPress = () => {
    // Alert.alert를 사용하여 사용자에게 선택지를 제공하는 알림창을 띄웁니다.
    Alert.alert(
      '앱 디자인', // 알림창 제목
      '앱의 테마를 선택하세요.', // 알림창 내용
      [
        // 선택 버튼 배열
        {
          text: '라이트 모드',
          onPress: () => console.log('Light Mode Selected'), // TODO: 라이트 모드 적용 로직 구현
        },
        {
          text: '다크 모드',
          onPress: () => console.log('Dark Mode Selected'), // TODO: 다크 모드 적용 로직 구현
        },
        {
          text: '시스템 설정 따르기',
          onPress: () => console.log('System Setting Selected'), // TODO: 시스템 설정 연동 로직 구현
        },
        {
          text: '취소',
          style: 'cancel', // 'cancel' 스타일은 보통 iOS에서 특별한 UI로 표시됩니다.
        },
      ],
      { cancelable: true } // 안드로이드에서 알림창 바깥을 터치하여 닫을 수 있게 합니다.
    );
  };

  // 임시 버튼들을 눌렀을 때 실행될 공통 함수
  const handleTempButtonPress = (buttonName: string) => {
    Alert.alert('알림', `(${buttonName}) 임시 버튼입니다`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 1. 프로필 카드 UI */}
        <View style={styles.profileCard}>
          {/* 임시 프로필 사진 */}
          <View style={styles.profileImage} />
          {/* 닉네임과 한줄소개 */}
          <View style={styles.profileInfo}>
            <Text style={styles.nickname}>임시 닉네임</Text>
            <Text style={styles.bio}>임시 한줄소개입니다. 반갑습니다!</Text>
          </View>
        </View>

        {/* 2. 기능 버튼 목록 */}
        <TouchableOpacity style={styles.menuButton} onPress={handleSettingsPress}>
          <Text style={styles.menuButtonText}>설정</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => handleTempButtonPress('이용약관')}
        >
          <Text style={styles.menuButtonText}>이용약관</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => handleTempButtonPress('앱 버전')}
        >
          <Text style={styles.menuButtonText}>앱 버전</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => handleTempButtonPress('건의&문의사항')}
        >
          <Text style={styles.menuButtonText}>건의&문의사항</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => handleTempButtonPress('회원탈퇴')}
        >
          <Text style={[styles.menuButtonText, styles.deleteText]}>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  // 프로필 카드 스타일
  profileCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15, // 약간 둥근 모서리
    padding: 20,
    flexDirection: 'row', // 자식 요소들을 가로로 배열
    alignItems: 'center', // 세로 중앙 정렬
    marginBottom: 30, // 카드와 버튼 목록 사이의 간격
    // 그림자 효과 (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // 그림자 효과 (Android)
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // 원형으로 만듦
    backgroundColor: '#ccc', // 임시 프로필 사진 색상
    marginRight: 15, // 사진과 텍스트 사이 간격
  },
  profileInfo: {
    flex: 1, // 남은 공간을 모두 차지
  },
  nickname: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    color: '#666',
  },
  // 메뉴 버튼 스타일
  menuButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuButtonText: {
    fontSize: 16,
  },
  // 회원탈퇴 버튼 전용 빨간색 텍스트
  deleteText: {
    color: 'red',
  },
});

export default ProfileScreen;