// frontend/src/components/tasks/TaskCompletionToggle.tsx

import React, { useState } from 'react';
import { Task } from '@/types/task';
import TasksApi from '@/services/api-client/tasks';

interface TaskCompletionToggleProps {
  task: Task;
  onTaskUpdated: (task: Task) => void;
}

export function TaskCompletionToggle({ task, onTaskUpdated }: TaskCompletionToggleProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCompletion = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      // Update the task completion status via API
      const updatedTask = await TasksApi.updateTaskCompletion(task.user_id, task.id, !task.completed);
      
      // Update the task in the parent component
      onTaskUpdated(updatedTask);
    } catch (error) {
      console.error('Error updating task completion:', error);
      // Optionally show an error message to the user
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      onClick={toggleCompletion}
      disabled={isUpdating}
      className={`h-5 w-5 rounded-full flex items-center justify-center ${
        task.completed 
          ? 'bg-green-500 text-white' 
          : 'border-2 border-gray-300 hover:border-gray-400'
      } ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
    >
      {task.completed && !isUpdating && (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {isUpdating && (
        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
    </button>
  );
}