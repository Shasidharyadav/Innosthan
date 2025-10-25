import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './stores/authStore'
import { useEffect } from 'react'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import LearningHub from './pages/LearningHub'
import CommunityHub from './pages/CommunityHub'
import MentorshipHub from './pages/MentorshipHub'
import AdminDashboard from './pages/AdminDashboard'
import MentorDashboard from './pages/MentorDashboard'
import InstitutionDashboard from './pages/InstitutionDashboard'
import ProfilePage from './pages/ProfilePage'

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
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
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
