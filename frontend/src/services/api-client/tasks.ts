// frontend/src/services/api-client/tasks.ts

import { Task } from '@/types/task';
import { apiClient } from './index';

export class TasksApi {
  // Get all tasks for the authenticated user
  static async getTasks(userId: string): Promise<Task[]> {
    const response = await apiClient.get<Task[]>(`/api/tasks/${userId}/tasks`);
    return response.data;
  }

  // Get a specific task
  static async getTask(userId: string, taskId: string): Promise<Task> {
    const response = await apiClient.get<Task>(`/api/tasks/${userId}/tasks/${taskId}`);
    return response.data;
  }

  // Create a new task
  static async createTask(userId: string, taskData: Partial<Task>): Promise<Task> {
    const response = await apiClient.post<Task>(`/api/tasks/${userId}/tasks`, taskData);
    return response.data;
  }

  // Update a task
  static async updateTask(userId: string, taskId: string, taskData: Partial<Task>): Promise<Task> {
    const response = await apiClient.put<Task>(`/api/tasks/${userId}/tasks/${taskId}`, taskData);
    return response.data;
  }

  // Update only the completion status of a task
  static async updateTaskCompletion(userId: string, taskId: string, completed: boolean): Promise<Task> {
    const response = await apiClient.patch<Task>(`/api/tasks/${userId}/tasks/${taskId}/complete`, { completed });
    return response.data;
  }

  // Delete a task
  static async deleteTask(userId: string, taskId: string): Promise<void> {
    await apiClient.delete(`/api/tasks/${userId}/tasks/${taskId}`);
  }
}

export default TasksApi;