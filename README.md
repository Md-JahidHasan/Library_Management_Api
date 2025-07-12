# 📚 Library Management API

A robust RESTful API using **Express**, **TypeScript**, and **MongoDB** to manage books and borrowing functionality for a library system.

---

## 🚀 Features

### ✅ Book Management
- Add new books with validation
- View all books with filters and sorting
- Retrieve a book by ID
- Update book details
- Delete a book

### ✅ Borrowing System
- Borrow books with quantity check
- Reduce available copies on borrow
- Auto-disable availability when copies reach zero
- Borrow record saved with due date

### ✅ Summary & Reporting
- Aggregated summary of borrowed books
- Includes book title, ISBN, and total quantity borrowed

### ✅ Advanced Mongoose Features
- Schema validations
- Pre-save middleware
- Instance method for availability
- Aggregation pipeline
- Centralized error handling with detailed format

---

## 🧠 Technologies

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- Dotenv for environment configuration

---

## 📁 Project Structure


---

## 🔌 API Endpoints

### 📘 Books

| Method | Route                 | Description             |
|--------|----------------------|-------------------------|
| POST   | `/api/books`         | Create a new book       |
| GET    | `/api/books`         | Get all books           |
| GET    | `/api/books/:id`     | Get book by ID          |
| PUT    | `/api/books/:id`     | Update a book           |
| DELETE | `/api/books/:id`     | Delete a book           |

Supports:
- `filter`: genre
- `sortBy`: field name (e.g. `createdAt`)
- `sort`: `asc` or `desc`
- `limit`: number of results

---

### 📕 Borrowing

| Method | Route           | Description                    |
|--------|------------------|--------------------------------|
| POST   | `/api/borrow`    | Borrow a book                  |
| GET    | `/api/borrow`    | Borrow summary report          |

---

## ❗ Error Response Format

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}

🛠️ Getting Started
1️⃣ Clone the Repository
git clone https:https://github.com/Md-JahidHasan/Library_Management_Api.git
cd library-management-api

2️⃣ Install Dependencies

npm install

3️⃣ Create .env File

PORT=5001
MONGODB_URI=mongodb://localhost:27017/libraryDB

4️⃣ Run the Application
Development:

npm run dev
Production:


npm run build
npm start

📦 Example Payloads:

📘 Create Book
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}

📕 Borrow Book
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
📽️ Bonus (Optional)
🔗 Live Link: coming soon

🎥 Demo Video: coming soon

📖 API Documentation: coming soon

