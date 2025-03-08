a# Community Forums

A full-stack web application where users can sign up, create forums, and interact through comments/questions—similar to GitHub Discussions.

## Features

- **Authentication**: Users can sign up and sign in securely
- **Forums**: Create, update, and delete forums with titles, descriptions, and tags
- **Comments**: Interact with other users through comments on forums
- **Search**: Find forums by title, description, or tags
- **Pagination**: Browse forums with a paginated interface

## Tech Stack

### Frontend
- React with TypeScript
- Redux for state management
- Material UI for components
- React Router for navigation

### Backend
- Node.js with Express
- PostgreSQL database
- Prisma ORM
- JWT authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository

bash
git clone https://github.com/yourusername/community-forums.git
cd community-forums
bash
npm install

2. Install dependencies

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:

4. Start the development server

src/
├── components/ # Shared components
├── constants/ # API endpoints and other constants
├── modules/ # Feature modules
│ ├── auth/ # Authentication related components
│ ├── comments/ # Comment components and logic
│ ├── forums/ # Forum components and logic
│ └── profile/ # User profile components
├── store.ts # Redux store configuration
├── App.tsx # Main application component
└── index.tsx # Entry point

## API Endpoints

- **Auth**
  - POST /api/auth/register - Register a new user
  - POST /api/auth/login - Login a user
  - GET /api/auth/me - Get current user

- **Forums**
  - GET /api/forums - Get all forums
  - GET /api/forums/search?q={query} - Search forums
  - GET /api/forums/:id - Get a specific forum
  - POST /api/forums - Create a new forum
  - PUT /api/forums/:id - Update a forum
  - DELETE /api/forums/:id - Delete a forum

- **Comments**
  - GET /api/forums/:forumId/comments - Get all comments for a forum
  - POST /api/forums/:forumId/comments - Create a new comment
  - DELETE /api/forums/:forumId/comments/:commentId - Delete a comment
