import React from 'react'; // 리액트를 가져옵니다.
import { View, Text, Button, StyleSheet } from 'react-native'; // 리액트 네이티브의 핵심 UI 컴포넌트들을 가져옵니다.
import { NativeStackScreenProps } from '@react-navigation/native-stack'; // 네비게이션 스크린의 props 타입을 정의하기 위해 가져옵니다.
import { RootStackParamList } from '../types/navigation'; // 네비게이션 파라미터 타입을 정의한 파일을 가져옵니다.

// DetailsScreen이 네비게이션으로부터 받을 props의 타입을 정의합니다. 'Details' 스크린에 해당합니다.
type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

// 상세 화면을 구성하는 함수형 컴포넌트입니다.
// props에서 route와 navigation 객체를 구조 분해 할당으로 가져옵니다.
const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  // route.params에서 이전 화면(HomeScreen)에서 전달한 파라미터를 추출합니다.
  const { itemId, message } = route.params;

  // 화면에 보여질 JSX 코드를 반환합니다.
  return (
    // View는 화면의 구역을 나누는 컨테이너입니다. styles.container 스타일이 적용됩니다.
    <View style={styles.container}>
      {/* 화면 제목 텍스트입니다. */}
      <Text style={styles.text}>상세 화면</Text>
      {/* 전달받은 itemId를 화면에 표시합니다. */}
      <Text style={styles.text}>아이템 ID: {itemId}</Text>
      {/* 전달받은 message를 화면에 표시합니다. */}
      <Text style={styles.text}>메시지: {message}</Text>
      {/* 이전 화면으로 돌아가는 버튼입니다. */}
      <Button
        title="홈 화면으로 돌아가기"
        // 버튼을 누르면 navigation.goBack() 함수가 호출되어 바로 이전 화면으로 돌아갑니다.
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

// 스타일 객체를 정의합니다.
const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 차지합니다.
    justifyContent: 'center', // 자식 요소들을 세로 방향 중앙에 정렬합니다.
    alignItems: 'center', // 자식 요소들을 가로 방향 중앙에 정렬합니다.
    backgroundColor: '#e0e0e0', // 배경색을 설정합니다.
  },
  text: {
    fontSize: 24, // 글자 크기
    marginBottom: 20, // 아래쪽 바깥 여백
  },
});

// 이 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냅니다.
export default DetailsScreen;
