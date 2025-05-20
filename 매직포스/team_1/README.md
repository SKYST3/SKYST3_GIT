# SKYST Frontend

## 🚀 프로젝트 개요

SKYST Frontend는 음성 인식 및 인터페이스 최적화를 위한 프로젝트입니다. 사용자는 직관적인 UI를 통해 실시간 음성 녹음과 플레이백을 수행할 수 있으며, Zepeto API를 활용한 3D 가구 모델 배치 기능이 포함되어 있습니다.

---

## ✨ 주요 기능

1. **Voice Recognition**

   * 음성 녹음 및 실시간 텍스트 변환
   * 오디오 파일 로컬 저장 및 재생 기능

2. **3D Virtual Space**

   * Zepeto API와의 연동을 통해 3D 가구 배치
   * 사용자 인벤토리 기반 가구 관리

3. **Bottom Navigation Bar**

   * 주요 화면 간 빠른 전환을 위한 네비게이션 바 제공

---

## 🔧 설치 및 실행 방법

1. 레포지토리 클론:

   ```bash
   git clone https://github.com/SKYST3/team_1.git
   cd team_1
   ```

2. 패키지 설치:

   ```bash
   npm install
   ```

3. 로컬 서버 실행:

   ```bash
   npm start
   ```

   웹 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

---

## 📂 프로젝트 구조

```
team_1/
├── team1-app/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AudioPlayer.jsx
│   │   │   ├── AudioRecorder.jsx
│   │   │   └── BottomNavBar.js
│   │   ├── pages/
│   │   │   └── VoiceRecordingPage.jsx
│   │   ├── assets/
│   │   │   └── icon/
│   │   └── App.js
│   ├── public/
│   └── package.json
└── README.md
```

---

## 💡 사용 방법

1. **음성 녹음**: `VoiceRecordingPage`에서 녹음 시작 버튼 클릭
2. **오디오 재생**: 녹음된 파일을 리스트에서 클릭하여 재생
3. **3D 공간 편집**: Zepeto API와 연동된 가구 배치 가능

---

## 🤝 기여 방법

1. 새로운 브랜치 생성:

   ```bash
   git checkout -b feature/your-feature
   ```
2. 변경 사항 커밋:

   ```bash
   git commit -m "Add your message"
   ```
3. 원격 저장소에 푸시:

   ```bash
   git push origin feature/your-feature
   ```
4. PR(Pull Request) 생성

---

