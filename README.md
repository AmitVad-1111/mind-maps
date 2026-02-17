# Mind Maps

A fast, intuitive, production-ready Mind Map application built with Next.js, Firebase, and TypeScript.

## Features

-   **Authentication**: Secure login and registration via Firebase Auth.
-   **Mind Maps**: Create, edit, and delete mind maps.
-   **Visual Editor**: Infinite canvas with pan and zoom capabilities.
-   **Nodes**: Add, edit, delete, and move nodes.
-   **Real-time Sync**: Changes are automatically saved to Firebase Firestore.
-   **Keyboard Shortcuts**:
    -   `Enter`: Add child node
    -   `Tab`: Add sibling node
    -   `Delete` / `Backspace`: Delete selected node
    -   `Ctrl + Scroll`: Zoom in/out

## Getting Started

### Prerequisites

-   Node.js 18+
-   Firebase Account

### Setup

1.  Clone the repository and navigate to the `web` directory:
    ```bash
    cd web
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Firebase:
    -   Create a project in the [Firebase Console](https://console.firebase.google.com/).
    -   Enable **Authentication** (Email/Password provider).
    -   Enable **Firestore Database** (start in Test Mode for development).
    -   Copy your web app configuration keys.
    -   Rename `.env.local.example` to `.env.local` (or create it) and fill in the keys:
        ```env
        NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
        NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
        ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **State Management**: Zustand
-   **Backend/DB**: Firebase (Auth + Firestore)
-   **Icons**: Lucide React