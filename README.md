
README.md

# 🏦 BankFlow – Bank Management System

BankFlow is a full-stack Bank Management System built using Spring Boot, React.js, MySQL, and JWT Authentication.

The application provides secure customer authentication, account management, deposits, withdrawals, money transfers, transaction history, customer profiles, and admin management.

---

## 🌐 Live Demo

### Frontend
https://bank-management-system-ashy-three.vercel.app

### Backend API
https://bank-management-system-dyq8.onrender.com

### GitHub Repository
https://github.com/Ridafarhin590/Bank-Management-System

---

## ✨ Features

### 🔐 Authentication
- Customer registration
- Customer login
- JWT-based authentication
- BCrypt password encryption
- Role-based authentication
- Logout functionality
- Protected API endpoints

### 👤 Customer Management
- Customer registration
- Customer login
- View customer profile
- View customer information
- Customer account details
- Secure customer authentication

### 🏦 Account Management
- Create bank accounts
- Savings account
- Current account
- Account balance management
- Account status management
- Active / Blocked / Closed account states
- View account details

### 💰 Banking Transactions
- Deposit money
- Withdraw money
- Transfer money
- Balance validation
- Insufficient balance handling
- Transaction history
- Sender and receiver tracking

### 📊 Dashboard
- Account balance
- Money received
- Money spent
- Recent transactions
- Quick banking actions
- Account information

### 🛡️ Admin Management
- Admin authentication
- Admin role
- Customer management
- View all customers
- Protected admin APIs
- Role-based authorization

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Axios
- React Router
- Lucide React

## Backend
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- BCrypt
- Maven
- Lombok
- Jakarta Validation

## Database
- MySQL
- Hibernate / JPA

## Deployment
- GitHub
- Vercel
- Render
- Aiven MySQL
- Docker

---

# 🏗️ Application Architecture

                    ┌──────────────────────┐
                    │      React.js        │
                    │       Vite           │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌──────────────────────┐
                    │    Spring Boot       │
                    │      Backend         │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │   Spring Security    │
                    │   JWT Authentication │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Controllers      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Services       │
                    │   Business Logic     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Repositories      │
                    │        JPA           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │        MySQL         │
                    │      Database        │
                    └──────────────────────┘

---

# 🔄 Request Flow

React Frontend
      ↓
Axios API Request
      ↓
JWT Token
      ↓
Spring Security
      ↓
JWT Authentication Filter
      ↓
Controller
      ↓
Service
      ↓
Repository
      ↓
MySQL Database
      ↓
Response
      ↓
React Frontend

---

# 🔑 JWT Authentication

BankFlow uses JWT for securing protected APIs.

The authentication flow works as follows:

User Login
     ↓
Email + Password
     ↓
Spring Security
     ↓
Password Verification
     ↓
JWT Token Generated
     ↓
Frontend Stores Token
     ↓
Protected API Request
     ↓
Authorization: Bearer <TOKEN>
     ↓
JWT Filter
     ↓
Token Validation
     ↓
User Authentication
     ↓
Controller

Example request header:

Authorization: Bearer YOUR_JWT_TOKEN

The JWT contains:

Subject → Customer Email
Role → CUSTOMER / ADMIN

---

# 🔐 Password Security

Passwords are never stored as plain text.

BankFlow uses BCrypt Password Encoder.

User Password
      ↓
BCrypt
      ↓
Encrypted Password
      ↓
MySQL

During login:

Entered Password
      ↓
BCrypt Verification
      ↓
Stored Password
      ↓
Authentication Success / Failure

---

# 👥 Role-Based Authorization

The application supports two roles:

CUSTOMER
ADMIN

Customers can access customer-related features.

Admins can access protected admin APIs.

Example:

/api/admin/**

is protected using the ADMIN role.

---

# 🏦 Account Types

BankFlow supports:

SAVINGS
CURRENT

Account status:

ACTIVE
BLOCKED
CLOSED

---

# 💸 Transaction Types

The system supports:

DEPOSIT
WITHDRAW
TRANSFER

### Deposit

Customer
   ↓
Deposit Request
   ↓
Account Validation
   ↓
Balance Updated
   ↓
Transaction Created

### Withdraw

Customer
   ↓
Withdraw Request
   ↓
Account Validation
   ↓
Balance Check
   ↓
Balance Updated
   ↓
Transaction Created

### Transfer

Sender Account
      ↓
Sender Validation
      ↓
Balance Check
      ↓
Receiver Validation
      ↓
Money Deducted
      ↓
Money Added
      ↓
Transfer Transaction Created

---

# 🗄️ Database Design

The main database entities are:

Customer
   │
   │ 1
   │
   │ *
   ▼
Account
   │
   │
   ▼
Transaction

### Customer

Stores:

- ID
- Name
- Email
- Phone
- Address
- Password
- Role
- Created date

### Account

Stores:

- Account ID
- Account number
- Account type
- Balance
- Account status
- Customer relationship

### Transaction

Stores:

- Transaction ID
- Transaction type
- Amount
- Sender account
- Receiver account
- Transaction date

---

# 📁 Backend Architecture

bank-management-system
│
├── src
│   └── main
│       └── java
│           └── com.bank.bankmanagementsystem
│
│               ├── config
│               │   └── CorsConfig.java
│               │
│               ├── controller
│               │   ├── AuthController.java
│               │   ├── CustomerController.java
│               │   ├── AccountController.java
│               │   ├── TransactionController.java
│               │   └── AdminController.java
│               │
│               ├── dto
│               │   ├── RegisterRequest.java
│               │   ├── LoginRequest.java
│               │   ├── DepositRequest.java
│               │   ├── WithdrawRequest.java
│               │   ├── TransferRequest.java
│               │   └── CustomerResponse.java
│               │
│               ├── entity
│               │   ├── Customer.java
│               │   ├── Account.java
│               │   └── Transaction.java
│               │
│               ├── enums
│               │   ├── Role.java
│               │   ├── AccountType.java
│               │   ├── AccountStatus.java
│               │   └── TransactionType.java
│               │
│               ├── repository
│               │   ├── CustomerRepository.java
│               │   ├── AccountRepository.java
│               │   └── TransactionRepository.java
│               │
│               ├── service
│               │   ├── CustomerService.java
│               │   ├── AccountService.java
│               │   └── TransactionService.java
│               │
│               ├── security
│               │   ├── SecurityConfig.java
│               │   ├── JwtService.java
│               │   └── JwtAuthenticationFilter.java
│               │
│               ├── exception
│               │   ├── ResourceNotFoundException.java
│               │   ├── InsufficientBalanceException.java
│               │   └── GlobalExceptionHandler.java
│               │
│               ├── AdminInitializer.java
│               └── BankManagementSystemApplication.java
│
├── pom.xml
├── Dockerfile
└── application.properties

---

# 🎨 Frontend Architecture

frontend
│
├── src
│   │
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Account.jsx
│   │   ├── Transfer.jsx
│   │   ├── Deposit.jsx
│   │   ├── Withdraw.jsx
│   │   ├── Profile.jsx
│   │   └── Settings.jsx
│   │
│   ├── api.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── package.json
└── vite.config.js

---

# 📦 DTOs

Data Transfer Objects are used to transfer data between the frontend and backend.

The application contains:

RegisterRequest
LoginRequest
DepositRequest
WithdrawRequest
TransferRequest
CustomerResponse

---

# 🌐 REST API

## Authentication

POST /api/auth/register
POST /api/auth/login

## Customer

GET /api/customers
GET /api/customers/{id}

## Account

GET /api/accounts
POST /api/accounts
GET /api/accounts/{id}

## Transactions

POST /api/transactions/deposit
POST /api/transactions/withdraw
POST /api/transactions/transfer
GET /api/transactions/history

## Admin

GET /api/admin/**

Protected APIs require:

Authorization: Bearer <JWT_TOKEN>

---

# 🛡️ Exception Handling

The backend includes centralized exception handling.

Examples include:

- Customer Not Found
- Account Not Found
- Insufficient Balance
- Invalid Credentials
- Email Already Registered
- Invalid Request
- Unauthorized Access

A global exception handler provides structured API responses.

---

# 🌍 CORS Configuration

The backend supports requests from the local development environment and deployed React frontend.

Local frontend:

http://localhost:5173

Production frontend:

https://bank-management-system-ashy-three.vercel.app

---

# 🐳 Docker

The Spring Boot backend is containerized using Docker.

Dockerfile:

FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .

RUN chmod +x mvnw

RUN ./mvnw dependency:go-offline -B

COPY src src

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/bank-management-system-0.0.1-SNAPSHOT.jar"]

---

# 💻 Local Installation

## 1. Clone Repository

git clone https://github.com/Ridafarhin590/Bank-Management-System.git

Move into the project:

cd Bank-Management-System

---

# ⚙️ Backend Setup

Move into the backend directory:

cd bank-management-system

### Windows

.\mvnw.cmd spring-boot:run

### Linux / macOS

./mvnw spring-boot:run

Backend:

http://localhost:8080

---

# 🎨 Frontend Setup

Open another terminal.

cd frontend

Install dependencies:

npm install

Start development server:

npm run dev

Frontend:

http://localhost:5173

---

# 🔧 Environment Variables

The backend uses environment variables for database credentials, JWT configuration, and administrator credentials.

Example:

DB_URL=jdbc:mysql://localhost:3306/bank_management_system
DB_USERNAME=root
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password

These values should not be committed to GitHub.

---

# 🗃️ MySQL Configuration

Create a MySQL database:

CREATE DATABASE bank_management_system;

Configure the database connection using environment variables.

Spring Boot and Hibernate automatically create/update the required tables using JPA.

---

# 🚀 Deployment

BankFlow is deployed using:

GitHub
   │
   ├── React Frontend
   │       ↓
   │     Vercel
   │
   └── Spring Boot Backend
           ↓
         Render
           │
           ▼
        Aiven MySQL

### Frontend

Vercel

Production URL:

https://bank-management-system-ashy-three.vercel.app

### Backend

Render

Production API:

https://bank-management-system-dyq8.onrender.com

### Database

Aiven MySQL

---

# 🔄 Production API Configuration

The React frontend communicates with the deployed backend using Axios.

Example:

import axios from "axios";

const api = axios.create({
  baseURL: "https://bank-management-system-dyq8.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

---

# 🧪 Testing

The application can be tested through the frontend or REST API tools such as Postman.

Basic authentication testing:

Register Customer
       ↓
Login Customer
       ↓
Receive JWT Token
       ↓
Store JWT Token
       ↓
Access Protected API

Transaction testing:

Create Account
       ↓
Deposit Money
       ↓
Check Balance
       ↓
Withdraw Money
       ↓
Transfer Money
       ↓
Check Transaction History

---

# 🔒 Security

Security features implemented in BankFlow include:

- JWT authentication
- BCrypt password hashing
- Spring Security
- Role-based authorization
- Protected API endpoints
- CORS configuration
- Environment variables for secrets
- Stateless authentication
- Server-side validation
- Balance validation for withdrawals and transfers

---

# 📈 Future Enhancements

Possible future improvements include:

- Email OTP verification
- Two-factor authentication
- Forgot password functionality
- Email notifications
- PDF bank statements
- Advanced transaction filtering
- Admin dashboard analytics
- Multiple bank accounts per customer
- Beneficiary management
- Scheduled transfers
- Transaction search
- Improved account security
- Mobile responsive improvements
- Automated testing
- CI/CD pipeline
- Cloud monitoring

---

# 🤝 Contributing

Contributions are welcome.

To contribute:

git clone https://github.com/Ridafarhin590/Bank-Management-System.git

Create a new branch:

git checkout -b feature/new-feature

Make your changes:

git add .
git commit -m "Add new feature"

Push the branch:

git push origin feature/new-feature

Then create a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

See the LICENSE file for more information.

---

# 👩‍💻 Author

## Rida Farhin

Master of Computer Applications (MCA)

Aspiring Software Engineer | Full Stack Developer

### GitHub

https://github.com/Ridafarhin590

### Email

ridafarhin59@gmail.com

---

# 🔗 Project Links

### GitHub Repository

https://github.com/Ridafarhin590/Bank-Management-System

### Live Frontend

https://bank-management-system-ashy-three.vercel.app

### Live Backend

https://bank-management-system-dyq8.onrender.com

---

# ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.

Your support is appreciated!

---

# 🏦 BankFlow

Secure • Simple • Reliable Banking Management
