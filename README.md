# Community Forums

A full-stack web application where users can sign up, create forums, and interact through comments/questions—similar to GitHub Discussions.

## Live Demo

- **Frontend**: [https://community-forums-fo-git-40ba0d-vamsi-krishnas-projects-b141a25b.vercel.app](https://community-forums-fo-git-40ba0d-vamsi-krishnas-projects-b141a25b.vercel.app)
- **Backend API**: [https://be-community-forums.onrender.com/](https://be-community-forums.onrender.com/)

## Features

- **Authentication**: Users can sign up and sign in securely
- **Forums**: Create, update, and delete forums with titles, descriptions, and tags
- **Comments**: Interact with other users through comments on forums
- **Search**: Find forums by title, description, or tags
- **Pagination**: Browse forums with a paginated interface
- **Responsive Design**: Works on mobile, tablet, and desktop devices

## Tech Stack

### Frontend
- React with Redux for state management
- Material UI for responsive components
- React Router for navigation
- Axios for API requests

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

### Local Development Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/community-forums.git
   cd community-forums
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_API_BASE_URL=http://localhost:5000
   ```

4. Start the development server
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

src/
├── components/ # Shared components
├── constants/ # API endpoints and other constants
├── modules/ # Feature modules
│ ├── auth/ # Authentication related components
│ ├── comments/ # Comment components and logic
│ ├── forums/ # Forum components and logic
│ └── profile/ # User profile components
├── store.js # Redux store configuration
├── App.js # Main application component
└── index.js # Entry point


## API Endpoints

### Auth
- POST /api/users/register - Register a new user
- POST /api/users/login - Login a user

### Forums
- GET /api/forums - Get all forums
- GET /api/forums/:id - Get a specific forum
- POST /api/forums - Create a new forum
- PUT /api/forums/:id - Update a forum
- DELETE /api/forums/:id - Delete a forum

### Comments
- GET /api/comments/:forumId - Get comments for a forum
- POST /api/comments/:forumId - Add a comment to a forum

## Deployment

### Frontend (Vercel)
1. Fork or clone this repository
2. Create a new project in Vercel and connect your repository
3. Set the following environment variables:
   - `REACT_APP_API_BASE_URL`: Your backend API URL
4. Deploy with the following settings:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`

### Backend (Render)
1. Create a new Web Service in Render
2. Connect your backend repository
3. Set the following environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: A secure random string for JWT tokens
   - `NODE_ENV`: Set to "production"
   - `CORS_ORIGIN`: Your frontend URL
4. Deploy with the following settings:
   - Build Command: `npm install`
   - Start Command: `node index.js`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
