import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './stores/authStore'
import { useEffect } from 'react'

// Public Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard'
import LearningHub from './pages/student/LearningHub'
import CommunityHub from './pages/student/CommunityHub'
import MentorshipHub from './pages/student/MentorshipHub'
import StudentProfile from './pages/student/StudentProfile'

// Mentor Pages
import MentorDashboard from './pages/mentor/MentorDashboard'
import MentorSessions from './pages/mentor/MentorSessions'
import MentorStudents from './pages/mentor/MentorStudents'
import MentorProfile from './pages/mentor/MentorProfile'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminModules from './pages/admin/AdminModules'
import AdminAnalytics from './pages/admin/AdminAnalytics'

// Institution Pages
import InstitutionDashboard from './pages/institution/InstitutionDashboard'
import InstitutionCohorts from './pages/institution/InstitutionCohorts'
import InstitutionReports from './pages/institution/InstitutionReports'
import InstitutionProfile from './pages/institution/InstitutionProfile'

// Components
import ProtectedRoute from './components/ProtectedRoute'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const { checkAuth, isLoading } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Router>
      <div className="min-h-screen bg-dark-900">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(15, 23, 42, 0.9)',
              color: '#fff',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              backdropFilter: 'blur(10px)',
            },
          }}
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Student Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/learning"
            element={
              <ProtectedRoute requiredRole="student">
                <LearningHub />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/community"
            element={
              <ProtectedRoute requiredRole="student">
                <CommunityHub />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/mentorship"
            element={
              <ProtectedRoute requiredRole="student">
                <MentorshipHub />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentProfile />
              </ProtectedRoute>
            }
          />
          
          {/* Mentor Routes */}
          <Route
            path="/mentor/dashboard"
            element={
              <ProtectedRoute requiredRole="mentor">
                <MentorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor/sessions"
            element={
              <ProtectedRoute requiredRole="mentor">
                <MentorSessions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor/students"
            element={
              <ProtectedRoute requiredRole="mentor">
                <MentorStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor/profile"
            element={
              <ProtectedRoute requiredRole="mentor">
                <MentorProfile />
              </ProtectedRoute>
            }
          />
          
          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/modules"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminModules />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminAnalytics />
              </ProtectedRoute>
            }
          />
          
          {/* Institution Routes */}
          <Route
            path="/institution/dashboard"
            element={
              <ProtectedRoute requiredRole="institution">
                <InstitutionDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/institution/cohorts"
            element={
              <ProtectedRoute requiredRole="institution">
                <InstitutionCohorts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/institution/reports"
            element={
              <ProtectedRoute requiredRole="institution">
                <InstitutionReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/institution/profile"
            element={
              <ProtectedRoute requiredRole="institution">
                <InstitutionProfile />
              </ProtectedRoute>
            }
          />
          
          {/* Legacy Routes - Redirect to role-specific routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learning"
            element={
              <ProtectedRoute>
                <LearningHub />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <CommunityHub />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentorship"
            element={
              <ProtectedRoute>
                <MentorshipHub />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor"
            element={
              <ProtectedRoute requiredRole="mentor">
                <MentorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/institution"
            element={
              <ProtectedRoute requiredRole="institution">
                <InstitutionDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <StudentProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
