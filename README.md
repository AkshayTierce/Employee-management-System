# Employee Management System

This repository contains a full-stack Employee Management System with:

- `server/` — Express + TypeScript backend
- `client/` — Next.js + TypeScript frontend

## Environment variables

The app requires separate environment variables for the backend and frontend.

### Server
Create `server/.env` with:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/employee-management-system
```

### Client
Create `client/.env.local` with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

> The frontend uses `NEXT_PUBLIC_API_URL` to call the backend API.

## Running the project

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Notes

- The backend API base path is assumed to be `/api` in the frontend.
- If you run the server on a different port, update `NEXT_PUBLIC_API_URL` accordingly.
- Keep `server/.env` and `client/.env.local` out of version control.
