import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 사용자가 새로운 운동 종목을 추가하는 화면입니다.
const AddWorkoutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>종목 추가하기 (화면 구현 예정)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddWorkoutScreen;
