import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView, // 내용이 길어질 경우 스크롤을 위해 추가합니다.
  KeyboardAvoidingView, // 키보드가 입력창을 가리는 것을 방지하기 위해 추가합니다.
  Platform, // OS에 따라 다른 동작을 설정하기 위해 추가합니다.
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import {API_URL, LOCAL_SERVER} from '../domain/config.js'

// 네비게이션 props 타입을 정의합니다.
type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

// 회원가입 화면 컴포넌트입니다.
const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  // 각 입력 필드의 상태를 관리하는 useState 훅들입니다.
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  // const [email, setEmail] = useState(''); // 이메일 입력 칸 제거로 인해 주석 처리

  // 회원가입 버튼을 눌렀을 때 실행될 함수입니다.
  const handleSignUp = async () => {
    // 1. 입력 값 유효성 검사 (비어있는 필드가 있는지 확인)
    // 이메일 입력 칸 제거로 인해 !email 조건 제거
    if (!userId || !password || !passwordConfirm || !nickname) {
      Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
      return; // 함수 실행 중단
    }

    // 2. 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (password !== passwordConfirm) {
      Alert.alert('입력 오류', '비밀번호가 일치하지 않습니다.');
      return; // 함수 실행 중단
    }
    console.log('이제 fetch 작동');
    // TODO: 실제 백엔드 API에 회원가입 요청을 보내야 합니다.
     const response = await fetch(`${LOCAL_SERVER}/user/join`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ user_id: userId, user_pw: password, nickname: nickname }), // 백엔드 요구사항에 맞춰 필드명 변경
     });
     console.log(response);
     const data = await response.json();
     if (response.ok) {
       Alert.alert('회원가입 완료', '로그인 화면으로 이동합니다.');
       navigation.navigate('Login');
     } else {
       Alert.alert('회원가입 실패', data.message);
     }

    // 3. 모든 검사를 통과하면 완료 메시지를 띄웁니다.
    Alert.alert('회원가입 완료!');
  };

  return (
    // KeyboardAvoidingView는 키보드가 나타날 때 화면을 밀어올려 입력창이 가려지지 않게 합니다.
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // OS에 따라 동작 방식 설정
      style={styles.container}
    >
      {/* ScrollView는 화면 내용이 길어져도 스크롤하여 볼 수 있게 합니다. */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>회원가입</Text>

        {/* 각 입력 필드들을 정의합니다. */}
        <TextInput
          style={styles.input}
          placeholder="아이디"
          value={userId}
          onChangeText={setUserId}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry // 비밀번호를 별표(*)로 표시
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry // 비밀번호를 별표(*)로 표시
        />
        <TextInput
          style={styles.input}
          placeholder="닉네임"
          value={nickname}
          onChangeText={setNickname}
        />
        {/* 이메일 입력 칸 제거
        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" // 이메일용 키보드 표시
        />
        */}

        <View style={styles.buttonContainer}>
          <Button title="회원가입" onPress={handleSignUp} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="로그인 화면으로 돌아가기"
            onPress={() => navigation.goBack()} // 이전 화면(로그인)으로 돌아가기
            color="#888" // 버튼 색상 변경
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// 스타일 객체
const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 차지
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', // 세로 방향 중앙 정렬
    alignItems: 'center', // 가로 방향 중앙 정렬
    padding: 20, // 전체적인 안쪽 여백
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40, // 제목과 입력 필드 사이의 간격
  },
  input: {
    width: '100%', // 가로 너비 100%
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15, // 안쪽 여백
    marginBottom: 15, // 각 입력 필드 사이의 간격
    borderRadius: 8, // 테두리 둥글게
  },
  buttonContainer: {
    width: '100%', // 가로 너비 100%
    marginTop: 10, // 버튼 위쪽 간격
  },
});

export default SignUpScreen;