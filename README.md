# E-Commerce App

A Flutter-based e-commerce app with user authentication (login/signup) and product listing functionalities. The app communicates with a backend server built using Node.js, Express, MySQL2, bcryptjs, and body-parser.

## Features
- **User Authentication:** Login and signup functionality with password hashing using bcrypt.
- **Product Listing:** Display products fetched from the backend.
- **Backend API:** RESTful APIs for user authentication and product management.

## Tech Stack
- **Frontend:** Flutter
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Authentication:** bcryptjs for password hashing

## Getting Started

### 1. **Flutter App Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-app.git
   cd app
   ```
2. Create a new Flutter project (if not already created):
   ```bash
   flutter create my_app
   ```
3. Replace the contents of `lib/main.dart` with the provided Flutter code.
4. Install dependencies:
   ```bash
   flutter pub get
   ```
5. Run the app:
   ```bash
   flutter run
   ```

### 2. **Backend Setup**
1. Clone the backend repository (or navigate to the backend folder):
   ```bash
   git clone https://github.com/your-username/ecommerce-backend.git
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install express mysql2 bcryptjs body-parser
   ```
3. Set up the MySQL database and create the `users` table:
   ```sql
   CREATE DATABASE ecommerce_db;
   USE ecommerce_db;
   CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL);
   ```
4. Run the backend server:
   ```bash
   node server.js
   ```

### 3. **Accessing the App**
- The backend will be running on `http://localhost:3000`.
- The Flutter app communicates with this backend for login/signup and product data.
