import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '@/components/auth/RegisterForm';
import RoleSelector from '@/components/auth/RoleSelector';
import { FaWater } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState(null);
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
            Create a new account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-cyan-600 hover:text-cyan-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {selectedRole ? (
            <>
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                Register as {selectedRole === 'customer' ? 'Customer' : 'Deliverer'}
              </h3>
              <RegisterForm selectedRole={selectedRole} />
              <div className="mt-4 text-center">
                <button
                  onClick={() => setSelectedRole(null)}
                  className="text-sm text-cyan-600 hover:text-cyan-500 cursor-pointer"
                >
                  Change role
                </button>
              </div>
            </>
          ) : (
            <RoleSelector onRoleSelect={setSelectedRole} />
          )}
        </div>
      </div>
    </div>
  );
}