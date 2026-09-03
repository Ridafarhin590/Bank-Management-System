# 🏦 BankFlow — Full-Stack Bank Management System

A full-stack **Bank Management System** built using **React.js, Vite, Java, Spring Boot, Spring Security, JWT, Spring Data JPA, Hibernate, MySQL, and Docker**.

BankFlow provides a modern banking application where customers can register, authenticate securely, manage accounts, perform banking transactions, and access their banking information through a responsive web interface.

The application follows a **three-tier architecture** with a React frontend, Spring Boot REST API backend, and MySQL database.

---

# 🌐 Live Application

## Frontend — Vercel

🔗 **Live Website**

https://bank-management-system-ashy-three.vercel.app

The React/Vite frontend is deployed on **Vercel**.

---

## Backend — Render

🔗 **Spring Boot Backend**

https://bank-management-system-dyq8.onrender.com

The Spring Boot REST API is deployed on **Render** using Docker.

---

## Database — Aiven

The production database is hosted using **Aiven MySQL** with an SSL-secured database connection.

> Database credentials and secrets are stored as environment variables and are not committed to the repository.

---

# 📌 Project Overview

BankFlow is a full-stack banking application designed to demonstrate how a modern web application can be structured using a separate frontend, backend, and database.

The application uses:

- React.js for the user interface
- Vite for frontend development and bundling
- Axios for REST API communication
- React Router for client-side routing
- Spring Boot for backend REST APIs
- Spring Security for authentication and authorization
- JWT for stateless authentication
- BCrypt for password hashing
- Spring Data JPA and Hibernate for database operations
- MySQL for persistent data storage
- Docker for backend containerization
- Render for backend deployment
- Vercel for frontend deployment
- Aiven for cloud MySQL hosting

---

# 🏗️ System Architecture

```text
                         USER
                          │
                          ▼
              ┌──────────────────────┐
              │      Vercel          │
              │   React + Vite       │
              │      Frontend        │
              └──────────┬───────────┘
                         │
                         │ HTTPS / REST API
                         │
                         ▼
              ┌──────────────────────┐
              │      Render          │
              │    Spring Boot       │
              │      Backend         │
              │       Docker         │
              └──────────┬───────────┘
                         │
                         │ JDBC + SSL
                         │
                         ▼
              ┌──────────────────────┐
              │       Aiven          │
              │     MySQL 8.x        │
              │      Database        │
              └──────────────────────┘
