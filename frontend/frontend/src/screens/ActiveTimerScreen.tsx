import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 실제 타이머가 동작하고 운동 정보가 표시될 화면입니다.
const ActiveTimerScreen = () => {
  return (
    <View style={styles.container}>
      <Text>운동 중... (화면 구현 예정)</Text>
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

export default ActiveTimerScreen;
