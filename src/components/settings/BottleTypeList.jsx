import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import BottleTypeForm from './BottleTypeForm';
import { FaEdit, FaTrash, FaPlus, FaExclamationTriangle } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import toast from 'react-hot-toast';

export default function BottleTypeList() {
  const { waterBottleTypes, updateBottleType, deleteBottleType, addBottleType } = useSettings();
  const [editingType, setEditingType] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (type) => {
    setEditingType(type);
    setShowAddForm(false);
  };

  const handleUpdate = (updatedData) => {
    updateBottleType(editingType.id, updatedData);
    setEditingType(null);
  };

  const handleAdd = (newType) => {
    addBottleType(newType);
    setShowAddForm(false);
  };

  const confirmDelete = (type) => {
    setTypeToDelete(type);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    deleteBottleType(typeToDelete.id);
    setIsDeleteModalOpen(false);
    toast.success('Bottle type deleted!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Water Bottle Types</h2>
        {!showAddForm && !editingType && (
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center"
          >
            <FaPlus className="mr-2" /> Add New
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="text-lg font-medium mb-3">Add New Bottle Type</h3>
          <BottleTypeForm 
            onSubmit={handleAdd} 
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {editingType && (
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="text-lg font-medium mb-3">Edit Bottle Type</h3>
          <BottleTypeForm 
            initialValues={editingType} 
            onSubmit={handleUpdate} 
            onCancel={() => setEditingType(null)}
          />
        </div>
      )}

      {waterBottleTypes.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">No bottle types added yet. Add your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {waterBottleTypes.map((type) => (
            <div 
              key={type.id} 
              className="bg-white p-4 rounded-md border border-gray-200 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{type.name}</h3>
                <p className="text-gray-600">K{type.price.toFixed(2)}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(type)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => confirmDelete(type)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md cursor-pointer transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
                  Delete Bottle Type
                </Dialog.Title>
              </div>
              
              <p className="mb-4">
                Are you sure you want to delete "{typeToDelete?.name}"? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="btn-secondary"
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