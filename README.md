Tech Mill - E-Commerce Backend API
Project Overview

Tech Mill is a simple e-commerce backend API built with ExpressJS. It allows:

Unauthenticated users to view approved products.

Authenticated users to create, update, and delete their own products.

Admins to manage users (ban/unban) and approve/disapprove products.

The system ensures role-based access control, security, and scalability using modern backend practices.

Features
User Management

User registration with name, email, and password.

Email/password login with JWT-based authentication.

Role-based access: User and Admin.

Admins can view and ban/unban users.

Banned users cannot log in or interact with the system.

Product Management

Authenticated users can create, update, and delete their products.

Admins can approve or disapprove products.

Only approved products are visible to public users.

Unauthenticated users can view only approved products.

Performance Optimizations

Database Indexing: Indexes on frequently queried fields (e.g., user email) for faster authentication and retrieval.

Connection Pooling: Configured database pool to efficiently manage multiple concurrent connections.

Query Optimization: Optimized relations (User → Product, User → Token) to reduce unnecessary data fetch.

Technology Stack

Backend: Node.js, ExpressJS

Database: PostgreSQL / Sequelize ORM

Authentication: JWT access & refresh tokens

Validation: Joi

Version Control: Git

Getting Started
Prerequisites

Node.js >= 20

PostgreSQL database

Git

Installation

Clone the repository:

git clone https://github.com/beardgod7/techmill_test.git
cd techmill_test

Install dependencies:

npm install

Create a .env file in the root directory (see .env.example) with the following variables:

PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=techmill
JWT_SECRET=your_jwt_secret

Run database migrations:

npx sequelize-cli db:migrate

Start the development server:

npm run dev

API Endpoints
User Routes
Method Endpoint Role Description
POST /api/v1/auth/register Public User registration
POST /api/v1/auth/login Public User login
POST /api/v1/auth/logout Authenticated Logout and revoke refresh token
PATCH /api/v1/users/:id/ban Admin Ban or unban a user
Product Routes
Method Endpoint Role Description
GET /api/v1/product/ Public List all approved products
POST /api/v1/product/create Auth User Create a new product
PUT /api/v1/product/update/:id Auth User Update a product
DELETE /api/v1/product/delete/:id Auth User Delete a product
PATCH /api/v1/product/:id/approve Admin Approve or unapprove a product
Postman Documentation

Full API documentation is available in the [techmill-test.postman_collection.json file] in docs folder

Includes request schemas, example responses, and authentication setup.

Environment Variables
Variable Description
PORT Server port
DB_HOST Database host
DB_PORT Database port
DB_USERNAME Database username
DB_PASSWORD Database password
DB_NAME Database name
JWT_SECRET Secret key for signing JWT tokens
Code Structure

src/: All source files

features/: Modular features (Auth, Product, User)

controllers/: Request handlers

services/: Business logic

repositories/: Database operations

middleware/: Auth & validation

config/: DB & environment configs

routes/: Express route definitions

Scripts
Command Description
npm start Run the application
npm run dev Run with nodemon for development
npm run lint Lint code with ESLint
npm run format Format code with Prettier
