// frontend/src/components/tasks/TaskList.tsx

import React from 'react';
import { Task } from '@/types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: string) => void;
}

export function TaskList({ tasks, onTaskUpdated, onTaskDeleted }: TaskListProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onTaskUpdated={onTaskUpdated} 
            onTaskDeleted={onTaskDeleted} 
          />
        ))}
      </ul>
    </div>
  );
}