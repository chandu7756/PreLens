# PrepLens - MoSPI Assessment Portal

PrepLens is an AI-powered competency assessment and learning platform designed for the Ministry of Statistics and Programme Implementation (MoSPI) and iGOT Karmayogi training workflows. It helps administrators upload training content, generate competency-mapped MCQs, review them before approval, and track learner performance with analytics and gap-based course recommendations.

## Overview

This project combines a React frontend, Express backend, and Vite tooling to provide a complete skill development portal for government training programs. The system supports:

- secure login experiences for admin and learner roles
- document upload and curriculum-based question generation
- AI-assisted MCQ generation with fallback question bank support
- human review and approval workflow for generated assessments
- learner assessment flow with score tracking and competency analysis
- department-level analytics and skill-gap insight dashboards
- iGOT course recommendations based on learning gaps
- notification-driven governance experience

## Key Features

### Admin Capabilities
- Review and approve generated MCQs
- Approve all pending questions in a single action
- Search, filter, and edit assessment questions
- Upload training documents and generate assessment items
- Monitor learning performance by department and competency

### Learner Experience
- Take official assessments and mock quizzes
- See competency-wise score breakdowns
- Identify skill gaps and weak areas
- View recommended iGOT courses and targeted learning pathways

### AI + Data Layer
- Google Gemini-powered MCQ generation for training documents
- Fallback question generation when AI is unavailable
- REST endpoints for auth, health checks, and AI generation tasks
- Local demo data for quick testing and presentation readiness

## Tech Stack

- React 19 + TypeScript
- Vite
- Express.js
- Tailwind CSS
- Google GenAI SDK
- Lucide icons
- Motion animations

## Project Structure

```text
.
├── src/
│   ├── components/
│   ├── data/
│   ├── App.tsx
│   ├── main.tsx
│   ├── types.ts
│   └── index.css
├── server.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
├── README.md
└── dist/
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following:

```env
PORT=5501
GEMINI_API_KEY=your_gemini_api_key_here
```

> Note: The app also works without a Gemini API key using a built-in fallback question bank, but adding an API key enables the AI generation workflow.

### Run the App Locally

```bash
npm run dev
```

Then open:

```text
http://localhost:5501
```

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Demo Login Credentials

### Admin
- Username: `admin`
- Password: `Admin@MoSPI2026`

### Learner
- Username: `officer`
- Password: `Learner@2026`

You can also use the quick-demo buttons available in the login screen.

## API Endpoints

The app includes a small backend service with endpoints such as:

- `GET /api/health` — health check
- `POST /api/auth/login` — login authentication
- `POST /api/auth/google` — Google sign-in simulation
- `GET /api/auth/credentials` — demo credentials
- `POST /api/generate-mcqs` — generate competency-based MCQs

## Deployment Notes

### Deploy to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, select **Add New Project**, import the repository, and keep the detected Vite settings.
3. Add `GEMINI_API_KEY` under **Project Settings > Environment Variables** if AI question generation is required.
4. Deploy. `vercel.json` builds the Vite frontend into `dist`, while `api/[...path].ts` serves the Express API at `/api/*`.

The application also works without `GEMINI_API_KEY` by using its built-in fallback question bank. Do not commit `.env` or API keys to the repository.

## License

This project is intended for educational, demo, and hackathon use.

## Acknowledgements

- Ministry of Statistics and Programme Implementation (MoSPI)
- iGOT Karmayogi
- Smart India Hackathon 2026

## Project Status

The application is currently implemented as a working prototype with:
- authentication flow
- assessment engine
- admin review queue
- competency analytics
- AI-assisted generation support
- responsive portal UI


