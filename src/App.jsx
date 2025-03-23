import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import ZaptBadge from './components/common/ZaptBadge';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { currentUser, loading } = useAuth();
  
  // Protected route wrapper
  const ProtectedRoute = ({ children, requiredRole }) => {
    if (loading) {
      return <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-t-transparent border-cyan-600 rounded-full animate-spin"></div>
      </div>;
    }
    
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    
    if (requiredRole && currentUser.role !== requiredRole) {
      return <Navigate to="/" />;
    }
    
    return children;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {currentUser?.role !== 'admin' && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <ZaptBadge />
      {currentUser?.role !== 'admin' && <Footer />}
    </div>
  );
}