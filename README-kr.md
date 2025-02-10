# KOSA - UMass Boston 한국학생회

UMass Boston 한국학생회(KOSA)의 공식 웹사이트에 오신 것을 환영합니다!  
이 사이트는 회원들에게 행사, 활동, 그리고 커뮤니티 소식을 제공하는 허브 역할을 합니다.

## 🚀 KOSA란?

KOSA는 UMass Boston에서 한국 학생들과 한국 문화에 관심 있는 사람들을 연결하는 단체입니다.  
이 웹사이트는 다음과 같은 목표를 가지고 있습니다:

- 회원 및 운영진을 소개
- 과거 및 현재 진행 중인 활동을 기록 및 보관
- 행사 공지 및 업데이트 제공
- 강하고 포용적인 커뮤니티 형성

## 📌 주요 기능

- **회원 소개**: KOSA를 이끌어가는 사람들을 만나보세요.
- **행사 공지**: 다가오는 모임과 활동 소식을 확인하세요.
- **활동 기록**: 과거 이벤트와 주요 활동들을 살펴보세요.
- **커뮤니티 참여**: 학생 생활에 참여하고 소통할 기회를 제공합니다.

## 🔧 Setup Instructions

`Firebase Emulator`가 필요합니다! Fireabase의 실제 서버에선 Read/Write 횟수가 정해져 있습니다. 최대한 에뮬레이터를 활용해주세요.
`.env.local`도 필요합니다. Key값이 필요하면 연락해주세요. 아니면 자신의 프로젝트를 만들어도 괜찮습니다.

```plain
# CLIENT FIREBASE #
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# FIREBASE ADMIN #
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true # NOT IN PRODUCTION MODE!

# CLOUDINARY #
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

```

모든 게 준비되었으면 다음 명령을 입력해주세요.

```bash
git clone https://github.com/kcdevdes/UMB-KOSA-web.git
cd UMB-KOSA-web
npm install
npm run dev
```

## 🤝 기여 방법

회원과 자원봉사자의 기여를 환영합니다!  
웹사이트 개선을 돕고 싶다면 저장소를 포크한 후 풀 리퀘스트를 제출해주세요.

## 📬 문의하기

궁금한 점이 있다면 이메일(<gibeom.choi001@umb.edu>)로 문의하거나,  
소셜 미디어를 통해 소식을 받아보세요!

© 2025 KOSA - UMass Boston 한국학생회. All rights reserved.
