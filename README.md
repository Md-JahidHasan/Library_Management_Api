📚 Library Management API
A robust RESTful API built with Express, TypeScript, and MongoDB to manage library books and borrowing records. It supports CRUD operations, borrowing logic with business constraints, and summary reporting using MongoDB aggregation.

🚀 Features
✅ Book Management:

Create new books with validation.

View all books with filters and sorting.

Retrieve individual book by ID.

Update book information.

Delete books.

✅ Borrowing Logic:

Borrow a book only if sufficient copies are available.

Copies reduce upon borrowing.

Book marked as unavailable when no copies are left.

Borrow records are saved with due dates.

✅ Summary Reporting:

Aggregated summary of total borrowed quantities per book.

Includes book title and ISBN.

✅ Advanced Mongoose Usage:

Schema validation

Pre-save middleware

Instance methods

Aggregation pipeline

✅ Error Handling:

Standardized error responses

Validation & CastError support

🛠️ Tech Stack
Node.js

Express

TypeScript

MongoDB with Mongoose

dotenv for environment management

Postman for testing

📂 Project Structure
bash
Copy
Edit
src/
│
├── app.ts                # Express App Config
├── server.ts             # Server Entry Point
├── controllers/          # Route Handlers
│   ├── book.controller.ts
│   └── borrow.controller.ts
├── models/               # Mongoose Schemas
│   ├── book.model.ts
│   └── borrow.model.ts
├── routes/               # API Routes
│   ├── book.route.ts
│   └── borrow.route.ts
├── middleware/           # Custom Middleware
│   └── errorHandler.ts
🔗 API Endpoints
📘 Book Endpoints
Method	Route	Description
POST	/api/books	Create a new book
GET	/api/books	Retrieve all books
GET	/api/books/:id	Retrieve a book by ID
PUT	/api/books/:id	Update a book
DELETE	/api/books/:id	Delete a book

Supports Query Parameters:

filter: genre (e.g., FANTASY)

sortBy: field name (e.g., createdAt)

sort: asc or desc

limit: number of results

📕 Borrow Endpoints
Method	Route	Description
POST	/api/borrow	Borrow a book
GET	/api/borrow	Summary of borrowed books

📦 Setup Instructions
Clone the Repository

bash
Copy
Edit
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
Install Dependencies

bash
Copy
Edit
npm install
Create .env File

ini
Copy
Edit
PORT=5000
MONGODB_URI=mongodb://localhost:27017/libraryDB
Run the Server

For development (with hot reload):

bash
Copy
Edit
npm run dev
For production build:

bash
Copy
Edit
npm run build
npm start
Test the API

Use Postman or similar tools to test endpoints.

❗ Error Handling Example
json
Copy
Edit
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
📹 Bonus (If applicable)
🔗 Live Demo: https://your-live-link.com

🎥 Demo Video: Watch on YouTube

📄 License
This project is licensed under the MIT License.