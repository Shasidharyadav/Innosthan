# 🪄 Innosthan - Entrepreneurship Learning & Incubation Hub

A state-of-the-art full-stack web platform that transforms the Innosthan Pre-Incubation Curriculum into a visually captivating, AI-powered learning and incubation ecosystem.

## ✨ Features

- **🎨 Cutting-edge UI/UX**: Ambient neon gradients, glassmorphism cards, and smooth animations
- **🤖 AI-Powered Learning**: GPT-4 integration for personalized mentorship and content generation
- **📚 Dynamic Curriculum**: 9 sequential modules from foundation to incubation
- **🏆 Gamification**: XP system, badges, leaderboards, and achievement tracking
- **👥 Community Hub**: Modern forum with peer matching and collaboration tools
- **🎯 Learning Tools**: Interactive Lean Canvas, Value Proposition Wizard, Pitch Deck Generator
- **📊 Analytics**: Comprehensive dashboards for students, mentors, and administrators
- **🔐 Role-based Access**: Student, Mentor, Admin, and Institution portals

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management
- **React Router** for navigation
- **Socket.io Client** for real-time features

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** authentication with bcrypt
- **Socket.io** for real-time communication
- **OpenAI API** for AI features
- **AWS S3** for file storage

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- OpenAI API key (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd innosthan-platform
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp env.example .env
   
   # Edit .env with your configuration
   # At minimum, set MONGODB_URI and JWT_SECRET
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB (if running locally)
   mongod
   
   # Seed the database
   cd server
   npm run seed
   ```

5. **Start Development Servers**
   ```bash
   # From root directory
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📁 Project Structure

```
innosthan-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── stores/       # Zustand state management
│   │   └── main.tsx      # App entry point
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── server/               # Node.js backend
│   ├── src/
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API routes
│   │   ├── middleware/  # Custom middleware
│   │   └── scripts/      # Database seeding
│   └── package.json      # Backend dependencies
└── package.json          # Root package.json
```

## 🎨 Design System

### Color Palette
- **Base**: `#0F172A` (Slate/Navy dark)
- **Accents**: Violet `#7C3AED`, Cyan `#06B6D4`, Pink `#F472B6`
- **Success**: Mint `#22C55E`, Amber `#EAB308`

### Key Components
- **Glass Cards**: `backdrop-blur-xl bg-white/10 border border-white/20`
- **Gradient Text**: `bg-gradient-to-r from-violet-400 via-pink-400 to-primary-400`
- **Neon Glow**: `shadow-[0_0_20px_rgba(124,58,237,0.5)]`

## 📚 Learning Modules

1. **Foundation** - Entrepreneurship basics and mindset
2. **Ideation** - Problem identification and solution design
3. **Validation** - Market research and customer discovery
4. **Business Model** - Lean canvas and value proposition
5. **MVP Development** - Minimum viable product development
6. **Pitch Preparation** - Investor pitch and presentation skills
7. **Funding** - Investment strategies and fundraising
8. **Scaling** - Growth strategies and team building
9. **Incubation** - Accelerator programs and mentorship

## 🔐 Authentication

### Test Accounts (After Seeding)
- **Admin**: `admin@innosthan.com` / `admin123`
- **Mentor**: `sarah@innosthan.com` / `mentor123`
- **Student**: `alex@innosthan.com` / `student123`

### Roles
- **Student**: Access to learning modules, community, and mentorship
- **Mentor**: Review assignments, provide feedback, host sessions
- **Admin**: Full platform management and analytics
- **Institution**: Cohort management and reporting

## 🤖 AI Features

- **Mentor Chat**: GPT-4 powered contextual guidance
- **Content Generation**: Auto-generated quizzes and reflections
- **Feedback Summarization**: AI-powered mentor feedback analysis
- **Multi-language Support**: English, Hindi, Telugu, Tamil

## 📊 Analytics & Reporting

- **Student Dashboard**: Progress tracking, XP earned, badges
- **Mentor Dashboard**: Assignment reviews, session management
- **Admin Dashboard**: Platform analytics, user management
- **Institution Portal**: NAAC/NBA-ready reports, cohort analytics

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy to Vercel
```

### Backend (Render/Railway)
```bash
cd server
npm run build
# Deploy to your preferred platform
```

### Database (MongoDB Atlas)
- Create cluster on MongoDB Atlas
- Update `MONGODB_URI` in environment variables

## 🛠️ Development

### Available Scripts
```bash
# Development
npm run dev          # Start both frontend and backend
npm run client       # Start only frontend
npm run server       # Start only backend

# Database
npm run seed         # Seed database with sample data

# Production
npm run build        # Build frontend for production
```

### Code Structure
- **Components**: Reusable UI components with TypeScript
- **Pages**: Route-based page components
- **Stores**: Zustand state management
- **Models**: MongoDB schemas with Mongoose
- **Routes**: Express.js API endpoints
- **Middleware**: Authentication and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for the next generation of entrepreneurs**