[README.md](https://github.com/user-attachments/files/28952480/README.md)
# PodSocial 🎙️

A full-stack social platform for podcast lovers — discover podcasts, share them with the community, like and comment on shares, and chat in real time with other users.

**Live Demo:** [https://your-app.vercel.app](https://your-app.vercel.app)
**Backend API:** [https://podsocial-backend.onrender.com](https://podsocial-backend.onrender.com)

> Note: the backend is hosted on Render's free tier, so the first request after inactivity may take 30–60 seconds to wake up.

---

## ✨ Features

- **Authentication** — Register/login with JWT stored in secure HTTP-only cookies, persistent sessions via a `/me` endpoint
- **Podcast Discovery** — Search any podcast in the world via the Taddy Podcast API
- **Share to Feed** — Pick a podcast from search results and share it to the community feed
- **Likes** — Like/unlike posts with live counts
- **Comments** — Comment on posts, delete your own comments
- **Real-time Messaging** — Start a conversation with anyone from their comments and chat live via Socket.io
- **Responsive UI** — Clean dark-themed interface built with Tailwind CSS and shadcn/ui

---

## 🛠️ Tech Stack

### Frontend
- React + TypeScript + Vite
- TanStack Query (data fetching & caching)
- React Router
- Tailwind CSS + shadcn/ui
- Axios
- Socket.io Client

### Backend
- Node.js + Express + TypeScript
- PostgreSQL + Prisma ORM
- JWT authentication with HTTP-only cookies
- Socket.io (real-time chat)
- Taddy Podcast GraphQL API (podcast search/data)

### Infrastructure
- **Database:** Neon (Serverless PostgreSQL)
- **Backend Hosting:** Render
- **Frontend Hosting:** Vercel
- **CI/CD:** GitHub Actions (build checks on every push to `main`)

---

## 📐 Architecture

```
podsocial/
├── backend/
│   ├── src/
│   │   ├── controllers/    # request handlers
│   │   ├── services/       # business logic (Prisma, Taddy API)
│   │   ├── routes/          # Express routers
│   │   ├── middleware/      # auth, error handling
│   │   ├── config/          # database connection
│   │   ├── utils/            # helpers (token generation, errors)
│   │   ├── types/             # shared TypeScript types
│   │   └── index.ts           # app entrypoint + Socket.io server
│   └── prisma/
│       └── schema.prisma     # database schema
│
└── frontend/
    └── src/
        ├── api/              # axios instance
        ├── context/          # AuthContext (global auth state)
        ├── service/          # API call functions
        ├── components/       # reusable UI (PostCard, CommentSection, Navbar...)
        ├── pages/             # routed pages (Login, Register, Main, Chat...)
        ├── hooks/             # custom hooks (useDebounce)
        └── types/             # shared TypeScript types
```

---

## 🔑 How Authentication Works

1. On login/register, the backend signs a JWT and sets it as an **HTTP-only cookie**
2. On every app load, the frontend calls `GET /auth/me` — the cookie is sent automatically
3. The backend's `authMiddleware` verifies the cookie, attaches the user to `req.user`, and returns it
4. The frontend stores this in `AuthContext` (powered by TanStack Query) so any component can access `useAuth()`
5. Logout clears the cookie and the cached user

---

## 💬 How Real-time Chat Works

1. Users start a chat directly from someone's comment on a post
2. Each chat gets a unique `chatId`, and both users join a Socket.io "room" with that ID
3. New messages are saved to the database **and** broadcast instantly via `io.to(chatId).emit(...)`
4. The recipient's `CommentSection`/chat window listens for the event and refetches messages live

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+
- PostgreSQL database (or a free [Neon](https://neon.tech) instance)
- A [Taddy API](https://taddy.org) user ID + API key

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Create a `.env` file in `backend/`:
```env
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
JWT_IN=7d
TADDY_USER_ID=your_taddy_user_id
TADDY_API_KEY=your_taddy_api_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file in `frontend/`:
```env
VITE_API_URL=http://localhost:5000
```

The app will be running at `http://localhost:5173`.

---

## 📡 API Overview

| Method | Endpoint                       | Description                  |
|--------|---------------------------------|-------------------------------|
| POST   | `/auth/register`                | Create a new account          |
| POST   | `/auth/login`                   | Log in, sets JWT cookie        |
| GET    | `/auth/me`                       | Get current logged-in user    |
| POST   | `/auth/logout`                  | Clear auth cookie              |
| GET    | `/api/podcast/search?q=`        | Search podcasts via Taddy      |
| POST   | `/api/posts`                    | Share a podcast as a post       |
| GET    | `/api/posts`                    | Get the feed                    |
| POST   | `/api/posts/:postId/like`       | Like a post                     |
| DELETE | `/api/posts/:postId/like`       | Unlike a post                    |
| POST   | `/api/posts/:postId/comment`    | Add a comment                    |
| GET    | `/api/posts/:postId/comments`   | Get comments for a post          |
| DELETE | `/api/posts/comment/:commentId` | Delete a comment                  |
| POST   | `/api/chat`                       | Start/find a chat with a user    |
| GET    | `/api/chat`                       | Get all chats for current user    |
| GET    | `/api/chat/:chatId/messages`    | Get messages in a chat            |
| POST   | `/api/chat/:chatId/message`     | Send a message                     |

All `/api/*` routes (and `/auth/me`, `/auth/logout`) require authentication via the JWT cookie.

---

## 🗺️ Roadmap

- [ ] User profile pages
- [ ] Post descriptions/captions
- [ ] Notifications for likes/comments/messages
- [ ] Pagination/infinite scroll for the feed
- [ ] Upgrade hosting tier for stable WebSocket connections

---

## 📄 License

This project is for portfolio/demonstration purposes. All rights reserved — please do not copy or redistribute as your own work.
