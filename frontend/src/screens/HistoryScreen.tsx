import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView, // 시스템 UI (노치 등)를 피하기 위한 컴포넌트
  ScrollView, // 화면 콘텐츠가 길어질 경우 스크롤을 가능하게 함
  TouchableOpacity, // 클릭 가능한 영역을 만들기 위해 추가
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RecordStackParamList } from '../types/navigation'; // RecordStackParamList 타입을 가져옵니다.

// 네비게이션 props 타입을 RecordStackParamList에 맞게 정의합니다.
type Props = NativeStackScreenProps<RecordStackParamList, 'RecordHome'>;

// --- 임시 데이터 --- //

// 나무의 12단계 성장 과정을 정의한 데이터입니다.
// 나중에 실제 이미지 파일 이름이나 URL로 교체할 수 있습니다.
const treeGrowthStages = [
  { stage: 1, imagePlaceholder: '묘목', title: '새로운 시작!', bio: '아직은 묘목이지만 분명 큰 나무가 될 수 있을 거예요!' },
  { stage: 2, imagePlaceholder: '새싹', title: '새싹이 돋아났어요!', bio: '작은 변화가 큰 성장을 만들어요.' },
  { stage: 3, imagePlaceholder: '작은 나무', title: '제법 나무 티가 나요!', bio: '꾸준함이 당신을 성장시키고 있어요.' },
  { stage: 4, imagePlaceholder: '푸른 나무', title: '잎이 무성해졌어요!', bio: '당신의 노력이 푸르게 빛나고 있어요.' },
  { stage: 5, imagePlaceholder: '튼튼한 나무', title: '뿌리 깊은 나무!', bio: '어떤 시련에도 흔들리지 않을 거예요.' },
  { stage: 6, imagePlaceholder: '꽃 피는 나무', title: '아름다운 결실!', bio: '당신의 노력이 꽃을 피웠어요.' },
  { stage: 7, imagePlaceholder: '열매 맺는 나무', title: '풍성한 수확!', bio: '달콤한 열매처럼 보람을 느껴보세요.' },
  { stage: 8, imagePlaceholder: '울창한 나무', title: '숲을 이루는 나무!', bio: '당신의 존재가 주변에 큰 영향을 줍니다.' },
  { stage: 9, imagePlaceholder: '고목', title: '세월의 흔적!', bio: '오랜 시간 쌓아온 지혜와 경험이 빛나요.' },
  { stage: 10, imagePlaceholder: '신성한 나무', title: '경외로운 존재!', bio: '모두가 당신을 우러러봅니다.' },
  { stage: 11, imagePlaceholder: '생명의 나무', title: '생명을 불어넣는 나무!', bio: '당신은 주변에 긍정적인 에너지를 전파합니다.' },
  { stage: 12, imagePlaceholder: '세계수', title: '숲의 지배자!', bio: '당신은 마침내 위대한 나무를 키워냈습니다!' },
];

// 친구 목록 임시 데이터입니다.
const friendsData = [
  { name: '철수', treeStage: 3 },
  { name: '영희', treeStage: 2 },
  { name: '민준', treeStage: 4 },
  { name: '서연', treeStage: 1 },
  { name: '지훈', treeStage: 3 },
  { name: '유진', treeStage: 2 },
  { name: '동수', treeStage: 5 },
  { name: '미나', treeStage: 6 },
  { name: '준호', treeStage: 7 },
];

// 기록 & 친구 화면 컴포넌트
const HistoryScreen: React.FC<Props> = ({ navigation }) => {
  // 현재 사용자의 나무 성장 단계를 설정합니다. (개발 단계에서는 1단계로 고정)
  const currentUserStage = treeGrowthStages[0]; // 1단계 묘목

  // 사용자 카드를 클릭했을 때 상세 기록 화면으로 이동하는 함수
  const handleUserCardPress = () => {
    navigation.navigate('RecordDetail');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 1. 사용자 나무 성장 카드 (클릭 가능) */}
        <TouchableOpacity style={styles.userCard} onPress={handleUserCardPress}>
          {/* 나무 이미지 플레이스홀더 */}
          <View style={styles.treeContainer}>
            <Text style={styles.treeImageText}>[{currentUserStage.imagePlaceholder}]</Text>
          </View>
          {/* 성장 정보 */}
          <View style={styles.userInfo}>
            <Text style={styles.userTitle}>{currentUserStage.title}</Text>
            <Text style={styles.userBio}>{currentUserStage.bio}</Text>
          </View>
        </TouchableOpacity>

        {/* 2. 친구들의 나무 그리드 */}
        <Text style={styles.friendsHeader}>친구들의 나무</Text>
        <View style={styles.friendsGrid}>
          {friendsData.map((friend, index) => {
            // 친구의 나무 성장 단계를 가져옵니다.
            // friend.treeStage는 1부터 시작하므로 배열 인덱스를 위해 -1 해줍니다.
            const friendTree = treeGrowthStages[friend.treeStage - 1] || treeGrowthStages[0];
            return (
              <View key={index} style={styles.friendItem}>
                <View style={styles.friendTreeContainer}>
                  <Text style={styles.friendTreeImageText}>[{friendTree.imagePlaceholder}]</Text>
                </View>
                <Text style={styles.friendName}>{friend.name}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  // 사용자 카드 스타일
  userCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3, // 안드로이드 그림자
    shadowColor: '#000', // iOS 그림자
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  treeContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 15,
  },
  treeImageText: {
    fontSize: 16,
    color: '#555',
  },
  userInfo: {
    flex: 1,
  },
  userTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userBio: {
    fontSize: 14,
    color: '#666',
  },
  // 친구 그리드 스타일
  friendsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  friendsGrid: {
    flexDirection: 'row', // 가로로 배열
    flexWrap: 'wrap', // 공간이 부족하면 다음 줄로 넘김
    justifyContent: 'space-between', // 아이템 사이의 간격을 균등하게 분배
  },
  friendItem: {
    width: '32%', // 한 줄에 3개씩 배치하기 위해 33.33%보다 약간 작은 값으로 설정
    alignItems: 'center',
    marginBottom: 20,
  },
  friendTreeContainer: {
    width: '100%',
    aspectRatio: 1, // 가로:세로 비율을 1:1로 만들어 정사각형으로 유지
    backgroundColor: '#e9e9e9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  friendTreeImageText: {
    fontSize: 12, // 글씨 크기 줄임
    color: '#555',
  },
  friendName: {
    marginTop: 8,
    fontSize: 14, // 글씨 크기 줄임
    fontWeight: '500',
  },
});

export default HistoryScreen;