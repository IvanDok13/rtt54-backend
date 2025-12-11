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

## API Endpoints

| Method | Endpoint                              | Description                                                     |
| ------ | ------------------------------------- | --------------------------------------------------------------- |
| POST   | /api/users/login                      | Authenticates a user and returns a JWT token. token             |
| POST   | /api/users/register                   | Registers a new user with email, username, and password         |
| POST   | /api/projects                         | Creates a new project for the authenticated user                |
| GET    | /api/projects                         | Retrieves all projects owned by the currently logged-in user    |
| GET    | /api/projects/:id                     | Retrieves a single project by its ID (user must own the project |
| PUT    | /api/projects/:id                     | Updates a specific project (user must own the project)          |
| DELETE | /api/projects/:id                     | Deletes a specific project (user must own the project)          |
| POST   | /api/projects/:projectId/tasks        | Creates a new task under the specified project                  |
| GET    | /api/projects/:projectId/tasks        | Retrieves all tasks belonging to the specified project          |
| PUT    | /api/projects/:projectId/tasks:taskId | Updates a specific task within a project                        |
| DELETE | /api/projects/:projectId/tasks:taskId | Deletes a specific task from a project                          |
