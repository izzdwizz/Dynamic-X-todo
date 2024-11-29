# Dynamic-X-Frontend

This is the client-side code for the Dynamic-X To-Do List application, built with React, Vite, and Tailwind CSS.

## Features

- **Drag-and-Drop Functionality:** Powered by `dnd-kit` for seamless task reordering.
- **Real-time Notifications:** Implemented with `react-hot-toast`.
- **Authentication and Context Management:** Built with custom Task and Auth Context APIs.
- **Routing:** Managed with `react-router-dom`.

## Tech Stack

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Drag-and-Drop Library:** dnd-kit
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Routing:** React Router DOM

## Installation

### Prerequisites

- Node.js and npm installed on your machine.

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd dynamic-X-todo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Project Structure

```plaintext
src/
├── App.jsx             # Main App component
├── Program.jsx           # Entry point of the application
├── components/         # Reusable components
├── context/            # Context APIs for Task and Authentication
├── pages/              # Application pages (SignIn, AllTasks)
├── hooks/             # Centralized hook management
```

## Routing

The application uses `react-router-dom` for navigation. Below are the routes:

| Path           | Component  | Description               |
| -------------- | ---------- | ------------------------- |
| `/`            | `SignIn`   | User authentication page. |
| `/create-task` | `App`      | Page for creating tasks.  |
| `/all-tasks`   | `AllTasks` | Displays all tasks.       |

## Dependencies

- **Production:**

  - `@dnd-kit/core`: Drag-and-drop core functionality.
  - `@tanstack/react-query`: State management for server-side data.
  - `axios`: For API calls.
  - `react-hot-toast`: Notification system.
  - `react-icons`: Icon library.

- **Development:**
  - `vite`: Development and build tool.
  - `tailwindcss`: CSS framework.
  - `eslint`: Linter for identifying problematic patterns in code.

## Scripts

| Script    | Description                      |
| --------- | -------------------------------- |
| `dev`     | Starts the development server.   |
| `build`   | Builds the application.          |
| `lint`    | Runs ESLint to check for errors. |
| `preview` | Previews the production build.   |

 
 
