import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView, // 기록이 많아지면 스크롤이 필요합니다.
  FlatList, // 긴 목록을 효율적으로 렌더링하기에 최적화된 컴포넌트입니다.
} from 'react-native';

// --- 임시 기록 데이터 ---
// 실제로는 백엔드 API나 로컬 저장소에서 이 데이터를 가져와야 합니다.
const mockRecords = [
  { id: '1', date: '2025년 7월 21일', duration: 35 },
  { id: '2', date: '2025년 7월 20일', duration: 45 },
  { id: '3', date: '2025년 7월 18일', duration: 60 },
  { id: '4', date: '2025년 7월 17일', duration: 25 },
  { id: '5', date: '2025년 7월 16일', duration: 55 },
  { id: '6', date: '2025년 7월 15일', duration: 40 },
  { id: '7', date: '2025년 7월 14일', duration: 70 },
];

// FlatList의 각 아이템을 렌더링하는 컴포넌트입니다.
const RecordItem = ({ item }: { item: typeof mockRecords[0] }) => (
  <View style={styles.recordItem}>
    <Text style={styles.recordText}>
      {item.date} (타이머 기록상){' '}
      <Text style={styles.durationText}>{item.duration}분</Text> 운동했어요!
    </Text>
  </View>
);

// 상세 기록 화면 컴포넌트
const RecordDetailScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* FlatList를 사용하여 기록 목록을 표시합니다. */}
      <FlatList
        data={mockRecords} // 표시할 데이터
        renderItem={RecordItem} // 각 아이템을 렌더링할 함수
        keyExtractor={item => item.id} // 각 아이템의 고유 키
        contentContainerStyle={styles.listContainer} // 리스트 전체의 스타일
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 20,
  },
  recordItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  recordText: {
    fontSize: 16,
    color: '#333',
  },
  durationText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default RecordDetailScreen;
