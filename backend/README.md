# Backend for Multi-User Todo Web Application

This is the backend service for the multi-user todo web application with JWT-based authentication.

## Features

- JWT-based authentication using Better Auth
- User data isolation
- RESTful API endpoints for task management
- FastAPI framework with automatic API documentation
- SQLModel for database operations with Neon Serverless PostgreSQL
- Serverless-compatible database session management

## Prerequisites

- Python 3.11+
- pip

## Setup

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:

```bash
pip install poetry
poetry install
```

Or if you prefer pip:

```bash
pip install -r requirements.txt
```

4. Set up environment variables (see `.env.example`)

## Environment Variables

Create a `.env` file in the backend root directory with the following variables:

```bash
BETTER_AUTH_SECRET=your_jwt_secret_key_here
DATABASE_URL=your_neon_postgres_connection_string
```

## Running the Application

```bash
# Using poetry
poetry run uvicorn src.main:app --reload --port 8000

# Using pip
uvicorn src.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000` and the interactive documentation at `http://localhost:8000/docs`.

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Endpoints
- `GET /api/users/{user_id}` - Get user information

### Task Management Endpoints
- `GET /api/tasks/{user_id}/tasks` - Get all tasks for a user
- `POST /api/tasks/{user_id}/tasks` - Create a new task for a user
- `GET /api/tasks/{user_id}/tasks/{task_id}` - Get a specific task
- `PUT /api/tasks/{user_id}/tasks/{task_id}` - Update a specific task
- `PATCH /api/tasks/{user_id}/tasks/{task_id}/complete` - Update only the completion status
- `DELETE /api/tasks/{user_id}/tasks/{task_id}` - Delete a specific task

For detailed API documentation, see the [Task API Documentation](../docs/task-api-documentation.md).

## Testing

Run the tests using pytest:

```bash
# Using poetry
poetry run pytest

# Using pip
pytest
```