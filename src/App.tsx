import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/LoginForm';
import { AdminDashboard } from './components/AdminDashboard';
import { PublicSite } from './components/PublicSite';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando aplicación...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Ruta pública del sitio web */}
        <Route path="/" element={<PublicSite />} />
        
        {/* Rutas de administración */}
        <Route 
          path="/admin" 
          element={
            user ? <AdminDashboard /> : <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/login" 
          element={
            user ? <Navigate to="/admin" replace /> : <LoginForm />
          } 
        />
        
        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;