import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation'; // 인증 스택 타입을 가져옵니다.
import {API_URL, LOCAL_SERVER} from '../domain/config.js'

// Props 타입을 AuthStackParamList에 맞게 수정합니다.
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [userId, setUserId] = useState(''); // email 대신 userId로 변경
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
      console.log('백엔드로 요청 보냄')
    // TODO: 실제 백엔드 API에 로그인 요청을 보내야 합니다.
     const response = await fetch(`${LOCAL_SERVER}/user/login`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ user_id: userId, user_pw: password }), // 백엔드 요구사항에 맞춰 필드명 변경
     });
     const data = await response.json();
     if (response.ok) {
       // 로그인 성공 시 App.tsx의 isLoggedIn 상태를 true로 변경해야 합니다.
         console.log(response);
     } else {
       Alert.alert('로그인 실패', data.message);
     }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>운동 타이머 앱</Text>
      <TextInput
        style={styles.input}
        value={userId} // email 대신 userId 사용
        onChangeText={setUserId} // setEmail 대신 setUserId 사용
        placeholder="아이디" // placeholder 변경
        keyboardType="default" // 이메일 키보드 타입 제거
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="비밀번호"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="로그인" onPress={handleLogin} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="회원가입"
          onPress={() => navigation.navigate('SignUp')} // SignUp 스크린으로 이동합니다.
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});

export default LoginScreen;
