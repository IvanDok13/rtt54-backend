# Express Backend API

A secure backend where logged-in users can manage their own projects and tasks. Authentication uses JWTs, and data is stored in MongoDB.

## Dependencies

- Express
- MongoDB/Mongoose
- Dotenv
- Morgan
- Cors
- Helmet

## Dev Dependencies

- Nodemon

## Features

- **User Authentication**: Secure login and registration with JWT-based sessions and bcrypt password hashing.

- **Full CRUD Operations**: Complete create, read, update, and delete functionality for projects and tasks.

- **Strict Data Access Control**: Authorization on all protected routes ensures users can only access their own projects and tasks.

- **Modular & Maintainable**: A clean architecture with separation of concerns into routes, models, and configuration.

- **Secure Configuration**: Sensitive environment variables are managed using dotenv.

## Routes

| Method | Path                | Action                                                   |
| ------ | ------------------- | -------------------------------------------------------- |
| POST   | /api/users/login    | logs in the user and returns token                       |
| POST   | /api/users/register | registers a new user using email, username, and password |

| POST | /api/projects | creates a new project |
| GET | /api/projects | gets all projects owned by the currently logged-in user. |
| GET | /api/projects/:id | gets a single project by its ID |
| PUT | /api/projects/:id | updates a project |
| DELETE | /api/projects/:id | deletes a project |

| POST | /api/projects/:projectId/tasks | creates a new task for a specific project |
| GET | /api/projects/:projectId/tasks | gets all tasks for a specific project |
| PUT | /api/projects/:projectId/tasks:taskId | updates a single task |
| DELETE | /api/projects/:projectId/tasks:taskId | deletes a single task |
