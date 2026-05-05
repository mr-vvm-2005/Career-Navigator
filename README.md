# 🧭 Career Navigator

Career Navigator is a comprehensive career development and tracking platform designed to help users build their professional presence, track their progress, and navigate their career paths efficiently. 

Designed with modern web aesthetics and built for performance, it offers an all-in-one suite of tools including ATS-friendly resume generation, an AI-powered assistant, skill tracking, and daily practice gamification.

## ✨ Key Features

- **📊 Interactive Dashboard**: Keep track of your progress with visual charts and actionable insights.
- **📄 ATS-Friendly Resume Builder & Analyzer**: Create properly formatted, professional resumes designed to pass through Application Tracking Systems (exportable to PDF).
- **🤖 AI Career Chatbot**: Get quick tips, interview preparation advice, and career roadmapping assistance.
- **🚀 Skill & Roadmap Engine**: Generate customized learning paths based on your desired roles and current skill gaps.
- **📅 Practice Tracker & Gamification**: Stay consistent by tracking your daily practice. Build your learning streak with our built-in gamification engine.
- **🔒 Secure Authentication**: Robust user authentication and cloud data syncing powered by Firebase.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts & Data Visualization**: [Chart.js](https://www.chartjs.org/) & `react-chartjs-2`
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Auth & Firestore)
- **PDF Generation**: `jspdf` & `html2canvas`
- **Icons**: `lucide-react` & `@heroicons/react`

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mr-vvm-2005/Career-Navigator.git
   cd Career-Navigator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add your Firebase configuration keys (and any AI API keys if applicable):
     ```env
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will automatically open in your default browser.

## 📂 Project Structure

- `/src/components` - Reusable UI components (Sidebar, Modals, Chatbot, etc.)
- `/src/pages` - Main application pages (Dashboard, Resume builder, Tracker, etc.)
- `/src/context` - Global state management (AppContext)
- `/src/services` - External APIs and database services (authService, dbService)
- `/src/utils` - Helper functions (skillEngine, roadmapGenerator, gamificationEngine)
- `/src/firebase` - Firebase app initialization and configuration

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is licensed under the MIT License.
