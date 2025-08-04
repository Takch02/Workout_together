import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// --- 스크린 임포트 ---
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TimerScreen from './src/screens/TimerScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ActiveTimerScreen from './src/screens/ActiveTimerScreen';
import AddWorkoutScreen from './src/screens/AddWorkoutScreen';
import RecordDetailScreen from './src/screens/RecordDetailScreen';

// --- 네비게이션 타입 임포트 ---
import {
  RootStackParamList,
  AuthStackParamList,
  MainTabParamList,
  TimerStackParamList,
  RecordStackParamList,
} from './src/types/navigation';

// --- 네비게이터 생성 ---
const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const TimerStackNav = createNativeStackNavigator<TimerStackParamList>();
const RecordStackNav = createNativeStackNavigator<RecordStackParamList>();

/**
 * 인증 스택 네비게이터 (로그인/회원가입)
 * @returns 로그인, 회원가입 화면을 포함하는 스택 네비게이터
 */
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

/**
 * 기록 탭 내부에서 사용될 스택 네비게이터입니다.
 */
const RecordStackNavigator = () => (
  <RecordStackNav.Navigator
    screenOptions={{
      headerBackTitle: '',
      headerTintColor: '#000',
    }}
  >
    <RecordStackNav.Screen
      name="RecordHome"
      component={HistoryScreen}
      options={{ headerShown: false }}
    />
    <RecordStackNav.Screen
      name="RecordDetail"
      component={RecordDetailScreen}
      options={{ title: '나의 운동 기록' }}
    />
  </RecordStackNav.Navigator>
);

/**
 * 타이머 탭 내부에서 사용될 스택 네비게이터입니다.
 */
const TimerStackNavigator = () => (
  <TimerStackNav.Navigator
    screenOptions={{
      headerBackTitle: '',
      headerTintColor: '#000',
    }}
  >
    <TimerStackNav.Screen
      name="TimerHome"
      component={TimerScreen}
      options={{ headerShown: false }}
    />
    <TimerStackNav.Screen
      name="ActiveTimer"
      component={ActiveTimerScreen}
      options={{ title: '운동 중' }}
    />
    <TimerStackNav.Screen
      name="AddWorkout"
      component={AddWorkoutScreen}
      options={{ title: '종목 추가하기' }}
    />
  </TimerStackNav.Navigator>
);

/**
 * 앱의 메인 하단 탭 네비게이터입니다.
 */
const MainNavigator = () => (
  <MainTab.Navigator
    initialRouteName="TimerStack"
    screenOptions={{
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: 'gray',
    }}
  >
    <MainTab.Screen
      name="RecordStack"
      component={RecordStackNavigator}
      options={{ title: '기록&친구', headerShown: false }}
    />
    <MainTab.Screen
      name="TimerStack"
      component={TimerStackNavigator}
      options={{ title: '타이머', headerShown: false }}
    />
    <MainTab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: '프로필&설정' }}
    />
  </MainTab.Navigator>
);

/**
 * 앱의 최상위 컴포넌트
 * 로그인 상태에 따라 다른 네비게이터를 보여주는 최상위 관제탑 역할을 합니다.
 */
const App = () => {
  // 실제 앱에서는 AsyncStorage나 Context API 등을 사용하여 로그인 상태를 관리해야 합니다.
  // 지금은 임시로 useState를 사용하여 로그인 상태를 시뮬레이션합니다.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* 로그인 상태 분기 로직을 다시 활성화합니다. */}
        {isLoggedIn ? (
          // 로그인 상태일 때: 메인 탭 네비게이터를 보여줍니다.
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          // 로그아웃 상태일 때: 인증 스택 네비게이터를 보여줍니다.
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
