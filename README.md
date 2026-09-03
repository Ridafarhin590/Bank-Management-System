# 🏦 BankFlow — Bank Management System

A full-stack banking management system built with **React.js, Spring Boot, MySQL, Spring Security, JWT, and Docker**.

BankFlow provides a secure and modern banking experience where customers can register, log in, manage their accounts, view balances, deposit and withdraw money, transfer funds, and view transaction history.

---

## 🌐 Live Demo

### Frontend
https://bank-management-system-ashy-three.vercel.app

### Backend API
https://bank-management-system-dyq8.onrender.com

---

## 📸 Project Overview

BankFlow is designed as a full-stack banking application with a separate frontend, backend, and database layer.

```text
┌─────────────────────────────┐
│       React + Vite          │
│         Frontend            │
│          Vercel             │
└──────────────┬──────────────┘
               │
               │ HTTPS / REST API
               ▼
┌─────────────────────────────┐
│       Spring Boot           │
│          Backend            │
│           Render            │
└──────────────┬──────────────┘
               │
               │ JDBC + SSL
               ▼
┌─────────────────────────────┐
│          MySQL              │
│           Aiven             │
└─────────────────────────────┘
