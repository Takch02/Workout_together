import React from 'react'; // 리액트를 가져옵니다.
import { View, Text, Button, StyleSheet } from 'react-native'; // 리액트 네이티브의 핵심 UI 컴포넌트들을 가져옵니다.
import { NativeStackScreenProps } from '@react-navigation/native-stack'; // 네비게이션 스크린의 props 타입을 정의하기 위해 가져옵니다.
import { RootStackParamList } from '../types/navigation'; // 네비게이션 파라미터 타입을 정의한 파일을 가져옵니다.

// HomeScreen이 네비게이션으로부터 받을 props의 타입을 정의합니다. 'Home' 스크린에 해당합니다.
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// 홈 화면을 구성하는 함수형 컴포넌트입니다.
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // 화면에 보여질 JSX 코드를 반환합니다.
  return (
    // View는 화면의 구역을 나누는 컨테이너입니다. styles.container 스타일이 적용됩니다.
    <View style={styles.container}>
      {/* 화면 제목 텍스트입니다. */}
      <Text style={styles.text}>홈 화면</Text>
      {/* 상세 화면으로 이동하는 버튼입니다. */}
      <Button
        title="상세 화면으로 이동"
        // 버튼을 누르면 'Details' 스크린으로 이동합니다.
        onPress={() =>
          // navigate 함수를 사용하여 이동하며, 두 번째 인자로 파라미터를 전달할 수 있습니다.
          navigation.navigate('Details', { itemId: 123, message: '안녕하세요!' })
        }
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
    backgroundColor: '#f0f0f0', // 배경색을 설정합니다.
  },
  text: {
    fontSize: 24, // 글자 크기
    marginBottom: 20, // 아래쪽 바깥 여백
  },
});

// 이 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냅니다.
export default HomeScreen;
