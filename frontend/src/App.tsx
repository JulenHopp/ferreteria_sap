import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/homepage" replace /> : <LoginPage />
        } />
        <Route
          path="/homepage"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
