import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { useAuth } from '@/context/AuthContext';
import BottleTypeForm from './BottleTypeForm';
import { FaEdit, FaTrash, FaPlus, FaExclamationTriangle, FaLock } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import toast from 'react-hot-toast';

export default function BottleTypeList() {
  const { waterBottleTypes, updateBottleType, deleteBottleType, addBottleType, canEditPrices } = useSettings();
  const { currentUser } = useAuth();
  const [editingType, setEditingType] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (type) => {
    if (!canEditPrices) {
      toast.error('Only sellers can edit prices');
      return;
    }
    setEditingType(type);
    setShowAddForm(false);
  };

  const handleUpdate = (updatedData) => {
    if (!canEditPrices) {
      toast.error('Only sellers can edit prices');
      return;
    }
    const success = updateBottleType(editingType.id, updatedData);
    if (success) {
      setEditingType(null);
    } else {
      toast.error('You do not have permission to update prices');
    }
  };

  const handleAdd = (newType) => {
    if (!canEditPrices) {
      toast.error('Only sellers can add bottle types');
      return;
    }
    const success = addBottleType(newType);
    if (success) {
      setShowAddForm(false);
    } else {
      toast.error('You do not have permission to add bottle types');
    }
  };

  const confirmDelete = (type) => {
    if (!canEditPrices) {
      toast.error('Only sellers can delete bottle types');
      return;
    }
    setTypeToDelete(type);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!canEditPrices) {
      toast.error('You do not have permission to delete bottle types');
      setIsDeleteModalOpen(false);
      return;
    }
    const success = deleteBottleType(typeToDelete.id);
    if (success) {
      toast.success('Bottle type deleted!');
    } else {
      toast.error('Failed to delete bottle type');
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Water Bottle Types</h2>
        {!showAddForm && !editingType && canEditPrices && (
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center cursor-pointer"
          >
            <FaPlus className="mr-2" /> Add New
          </button>
        )}
      </div>

      {!canEditPrices && currentUser && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-4">
          <div className="flex items-start">
            <FaLock className="text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium text-yellow-700">Restricted Access</p>
              <p className="text-sm text-yellow-600">
                Only sellers and administrators can modify water bottle types and prices.
              </p>
            </div>
          </div>
        </div>
      )}

      {showAddForm && canEditPrices && (
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="text-lg font-medium mb-3">Add New Bottle Type</h3>
          <BottleTypeForm 
            onSubmit={handleAdd} 
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {editingType && canEditPrices && (
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
              {canEditPrices && (
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
              )}
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