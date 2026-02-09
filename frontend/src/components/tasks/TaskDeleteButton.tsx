// frontend/src/components/tasks/TaskDeleteButton.tsx

import React, { useState } from 'react';
import TasksApi from '@/services/api-client/tasks';

interface TaskDeleteButtonProps {
  taskId: string;
  onTaskDeleted: (taskId: string) => void;
}

export function TaskDeleteButton({ taskId, onTaskDeleted }: TaskDeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    try {
      // Delete the task via API
      await TasksApi.deleteTask('me', taskId); // 'me' should be replaced with actual user ID
      
      // Notify parent component
      onTaskDeleted(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
      // Optionally show an error message to the user
    } finally {
      setIsDeleting(false);
      setShowConfirmation(false);
    }
  };

  return (
    <>
      {showConfirmation ? (
        <div className="flex space-x-2">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center px-2.5 py-0.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Confirm'}
          </button>
          <button
            onClick={() => setShowConfirmation(false)}
            className="inline-flex items-center px-2.5 py-0.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowConfirmation(true)}
          className="inline-flex items-center px-2.5 py-0.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      )}
    </>
  );
}