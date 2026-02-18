'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import apiClient from '@/utils/api'
import { PlusCircle, Trash2, Edit3, CheckCircle, Circle } from 'lucide-react'
import { Container, Header, Button, Card, Badge, Skeleton, Grid, Input } from '@components/ui'

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [showForm, setShowForm] = useState(false)

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    fetchTasks()
  }, [router])

  const fetchTasks = async () => {
    try {
      const response = await apiClient.get('/tasks')

      setTasks(response.data)
      setLoading(false)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tasks')
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingId) {
        // Update existing task
        await apiClient.put(`/tasks/${editingId}`, {
          title: editTitle,
          description: editDescription
        })

        setEditingId(null)
        setEditTitle('')
        setEditDescription('')
      } else {
        // Create new task
        const response = await apiClient.post('/tasks', {
          title,
          description
        })
        console.log('Task created successfully:', response.data)

        setTitle('')
        setDescription('')
      }

      fetchTasks() // Refresh tasks
      setShowForm(false)
    } catch (err: any) {
      console.error('Task operation error:', err)
      
      let errorMessage = 'Operation failed'
      
      if (err.response) {
        // Server responded with error
        const errorData = err.response.data
        if (errorData?.detail) {
          errorMessage = typeof errorData.detail === 'string' 
            ? errorData.detail 
            : JSON.stringify(errorData.detail)
        } else if (errorData?.message) {
          errorMessage = errorData.message
        }
      } else if (err.request) {
        // Request was made but no response
        errorMessage = 'No response from server. Please check if the backend is running.'
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await apiClient.delete(`/tasks/${id}`)
        
        fetchTasks() // Refresh tasks
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete task')
      }
    }
  }

  const startEditing = (task: Task) => {
    setEditingId(task.id)
    setEditTitle(task.title)
    setEditDescription(task.description)
    setShowForm(true)
  }

  const toggleComplete = async (id: string, currentStatus: boolean) => {
    try {
      await apiClient.patch(`/tasks/${id}/toggle`)
      
      fetchTasks() // Refresh tasks
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update task')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container size="xl">
          <div className="py-12">
            {/* Loading Skeleton */}
            <div className="mb-8">
              <Skeleton variant="text" width="200px" height="36px" />
            </div>
            <div className="space-y-4">
              <Skeleton variant="rectangular" height="120px" />
              <Skeleton variant="rectangular" height="120px" />
              <Skeleton variant="rectangular" height="120px" />
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <Container size="xl">
          <div className="py-6">
            <Header
              title="Your Tasks"
              actions={
                <Button
                  variant="danger"
                  size="md"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              }
            />
          </div>
        </Container>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-md bg-error-50 p-4" role="alert">
            <p className="text-sm text-error-700">{error}</p>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Manage Your Tasks</h2>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setShowForm(!showForm)
              setEditingId(null)
              setEditTitle('')
              setEditDescription('')
            }}
            icon={<PlusCircle className="mr-2 h-4 w-4" />}
          >
            {showForm ? 'Cancel' : 'Add New Task'}
          </Button>
        </div>

        {/* Task Form */}
        {showForm && (
          <div className="mb-8">
            <Card padding="lg" shadow="md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingId ? 'Edit Task' : 'Create New Task'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <Input
                  id="title"
                  label="Title"
                  type="text"
                  placeholder="Task title"
                  value={editingId ? editTitle : title}
                  onChange={(e) =>
                    editingId
                      ? setEditTitle(e.target.value)
                      : setTitle(e.target.value)
                  }
                  required
                />

                {/* Description Field */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={editingId ? editDescription : description}
                    onChange={(e) =>
                      editingId
                        ? setEditDescription(e.target.value)
                        : setDescription(e.target.value)
                    }
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Task description"
                  />
                </div>

                <div>
                  <Button type="submit" variant="primary" size="md">
                    {editingId ? 'Update Task' : 'Create Task'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Tasks List */}
        <Card padding="none" shadow="md">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No tasks yet. Create your first task!</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <li key={task.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleComplete(task.id, task.completed)}
                          className="flex-shrink-0 h-5 w-5 text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded"
                        >
                          {task.completed ? (
                            <CheckCircle className="h-5 w-5 text-success-500" />
                          ) : (
                            <Circle className="h-5 w-5 hover:text-primary-500" />
                          )}
                        </button>
                        <p className={`ml-3 text-sm font-medium ${
                          task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Badge variant={task.completed ? 'success' : 'warning'} size="sm">
                          {task.completed ? 'Completed' : 'Pending'}
                        </Badge>
                        <time className="ml-2 text-sm text-gray-500">
                          {new Date(task.updatedAt).toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                    {task.description && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {task.description}
                        </p>
                      </div>
                    )}
                    <div className="mt-2 flex items-center space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => startEditing(task)}
                        icon={<Edit3 className="h-3 w-3 mr-1" />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(task.id)}
                        icon={<Trash2 className="h-3 w-3 mr-1" />}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </main>
    </div>
  )
}