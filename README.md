# 🔗 Konnekta — Full-Stack Social Media Platform

<p align="center">
  <strong>A modern full-stack social media platform built with the MERN stack.</strong>
</p>

<p align="center">
  Connect • Share • Discover • Chat • Stay Connected
</p>

<p align="center">
  <a href="https://konnekta-social-mern.vercel.app">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Konnekta-blue?style=for-the-badge" alt="Live Demo">
  </a>
  <a href="https://github.com/iamskyy666/konnekta-social-mern">
    <img src="https://img.shields.io/badge/💻_Source_Code-GitHub-black?style=for-the-badge&logo=github" alt="GitHub">
  </a>
</p>

---

## 📌 About

**Konnekta** is a full-stack social media application built to explore and implement modern web application architecture using the **MERN stack**.

The application provides a complete social networking experience where users can create posts, share stories, discover other users, build connections, follow people, and communicate through real-time messaging.

The project also implements **Server-Sent Events (SSE)** for real-time message delivery and notifications without requiring page refreshes.

> 🚧 Konnekta is an ongoing learning and portfolio project, with additional improvements and features planned.

---

## 🚀 Live Demo

### 🌐 [Launch Konnekta](https://konnekta-social-mern.vercel.app)

The frontend and backend are deployed using **Vercel**.

> **Note:** Authentication requires a valid Clerk account/sign-in.

---

## ✨ Features

### 🔐 Authentication

* User authentication powered by **Clerk**
* Protected application routes
* Protected backend API routes
* Clerk middleware integration
* Authenticated API requests using Clerk tokens

### 👤 User Profiles

* View user profiles
* Update profile information
* Profile picture support
* Cover photo support
* User bio and location
* Follower/following information
* User connections

### 📝 Posts

* Create posts
* Upload multiple images
* Feed-based post display
* Like posts
* Image processing and optimization through ImageKit

### 📖 Stories

* Create stories
* Upload story media
* View available user stories

### 🤝 Connections & Social Graph

* Discover users
* Follow users
* Unfollow users
* Send connection requests
* Accept connection requests
* View connections
* View followers
* View following users

### 💬 Real-Time Messaging

* One-to-one messaging
* Text messages
* Image messages
* Message history
* Seen/unseen message state
* Recent messages
* Real-time delivery using **Server-Sent Events (SSE)**

### 🔔 Real-Time Notifications

When a new message arrives while the recipient is outside the corresponding chat:

* SSE delivers the message instantly
* A notification is displayed using `react-hot-toast`
* Users can directly select **Reply**
* The notification navigates to the relevant conversation

### ⚡ Modern Frontend Architecture

* React 19
* Vite
* Redux Toolkit
* React Router
* Tailwind CSS
* Axios
* Reusable React components
* Centralized Redux state management

### ☁️ Deployment

* Frontend deployed on Vercel
* Backend deployed on Vercel
* MongoDB Atlas database
* Serverless-aware Express configuration

---

# 🛠️ Tech Stack

## Frontend

| Technology      | Purpose                                 |
| --------------- | --------------------------------------- |
| React           | UI development                          |
| Vite            | Frontend tooling and development server |
| React Router    | Client-side routing                     |
| Redux Toolkit   | Global state management                 |
| React Redux     | React/Redux integration                 |
| Tailwind CSS    | Styling                                 |
| Axios           | HTTP requests                           |
| Clerk           | Authentication                          |
| React Hot Toast | Notifications                           |
| Lucide React    | Icons                                   |
| Moment.js       | Date/time formatting                    |

## Backend

| Technology    | Purpose                           |
| ------------- | --------------------------------- |
| Node.js       | JavaScript runtime                |
| Express       | REST API framework                |
| MongoDB       | Database                          |
| Mongoose      | MongoDB ODM                       |
| Clerk Express | Authentication middleware         |
| Multer        | File uploads                      |
| ImageKit      | Image storage and optimization    |
| Inngest       | Background/event-driven workflows |
| Nodemailer    | Email handling                    |
| Brevo SMTP    | Email delivery                    |
| JWT           | Token-related functionality       |

## Infrastructure & Services

* **Vercel** — deployment
* **MongoDB Atlas** — database hosting
* **Clerk** — authentication
* **ImageKit** — media storage and transformation
* **Inngest** — event-driven/background functions
* **Brevo SMTP** — email delivery

---

# 🏗️ Architecture

Konnekta follows a decoupled frontend/backend architecture:

```text
                         ┌──────────────────────┐
                         │       Browser        │
                         │   React + Vite UI    │
                         └──────────┬───────────┘
                                    │
                         REST API / SSE
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Express Backend    │
                         │      Node.js         │
                         └──────────┬───────────┘
                                    │
                ┌───────────────────┼───────────────────┐
                │                   │                   │
                ▼                   ▼                   ▼
        ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
        │  MongoDB    │     │   Clerk     │     │  ImageKit   │
        │   Atlas     │     │    Auth     │     │    Media    │
        └─────────────┘     └─────────────┘     └─────────────┘
                                   
                         ┌──────────────────────┐
                         │      Inngest         │
                         │ Background / Events  │
                         └──────────────────────┘
```

---

# ⚡ Real-Time Messaging Architecture

One of the key parts of Konnekta is the real-time messaging system.

Instead of repeatedly polling the server for new messages, the frontend establishes a persistent **Server-Sent Events connection**.

```text
User A
  │
  │ Send Message
  ▼
Express API
  │
  ├── Save message → MongoDB
  │
  └── SSE connection
          │
          ▼
      User B's Browser
          │
          ├── Chat is open
          │       └── Redux → addMessage()
          │
          └── Chat is closed
                  └── Toast Notification
```

The frontend creates an SSE connection:

```text
GET /api/v1/message/:userId
```

When a message is created, the backend checks whether the recipient has an active SSE connection and pushes the message directly to that client.

This allows messages and notifications to appear **without manually refreshing the page**.

---

# 📂 Project Structure

The project is organized into separate frontend and backend applications:

```text
konnekta-social-mern/
│
├── client/
│   ├── src/
│   │   ├── app/
│   │   │   └── store.js
│   │   │
│   │   ├── components/
│   │   │   ├── Notification.jsx
│   │   │   └── ...
│   │   │
│   │   ├── features/
│   │   │   ├── user/
│   │   │   ├── connections/
│   │   │   └── messages/
│   │   │
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── FeedPage.jsx
│   │   │   ├── MessagesPage.jsx
│   │   │   ├── ChatBoxPage.jsx
│   │   │   ├── ConnectionsPage.jsx
│   │   │   ├── DiscoverPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── CreatePostPage.jsx
│   │   │   └── Layout.jsx
│   │   │
│   │   ├── api/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── ...
│
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── inngest/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 🔌 API Overview

## 👤 User Routes

```text
GET    /api/v1/user/data
POST   /api/v1/user/update
POST   /api/v1/user/discover
POST   /api/v1/user/follow
POST   /api/v1/user/unfollow
POST   /api/v1/user/connect
POST   /api/v1/user/accept
GET    /api/v1/user/connections
GET    /api/v1/user/recent-messages
POST   /api/v1/user/profiles
```

## 📝 Post Routes

```text
POST   /api/v1/post/add
GET    /api/v1/post/feed
POST   /api/v1/post/like
```

## 📖 Story Routes

```text
POST   /api/v1/story/create
GET    /api/v1/story/get
```

## 💬 Message Routes

```text
GET    /api/v1/message/:userId
POST   /api/v1/message/send
POST   /api/v1/message/get
```

The `GET /api/v1/message/:userId` endpoint is used for the **SSE connection**.

---

# 🔑 Environment Variables

Konnekta uses environment variables for authentication, database access, media services, email services, and deployment configuration.

## Backend

Create:

```text
server/.env
```

```env
# General
PORT=
MONGO_URI=
FRONTEND_URL=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# Clerk
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# ImageKit
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=

# NodeMailer / Brevo
SENDER_EMAIL=
SMTP_USER=
SMTP_PASS=
```

## Frontend

Create:

```text
client/.env
```

```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_BASEURL=
```

### ⚠️ Security

Never commit `.env` files or secret credentials to Git.

Sensitive values such as:

* MongoDB connection strings
* Clerk secret keys
* ImageKit private keys
* Inngest signing keys
* SMTP passwords

should remain private.

---

# 💻 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/iamskyy666/konnekta-social-mern.git
```

```bash
cd konnekta-social-mern
```

## 2. Install frontend dependencies

```bash
cd client
npm install
```

## 3. Install backend dependencies

```bash
cd ../server
npm install
```

## 4. Configure environment variables

Create `.env` files inside both `client` and `server` using the variables shown above.

## 5. Start the backend

From the `server` directory:

```bash
npm run dev
```

The backend will run locally on the configured port, typically:

```text
http://localhost:4000
```

## 6. Start the frontend

From the `client` directory:

```bash
npm run dev
```

Vite will normally start the frontend at:

```text
http://localhost:5173
```

---

# 🧪 Available Scripts

## Client

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run preview
```

Previews the production build locally.

## Server

```bash
npm run dev
```

Starts the backend using Nodemon.

```bash
npm start
```

Starts the backend using Node.js.

---

# 🔐 Authentication Flow

Konnekta uses **Clerk** for authentication.

The general flow is:

```text
User
 │
 ▼
Clerk Authentication
 │
 ▼
Clerk User Session
 │
 ▼
Frontend obtains authentication token
 │
 ▼
Axios API Request
 │
 ▼
Authorization: Bearer <token>
 │
 ▼
Clerk Express Middleware
 │
 ▼
Protected Route
 │
 ▼
Controller
```

Protected endpoints use authentication middleware before accessing application data.

---

# 🖼️ Media Upload Architecture

Konnekta uses **Multer** to process uploaded files on the backend.

The general flow is:

```text
React
  │
  │ multipart/form-data
  ▼
Multer
  │
  ▼
Temporary File
  │
  ▼
ImageKit
  │
  ▼
Optimized Media URL
  │
  ▼
MongoDB
```

ImageKit is used for media storage and image transformations, reducing the need to serve uploaded media directly from the application server.

---

# 📊 State Management

Global application state is handled using **Redux Toolkit**.

Current Redux slices include:

```text
user
connections
messages
```

The message slice supports real-time updates through:

```javascript
addMessage(message)
```

When an SSE event arrives, the message is dispatched directly into the Redux store, allowing the active chat UI to update immediately.

---

# 🌱 Current Status

### ✅ Implemented

* Authentication
* User profiles
* Profile editing
* Posts
* Post likes
* Stories
* Follow/unfollow
* Connection requests
* Connection acceptance
* User discovery
* Messaging
* Image messaging
* Message history
* Seen/unseen messages
* Recent messages
* Real-time SSE messaging
* Real-time message notifications
* Redux state management
* Responsive UI
* Vercel deployment

### 🚧 Planned / Future Improvements

Potential future improvements include:

* Improved notification center
* Message notification persistence
* Better conversation management
* Online/offline user presence
* Typing indicators
* Message read receipts UI
* More advanced post interactions
* Better media previews
* Additional performance optimizations
* Automated testing
* Progressive Web App support

---

# 🧠 What This Project Demonstrates

Konnekta was built as more than a simple CRUD application.

It demonstrates practical experience with:

* Full-stack MERN architecture
* REST API design
* Authentication and authorization
* MongoDB data modeling
* Mongoose relationships
* Redux Toolkit
* React routing
* File uploads
* Image processing
* Real-time communication with SSE
* Event-driven backend workflows
* Middleware architecture
* API protection
* Environment configuration
* Production deployment
* Serverless Express deployment
* Debugging production deployment issues

---

# 🚀 Deployment

The application is deployed using **Vercel**.

### Frontend

```text
https://konnekta-social-mern.vercel.app
```

### Backend

The Express backend is configured to export the application for Vercel's serverless environment while still supporting local development with:

```javascript
if (!process.env.VERCEL) {
  app.listen(PORT);
}
```

This allows the same backend codebase to work both locally and in production.

---

# 🔗 Links

<p align="center">
  <a href="https://konnekta-social-mern.vercel.app">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Konnekta-blue?style=for-the-badge" alt="Live Demo">
  </a>
  <a href="https://github.com/iamskyy666/konnekta-social-mern">
    <img src="https://img.shields.io/badge/💻_GitHub-Repository-black?style=for-the-badge&logo=github" alt="GitHub Repository">
  </a>
</p>

---

# 👨‍💻 Author

**Skyy**

Full-Stack / Junior Software Engineer in progress.

Focused on:

```text
JavaScript
TypeScript
React
Node.js
Express
MongoDB
MERN
Golang
```

---

# ⭐ Support

If you find the project useful or interesting, consider giving the repository a ⭐ on GitHub.

It helps support the project and future development.

---

<p align="center">
  Built with ❤️ while learning, debugging, breaking, and rebuilding.
</p>

<p align="center">
  <strong>Konnekta — Connect. Share. Discover.</strong>
</p>
