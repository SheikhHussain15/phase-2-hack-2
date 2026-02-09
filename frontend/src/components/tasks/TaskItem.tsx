// frontend/src/components/tasks/TaskItem.tsx

import React, { useState } from 'react';
import { Task } from '@/types/task';
import { TaskEditForm } from './TaskEditForm';
import { TaskCompletionToggle } from './TaskCompletionToggle';
import { TaskDeleteButton } from './TaskDeleteButton';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: string) => void;
}

export function TaskItem({ task, onTaskUpdated, onTaskDeleted }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedTask: Task) => {
    onTaskUpdated(updatedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <li className={`px-4 py-4 sm:px-6 ${task.completed ? 'bg-green-50' : 'bg-white'}`}>
      {isEditing ? (
        <TaskEditForm 
          task={task} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TaskCompletionToggle 
              task={task} 
              onTaskUpdated={onTaskUpdated} 
            />
            <div className="ml-3 min-w-0">
              <p className={`text-sm font-medium truncate ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.title}
              </p>
              {task.description && (
                <p className="hidden md:block text-sm text-gray-500 truncate">
                  {task.description}
                </p>
              )}
              <div className="mt-1 flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-xs text-gray-500">
                <p className="truncate">Created: {new Date(task.created_at).toLocaleDateString()}</p>
                <p className="mt-1 sm:mt-0">Updated: {new Date(task.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-2.5 py-0.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
            <TaskDeleteButton 
              taskId={task.id} 
              onTaskDeleted={onTaskDeleted} 
            />
          </div>
        </div>
      )}
    </li>
  );
}