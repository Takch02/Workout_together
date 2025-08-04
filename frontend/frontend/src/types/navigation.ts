// src/types/navigation.ts

import { NavigatorScreenParams } from '@react-navigation/native';

// --- 최상위 네비게이터 --- //
export type RootStackParamList = {
  Auth: undefined; // Auth 스크린 자체는 파라미터를 받지 않습니다.
  Main: NavigatorScreenParams<MainTabParamList>; // Main 스크린은 이제 MainTabParamList 타입을 참조합니다.
};

// --- 인증 스택 (로그인, 회원가입) 내의 스크린 목록과 파라미터 타입을 정의합니다. ---
export type AuthStackParamList = {
  Login: undefined; // 로그인 스크린은 파라미터를 받지 않습니다.
  SignUp: undefined; // 회원가입 스크린은 파라미터를 받지 않습니다.
};

// --- 메인 앱 하단 탭 네비게이터 --- //
export type MainTabParamList = {
  RecordStack: NavigatorScreenParams<RecordStackParamList>; // '기록' 탭도 이제 스택 네비게이터입니다.
  TimerStack: NavigatorScreenParams<TimerStackParamList>;
  Profile: undefined;
};

// --- 기록 탭 내부의 스택 네비게이터 --- //
export type RecordStackParamList = {
  RecordHome: undefined; // 기록 탭의 메인 화면 (나무, 친구 그리드)
  RecordDetail: undefined; // 상세 운동 기록 목록 화면
};

// --- 타이머 탭 내부의 스택 네비게이터 --- //
export type TimerStackParamList = {
  TimerHome: undefined;
  ActiveTimer: { workoutName: string };
  AddWorkout: undefined;
};