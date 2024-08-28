# Chat App Project

This project consists of two parts: frontend and backend. To start working with the project, you need to perform a few setup steps and launch both parts.

## Requirements

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Setup

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone git@github.com:MarkiianKostiv/chat-app.git
```

Navigate to the project root directory:

```bash
cd chat-app
```

### 2. Setting Up `.env` Files

#### Frontend

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Create a `.env` file in the root of the `frontend` directory and add the following:

   ```env
   VITE_API_URL="Your Backend url remote or local" - by default http://localhost:3000
   ```

   > **Note:** You can replace `VITE_API_URL` with your local or remote API URL depending on the environment you are using.

3. Configure `vite.config.ts` for proper proxy settings:

   ```typescript
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";

   export default defineConfig({
     plugins: [react()],
     server: {
       port: 5173,
       proxy: {
         "/api": {
           target: "Remote_API_Address",
           // target: "Local_Api_address", by default http://localhost:3000
           // please add one of this target and for local comment remote api for remote
           // comment local api
           changeOrigin: true,
         },
       },
     },
   });
   ```

   > **Note:** Depending on your environment, change the `target` to the local or remote API.

#### Backend

1. Navigate to the `backend` directory:

   ```bash
   cd ../backend
   ```

2. Create a `.env` file in the root of the `backend` directory and add the following:

   ```env
   MONGODB_URI="Your mangodb uri"
   JWT_SECRET="Your secret phrase"
   LOCAL_HOST="local client host" - by default-"http://localhost:5173"
   DEPLOY_HOST="remote client host" - if you want use deployed client.
   ```

   > **Note:** By default, `LOCAL_HOST` should be `http://localhost:5173`, which is the port for the frontend application. If you change the port or client address, update this value. `DEPLOY_HOST` is used for testing the database from the deployed site.

## Installing Dependencies

### Frontend

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Backend

1. Navigate to the `backend` directory:

   ```bash
   cd ../backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Running the Project

### Frontend

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Start the frontend server:

   ```bash
   npm run dev
   ```

### Backend

1. Navigate to the `backend` directory:

   ```bash
   cd ../backend
   ```

2. Start the backend server:

   ```bash
   npm run dev
   ```

## Additional Information

- The frontend runs on port `5173` by default.
- The backend runs on port `3000` by default.
- Make sure you correctly set the `VITE_API_URL` in the `.env` file to work with the appropriate API host.
