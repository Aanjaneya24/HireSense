# HireSense

A modern, AI-powered job portal connecting talented professionals with innovative companies.

## Overview

HireSense is a full-stack MERN application that streamlines the recruitment process through intelligent automation and user-centric design. The platform leverages AI technology to generate professional job descriptions and provides comprehensive tools for both job seekers and employers.

## Features

### For Job Seekers
- Professional profile creation and management
- Advanced job search with multiple filters
- Resume and document uploads
- Save jobs for later review
- One-click job applications
- Public profile pages
- Application status tracking

### For Employers
- Company profile management
- Unlimited job posting capability
- AI-powered job description generation
- Interactive analytics dashboard
- Application management system
- Candidate shortlisting
- Performance tracking and insights

### AI Integration
- Automated job description generation using Groq API (Llama 3.3 70B)
- SEO-optimized content creation
- Professional formatting and structure

## Technology Stack

### Frontend
- React 18
- Tailwind CSS
- Redux Toolkit
- React Router v6
- Axios
- TinyMCE

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary
- Groq AI API
- bcrypt

## Prerequisites

Before running this project, ensure you have:
- Node.js (v18 or higher)
- MongoDB Atlas account
- Cloudinary account
- Groq API key

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Aanjaneya24/HireSense.git
cd HireSense
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GROQ_API_KEY=your_groq_api_key
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_TINY_MCE_API=your_tinymce_api_key
```

### 4. Start Development Servers

Open two terminal windows:

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## Environment Variables

### Backend Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port number | Yes |
| MONGODB_URL | MongoDB connection string | Yes |
| ACCESS_TOKEN_SECRET | JWT access token secret | Yes |
| ACCESS_TOKEN_EXPIRY | Access token expiration time | Yes |
| REFRESH_TOKEN_SECRET | JWT refresh token secret | Yes |
| REFRESH_TOKEN_EXPIRY | Refresh token expiration time | Yes |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | Yes |
| CLOUDINARY_API_KEY | Cloudinary API key | Yes |
| CLOUDINARY_API_SECRET | Cloudinary API secret | Yes |
| GROQ_API_KEY | Groq AI API key | Yes |

### Frontend Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_API_URL | Backend API base URL | Yes |
| VITE_TINY_MCE_API | TinyMCE editor API key | Yes |

## Getting API Keys

### MongoDB Atlas
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string

### Cloudinary
1. Visit [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Find your credentials in the dashboard

### Groq API
1. Visit [Groq Console](https://console.groq.com/)
2. Sign in with Google
3. Create an API key (completely free)

### TinyMCE
1. Visit [TinyMCE](https://www.tiny.cloud/)
2. Sign up for a free account
3. Get your API key

## Project Structure

```
hiresense/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── db/
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── Pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── Routes/
│   ├── .env
│   └── package.json
│
└── README.md
```

## Key Features Implementation

### Authentication System
- JWT-based authentication with access and refresh tokens
- Role-based authorization (Job Seeker / Employer)
- Secure password hashing with bcrypt
- Protected routes and API endpoints

### AI Job Description Generator
- Integration with Groq AI (Llama 3.3 70B model)
- Free alternative to OpenAI
- Generates professional, SEO-optimized job descriptions
- Customizable based on job details

### File Upload System
- Cloudinary integration for resume and document storage
- Support for PDF and image formats
- Automatic file optimization

### Search and Filter
- Advanced job search functionality
- Filter by location, skills, experience, and job type
- Real-time search results

## API Endpoints

### Authentication
- POST `/api/v1/users/register` - User registration
- POST `/api/v1/users/login` - User login
- POST `/api/v1/users/logout` - User logout
- GET `/api/v1/users/current-user` - Get current user

### Jobs
- GET `/api/v1/jobs` - Get all jobs
- GET `/api/v1/jobs/:id` - Get job by ID
- POST `/api/v1/jobs` - Create new job (Employer only)
- POST `/api/v1/generate-job-description` - Generate AI job description

### Company
- GET `/api/v1/company/listings` - Get company job listings
- GET `/api/v1/company/applications` - Get applications
- POST `/api/v1/company/shortlist-candidate` - Shortlist candidate

## Contributing

This is a personal project. For suggestions or feedback, please open an issue.

## License

This project is licensed under the MIT License.

## Author

Aanjaneya Pandey

## Acknowledgments

- Built with MERN Stack
- AI powered by Groq (Llama 3.3 70B)
- UI components styled with Tailwind CSS
- Rich text editing with TinyMCE

## Support

If you find this project helpful, please consider giving it a star on GitHub.
