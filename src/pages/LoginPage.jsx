import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { FaWater } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  if (currentUser) {
    if (currentUser.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <FaWater className="text-4xl text-cyan-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-cyan-600 hover:text-cyan-500">
              create a new account
            </Link>
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}