::: {align="center"}
# ⚡ Konnekta

### The Next Generation of Social Networking

**Where Connections Begin.**

A full-stack social networking application built with the **MERN
stack**, featuring authentication, posts, stories, connections,
profiles, real-time messaging, notifications, media uploads, and a
production deployment on Vercel.

```{=html}
<p>
```
`<a href="https://konnekta-social-mern.vercel.app">`{=html}
`<img src="https://img.shields.io/badge/🚀%20Live%20Demo-Konnekta-6C4DFF?style=for-the-badge" alt="Live Demo">`{=html}
`</a>`{=html}
`<a href="https://github.com/iamskyy666/konnekta-social-mern">`{=html}
`<img src="https://img.shields.io/badge/💻%20GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository">`{=html}
`</a>`{=html}
```{=html}
</p>
```
```{=html}
<p>
```
`<img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">`{=html}
`<img src="https://img.shields.io/badge/Node.js-22+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js">`{=html}
`<img src="https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white" alt="Express">`{=html}
`<img src="https://img.shields.io/badge/MongoDB-9-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB">`{=html}
`<img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">`{=html}
`<img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel">`{=html}
```{=html}
</p>
```
:::

------------------------------------------------------------------------

## 🌐 Live Application

**Try Konnekta live:**\
https://konnekta-social-mern.vercel.app

**Source code:**\
https://github.com/iamskyy666/konnekta-social-mern

> Konnekta is deployed as a separate React frontend and Express/Node.js
> backend, with Vercel handling the production deployment.

------------------------------------------------------------------------

## 📸 Screenshots

### 🔐 Authentication

![Konnekta Login](docs/screenshots/login.png)

### 📰 Feed

![Konnekta Feed](docs/screenshots/feed.png)

### ✨ Create a Story

![Create Story](docs/screenshots/create-story.png)

### 💬 Messages

![Messages](docs/screenshots/messages.png)

### 🤝 Connections

![Connections](docs/screenshots/connections.png)

### 🔎 Discover People

![Discover People](docs/screenshots/discover.png)

### 👤 Profile

![Profile](docs/screenshots/profile.png)

### 📝 Create Post

![Create Post](docs/screenshots/create-post.png)

------------------------------------------------------------------------

## ✨ Features

### 🔐 Authentication & User Management

-   Secure authentication with **Clerk**
-   Email/password authentication
-   Google authentication
-   Protected frontend routes and backend API routes
-   User profile creation and synchronization
-   Editable profile information
-   Profile and cover image uploads

### 📰 Social Feed

-   Personalized social feed
-   Create text and image posts
-   Upload multiple images per post
-   Like posts
-   View user posts and media
-   Responsive social-media style interface

### 📖 Stories

-   Create text-based stories
-   Upload photo/video stories
-   Multiple story background colors
-   Story feed with relative timestamps

### 🤝 Connections & Networking

-   Discover other users
-   Search users by name, username, bio, or location
-   Follow / unfollow users
-   Send connection requests
-   Accept connection requests
-   View followers, following, pending requests, and connections

### 💬 Real-Time Messaging

-   One-to-one messaging
-   Text messages
-   Image/media messages
-   Real-time incoming messages using **Server-Sent Events (SSE)**
-   Real-time toast notifications for new messages
-   Recent messages sidebar
-   Seen/unseen message state

### 🖼️ Media Handling

-   Image uploads with **Multer**
-   Cloud media storage and transformations with **ImageKit**
-   Profile images
-   Cover images
-   Post images
-   Story media
-   Chat image attachments

### ⚙️ Backend & Infrastructure

-   RESTful API architecture
-   Express middleware
-   Clerk authentication middleware
-   MongoDB + Mongoose
-   Centralized route/controller structure
-   Inngest event-driven/background workflows
-   Nodemailer + Brevo SMTP integration
-   Environment-based configuration
-   Vercel serverless deployment support

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

  Technology            Purpose
  --------------------- -----------------------------------------
  **React 19**          UI development
  **Vite 8**            Frontend tooling and development server
  **React Router 7**    Client-side routing
  **Redux Toolkit**     Global state management
  **React Redux**       React bindings for Redux
  **Tailwind CSS 4**    Styling
  **Clerk React**       Authentication
  **Axios**             HTTP requests
  **Lucide React**      Icons
  **Moment.js**         Date/time formatting
  **React Hot Toast**   Notifications

### Backend

  Technology          Purpose
  ------------------- -----------------------------------------
  **Node.js**         JavaScript runtime
  **Express 5**       REST API framework
  **MongoDB**         Database
  **Mongoose 9**      MongoDB ODM
  **Clerk Express**   Backend authentication
  **Multer**          Multipart/form-data and file uploads
  **ImageKit**        Media storage and image transformations
  **Inngest**         Event-driven/background workflows
  **Nodemailer**      Email delivery
  **Brevo SMTP**      SMTP email service
  **CORS**            Cross-origin API access
  **dotenv**          Environment configuration
  **bcrypt**          Password hashing
  **jsonwebtoken**    JWT utilities

### Deployment

-   **Vercel** --- frontend and backend deployment
-   **MongoDB** --- database
-   **Clerk** --- authentication
-   **ImageKit** --- media storage
-   **Inngest** --- background/event-driven processing
-   **Brevo SMTP** --- email delivery

------------------------------------------------------------------------

## 🏗️ Project Architecture

``` text
konnekta-social-mern/
│
├── client/                         # React + Vite frontend
│   ├── src/
│   │   ├── api/                   # Axios/API configuration
│   │   ├── app/                   # Redux store
│   │   ├── assets/                # Frontend assets
│   │   ├── components/            # Reusable UI components
│   │   ├── features/              # Redux slices/features
│   │   │   ├── connections/
│   │   │   ├── messages/
│   │   │   └── user/
│   │   ├── pages/                 # Application pages
│   │   ├── App.jsx                # Routing + SSE handling
│   │   └── main.jsx               # Application entry point
│   └── package.json
│
├── server/                         # Node + Express backend
│   ├── configs/                   # DB, upload and service configuration
│   ├── controllers/               # Business logic
│   ├── inngest/                   # Inngest functions
│   ├── middlewares/               # Authentication and middleware
│   ├── models/                    # Mongoose models
│   ├── routes/                    # REST API routes
│   ├── server.js                  # Express application
│   └── package.json
│
├── .gitignore
└── README.md
```

------------------------------------------------------------------------

## 🔄 Application Flow

``` text
┌──────────────────┐
│   React Client   │
│  Vite + React    │
└────────┬─────────┘
         │
         │ Axios / REST API
         ▼
┌──────────────────┐
│  Express Server  │
│   Node.js API    │
└───────┬──────────┘
        │
        ├──────────────► Clerk
        │                Authentication
        │
        ├──────────────► MongoDB
        │                Application Data
        │
        ├──────────────► ImageKit
        │                Media Storage
        │
        ├──────────────► Inngest
        │                Background Workflows
        │
        └──────────────► Brevo / Nodemailer
                         Email Delivery

Real-time messaging:
React Client ◄──────────── Server-Sent Events (SSE) ────────────► Express
```

------------------------------------------------------------------------

## 🧭 Main Application Routes

  -----------------------------------------------------------------------
  Route                   Page                    Description
  ----------------------- ----------------------- -----------------------
  `/`                     Feed                    Main social feed

  `/messages`             Messages                Connections and
                                                  conversations

  `/messages/:userId`     Chat                    One-to-one conversation

  `/connections`          Connections             Followers, following,
                                                  requests and
                                                  connections

  `/discover`             Discover                Search and discover
                                                  people

  `/profile`              Profile                 Current user's profile

  `/profile/:profileId`   Profile                 View another user's
                                                  profile

  `/create-post`          Create Post             Publish text/image
                                                  posts
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 🔌 Backend API Overview

### User

``` text
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

### Posts

``` text
POST   /api/v1/post/add
GET    /api/v1/post/feed
POST   /api/v1/post/like
```

### Stories

``` text
POST   /api/v1/story/create
GET    /api/v1/story/get
```

### Messages

``` text
GET    /api/v1/message/:userId       # SSE stream
POST   /api/v1/message/send
POST   /api/v1/message/get
```

### Inngest

``` text
/api/v1/inngest
```

------------------------------------------------------------------------

## 🚀 Getting Started

### 1. Clone the repository

``` bash
git clone https://github.com/iamskyy666/konnekta-social-mern.git
cd konnekta-social-mern
```

### 2. Install frontend dependencies

``` bash
cd client
npm install
```

### 3. Install backend dependencies

``` bash
cd ../server
npm install
```

------------------------------------------------------------------------

## 🔑 Environment Variables

Create the required environment files locally.

### Frontend

Create:

``` text
client/.env
```

``` env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASEURL=http://localhost:4000
```

### Backend

Create:

``` text
server/.env
```

``` env
PORT=4000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Clerk
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# Nodemailer / Brevo
SENDER_EMAIL=your_sender_email
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

> **Important:** Never commit `.env` files, Clerk secret keys, database
> credentials, SMTP passwords, ImageKit private keys, or other secrets
> to GitHub.

------------------------------------------------------------------------

## ▶️ Run Locally

Open two terminals.

### Terminal 1 --- Backend

``` bash
cd server
npm run dev
```

The backend runs on:

``` text
http://localhost:4000
```

### Terminal 2 --- Frontend

``` bash
cd client
npm run dev
```

The frontend runs on:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

## 📦 Production Build

### Frontend

``` bash
cd client
npm run build
```

### Backend

``` bash
cd server
npm start
```

The backend is also configured to export the Express app for Vercel's
serverless environment.

------------------------------------------------------------------------

## ☁️ Deployment

Konnekta is deployed using **Vercel**.

The project is structured as two independently deployed applications:

``` text
GitHub Repository
       │
       ├── client/ ─────► Vercel ─────► React Frontend
       │
       └── server/ ─────► Vercel ─────► Express API
```

### Production URLs

**Frontend**

https://konnekta-social-mern.vercel.app

**Backend health check**

The backend exposes a root health-check endpoint returning:

``` json
{
  "success": true,
  "message": "✅ Konnekta - Server is running!"
}
```

------------------------------------------------------------------------

## 🔐 Security Notes

Konnekta keeps sensitive credentials in environment variables rather
than source code.

Authentication is handled through Clerk, while protected backend routes
use authentication middleware before accessing user-specific resources.

Examples of protected operations include:

-   User data
-   Profile updates
-   Connections
-   Follows
-   Posts
-   Stories
-   Messages

For production deployments, all third-party credentials should be
configured through the deployment platform's environment-variable
settings.

------------------------------------------------------------------------

## 🧠 What This Project Demonstrates

This project was built to practice and demonstrate practical full-stack
engineering concepts:

-   Building a complete MERN application from frontend to backend
-   Designing RESTful APIs with Express
-   MongoDB data modeling with Mongoose
-   Authentication and authorization
-   Protected API routes
-   Global state management with Redux Toolkit
-   React Router-based application architecture
-   File uploads and cloud media processing
-   Real-time communication with SSE
-   Event-driven backend workflows
-   Email integration
-   Environment configuration
-   Serverless deployment with Vercel
-   Debugging production deployment issues
-   Separating frontend and backend concerns

------------------------------------------------------------------------

## 🧪 Development Notes

The project is actively evolving. Some areas may continue to receive
improvements as the application grows.

Potential future improvements include:

-   More advanced notifications
-   Better message read-state synchronization
-   Pagination / infinite scrolling
-   Improved media optimization
-   More granular authorization
-   Additional social features
-   Automated testing
-   CI/CD workflows

------------------------------------------------------------------------

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1.  Fork the repository
2.  Create a feature branch

``` bash
git checkout -b feature/amazing-feature
```

3.  Commit the changes

``` bash
git commit -m "feat: add amazing feature"
```

4.  Push the branch

``` bash
git push origin feature/amazing-feature
```

5.  Open a Pull Request

------------------------------------------------------------------------

## 📄 License

This project is currently available for learning and portfolio purposes.

------------------------------------------------------------------------

## 👨‍💻 Author

### Skyy

Full-stack developer focused on building modern web applications with
the MERN stack, Node.js, and related backend technologies.

```{=html}
<p>
```
`<a href="https://github.com/iamskyy666">`{=html}
`<img src="https://img.shields.io/badge/GitHub-iamSkyy666-181717?style=for-the-badge&logo=github" alt="GitHub">`{=html}
`</a>`{=html}
```{=html}
</p>
```

------------------------------------------------------------------------

::: {align="center"}
### ⚡ Konnekta

**Where Connections Begin.**

`<a href="https://konnekta-social-mern.vercel.app">`{=html}🚀 Visit
Konnekta`</a>`{=html}   •  
`<a href="https://github.com/iamskyy666/konnekta-social-mern">`{=html}💻
View Source`</a>`{=html}
:::
