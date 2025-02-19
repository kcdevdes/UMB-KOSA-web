[한국어, Korean](https://github.com/kcdevdes/UMB-KOSA-web/blob/main/README-kr.md)

# KOSA - UMass Boston Korean Student Association

Welcome to the official website of the Korean Student Association (KOSA) at UMass Boston! This site serves as a hub for our members, providing updates on events, activities, and community engagement.

## 🚀 What is KOSA

KOSA is dedicated to connecting Korean students and those interested in Korean culture at UMass Boston. This website aims to:

- Introduce our members and leadership team
- Document and archive our past and ongoing activities
- Provide event announcements and updates
- Foster a strong and inclusive community

## 📌 Features

- **Member Profiles**: Get to know the people behind KOSA.
- **Event Announcements**: Stay updated with upcoming gatherings and activities.
- **Activity Highlights**: Browse through our past events and achievements.
- **Community Engagement**: Opportunities to connect and participate in student life.

## 🔧 Setup Instructions

You need `Firebase Emulator` to simulate Firebase actions on your local machine.
You also need `.env.local` file that stores credentials for accessing Firebase. Contact me if you need.
Or you can make your own firebase project.

```plain
EMAIL_USER=
EMAIL_PASS=
EMAIL_RECEIVER=

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

If everything is prepared, try the following commands

```bash
git clone https://github.com/kcdevdes/UMB-KOSA-web.git
cd UMB-KOSA-web
npm install
npm run dev
```

## 🤝 Contributing

We welcome contributions from members and volunteers! If you’d like to help improve this website, feel free to fork the repository and submit a pull request.

## 📬 Contact Us

For any inquiries, reach out via email at <gibeom.choi001@umb.edu> or follow us on social media!

© 2025 KOSA - UMass Boston Korean Student Association. All rights reserved.

## Roadmap

- Alumni
- Sponsor
