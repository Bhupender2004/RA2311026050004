# Notification Assessment System

A clean, responsive, and realistic frontend assessment project built with Next.js App Router, Material UI, and TypeScript.

## Project Structure
* `notification_app_fe/`: The main Next.js frontend application.
* `notification_app_be/`: Lightweight TypeScript helper modules for standalone priority/sorting logic.
* `logging_middleware/`: Prepared directory for future potential middleware needs.
* `notification_system_design.md`: The system design architectural overview document.

## Features
* **All Notifications:** Paginated, filterable view of all notifications.
* **Priority Inbox:** A specialized view that sorts notifications by business value (`Placement > Result > Event`) and latest timestamp.
* **Read/Unread Tracking:** Persists read state locally via browser `localStorage`.
* **Responsive Design:** Optimized for mobile and desktop viewing using Material UI components.

## Tech Stack
* **Frontend:** Next.js 14+ (App Router), React, Material UI (MUI), Axios
* **Language:** TypeScript
* **Backend Utilities:** Node.js (pure TypeScript functions)

## How to Run

1. **Navigate to the frontend directory:**
   You must be inside the `notification_app_fe` folder to run the server.
   ```bash
   cd notification_app_fe
   ```

2. **Install dependencies** (if you haven't already):
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000). The app will automatically redirect you to the `/notifications` dashboard.
