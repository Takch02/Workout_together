import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity, // Button보다 자유로운 스타일링이 가능한 터치 컴포넌트입니다.
  SafeAreaView, // 아이폰의 노치 같은 영역을 피해 콘텐츠를 안전하게 표시합니다.
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TimerStackParamList } from '../types/navigation';

// 네비게이션 props 타입을 TimerStackParamList에 맞게 정의합니다.
type Props = NativeStackScreenProps<TimerStackParamList, 'TimerHome'>;

// 타이머 탭의 메인 화면 컴포넌트입니다.
const TimerScreen: React.FC<Props> = ({ navigation }) => {
  // (테스트) 버튼을 눌렀을 때 실행될 함수입니다.
  const handleStartTestWorkout = () => {
    // ActiveTimer 화면으로 이동하며, 'workoutName' 파라미터로 '테스트'를 전달합니다.
    navigation.navigate('ActiveTimer', { workoutName: '테스트' });
  };

  // '+ 종목 추가하기' 버튼을 눌렀을 때 실행될 함수입니다.
  const handleAddWorkout = () => {
    // AddWorkout 화면으로 이동합니다.
    navigation.navigate('AddWorkout');
  };

  return (
    // SafeAreaView를 사용하여 시스템 UI를 피합니다.
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 상단 타이머 디스플레이 영역 */}
        <View style={styles.timerDisplayContainer}>
          <Text style={styles.timerText}>00:00:00</Text>
        </View>

        {/* 운동 종목 버튼 목록 (현재는 테스트 버튼만 존재) */}
        <View style={styles.workoutListContainer}>
          {/* (테스트) 운동 버튼 */}
          <TouchableOpacity style={styles.workoutButton} onPress={handleStartTestWorkout}>
            <Text style={styles.workoutButtonText}>(테스트)</Text>
            {/* 아이콘 라이브러리 설치 전 임시 재생 버튼 */}
            <Text style={styles.playIcon}>▶</Text>
          </TouchableOpacity>

          {/* TODO: 사용자가 추가한 운동 종목 목록이 여기에 렌더링될 것입니다. */}
        </View>

        {/* 하단 종목 추가 버튼 */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddWorkout}>
          <Text style={styles.addButtonText}>+ 종목 추가하기</Text>
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
  // 상단 타이머 디스플레이 스타일
  timerDisplayContainer: {
    flex: 1, // 남은 공간의 1/3을 차지
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 64, // 매우 큰 폰트 사이즈
    fontWeight: '200', // 얇은 폰트 두께
    color: '#000',
  },
  // 운동 목록 스타일
  workoutListContainer: {
    flex: 2, // 남은 공간의 2/3을 차지
  },
  workoutButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    flexDirection: 'row', // 자식 요소들을 가로로 배열
    justifyContent: 'space-between', // 양쪽 끝으로 정렬
    alignItems: 'center',
    marginBottom: 10,
  },
  workoutButtonText: {
    fontSize: 18,
  },
  playIcon: {
    fontSize: 18,
    color: '#007AFF',
  },
  // 하단 추가 버튼 스타일
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TimerScreen;