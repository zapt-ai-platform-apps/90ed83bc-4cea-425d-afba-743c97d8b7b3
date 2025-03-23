import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FaUserPlus, FaUserEdit, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import toast from 'react-hot-toast';

export default function EmployeeManagement() {
  const { employees, addEmployee, deleteEmployee, updateUserProfile, currentUser } = useAuth();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditingEmployee, setIsEditingEmployee] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('deliverer');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const resetForm = () => {
    setName('');
    setUsername('');
    setPassword('');
    setRole('deliverer');
    setError('');
  };
  
  const handleAddClick = () => {
    resetForm();
    setShowAddForm(true);
    setIsEditingEmployee(null);
  };
  
  const handleEditClick = (employee) => {
    setName(employee.name || '');
    setUsername(employee.username || '');
    setPassword(''); // Don't show existing password
    setRole(employee.role || 'deliverer');
    setIsEditingEmployee(employee);
    setShowAddForm(false);
  };
  
  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim() || !username.trim()) {
      setError('Name and username are required');
      return;
    }
    
    if (!isEditingEmployee && !password) {
      setError('Password is required for new employees');
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (isEditingEmployee) {
        // Update existing employee
        const updates = {
          name: name.trim(),
          username: username.trim(),
          role
        };
        
        if (password) {
          updates.password = password;
        }
        
        const success = updateUserProfile(isEditingEmployee.id, updates);
        
        if (success) {
          toast.success('Employee updated successfully');
          setIsEditingEmployee(null);
          resetForm();
        } else {
          setError('Failed to update employee');
        }
      } else {
        // Add new employee
        const success = addEmployee({
          name: name.trim(),
          username: username.trim(),
          password,
          role
        });
        
        if (success) {
          toast.success('Employee added successfully');
          setShowAddForm(false);
          resetForm();
        } else {
          setError('Username already exists');
        }
      }
      
      setIsSubmitting(false);
    }, 800);
  };
  
  const handleDelete = () => {
    if (employeeToDelete.id === currentUser.id) {
      toast.error('You cannot delete your own account');
      setIsDeleteModalOpen(false);
      return;
    }
    
    const success = deleteEmployee(employeeToDelete.id);
    
    if (success) {
      toast.success('Employee deleted successfully');
    } else {
      toast.error('Failed to delete employee');
    }
    
    setIsDeleteModalOpen(false);
  };
  
  const handleCancel = () => {
    setShowAddForm(false);
    setIsEditingEmployee(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Employee Management</h2>
        {!showAddForm && !isEditingEmployee && (
          <button
            onClick={handleAddClick}
            className="btn-primary flex items-center cursor-pointer"
          >
            <FaUserPlus className="mr-2" /> Add Employee
          </button>
        )}
      </div>
      
      {(showAddForm || isEditingEmployee) && (
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="text-lg font-medium mb-3">
            {isEditingEmployee ? 'Edit Employee' : 'Add New Employee'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name*
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field box-border"
                placeholder="Employee's full name"
                disabled={isSubmitting}
                required
              />
            </div>
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username*
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field box-border"
                placeholder="Login username"
                disabled={isSubmitting}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password{isEditingEmployee ? ' (leave blank to keep current)' : '*'}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field box-border"
                placeholder={isEditingEmployee ? "Leave blank to keep current password" : "Create a password"}
                disabled={isSubmitting}
                required={!isEditingEmployee}
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role*
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-field box-border"
                disabled={isSubmitting}
                required
              >
                <option value="deliverer">Deliverer</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary cursor-pointer"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                    {isEditingEmployee ? 'Updating...' : 'Adding...'}
                  </div>
                ) : (
                  isEditingEmployee ? 'Update Employee' : 'Add Employee'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    employee.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {employee.role === 'admin' ? 'Administrator' : 'Deliverer'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditClick(employee)}
                    className="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer"
                  >
                    <FaUserEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(employee)}
                    className="text-red-600 hover:text-red-900 cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <Dialog
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm mx-auto">
              <div className="flex items-center text-red-600 mb-4">
                <FaExclamationTriangle className="text-2xl mr-2" />
                <Dialog.Title className="text-lg font-medium">
                  Delete Employee
                </Dialog.Title>
              </div>
              
              <p className="mb-4">
                Are you sure you want to delete the employee "{employeeToDelete?.name}"? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="btn-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md cursor-pointer transition-colors"
                >
                  Delete
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
}