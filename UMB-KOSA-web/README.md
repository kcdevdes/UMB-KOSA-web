# UMB-KOSA-web

## Project Overview
UMB-KOSA-web is a Next.js application that provides a contact page where users can submit their inquiries. The application includes a contact form that captures user information and sends it via email.

## Features
- Contact form with fields for name, email, and message.
- API route to handle form submissions.
- Email sending functionality using a chosen email service.

## File Structure
```
UMB-KOSA-web
├── app
│   ├── contact
│   │   └── page.tsx          # Contact page component with form
│   └── api
│       └── contact
│           └── route.ts      # API route for handling contact form submissions
├── lib
│   └── email
│       └── sendEmail.ts      # Function to send emails
├── types
│   └── contact.ts             # TypeScript interfaces for contact form data
├── .env.example                # Template for environment variables
├── next.config.js             # Next.js configuration file
├── package.json                # npm configuration file
├── tsconfig.json              # TypeScript configuration file
└── README.md                   # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd UMB-KOSA-web
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env` and fill in the required values for your email service.

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000/contact` to access the contact form.

## Usage
- Users can fill out the contact form with their name, email, and message.
- Upon submission, the form data is sent to the server, which processes the request and sends an email to `info@example.com`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.