# Library Management System – Spring Boot Backend

A RESTful backend API built with Java and Spring Boot that performs full CRUD operations on a PostgreSQL database for managing books in a library.

This project exposes API endpoints that can be consumed by any frontend application (React, Angular, Vue, mobile apps, etc.).

## 🚀 Tech Stack

- Java 17+
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven
- VS Code
- Postman/Thunder Client (for API testing)

## 📁 Project Structure

```bash
frontend/...
backend/
│
├── src/
│   ├── main/
│   │   ├── java/com/library/
│   │   │   ├── LibraryBackendApplication.java
│   │   │   │
│   │   │   ├── controller/
│   │   │   │   └── BookController.java
│   │   │   │
│   │   │   ├── model/
│   │   │   │   └── Book.java
│   │   │   │
│   │   │   ├── repository/
│   │   │   │   └── BookRepository.java
│   │   │
│   │   └── resources/
│   │       └── application.properties
│   │
│   └── test/
│
├── pom.xml
└── README.md
```

## 🗂️ Database Schema

| Column       | Type           | Description         |
| ------------ | -------------- | ------------------- |
| id           | BIGSERIAL (PK) | Auto-generated ID   |
| title        | VARCHAR        | Book title          |
| author       | VARCHAR        | Book author         |
| year         | INT            | Year published      |
| category     | VARCHAR        | Book category       |
| page_count   | INT            | Number of pages     |
| is_available | BOOLEAN        | Availability status |

## 🔌 API Endpoints

### 📘 Get All Books

```bash
GET /books
```

### 📗 Get Book By ID

```bash
GET /books/{id}
```

### ➕ Create Book

```bash
POST /books
```

Example Request Body:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008,
  "category": "Programming",
  "pageCount": 464,
  "isAvailable": true
}
```

### ✏ Update Book

```bash
PUT /books/{id}
```

### 🔄 Toggle Availability

Automatically flips the isAvailable value.

```bash
PUT /books/{id}/availability
```

If `true` → becomes `false`
If `false` → becomes `true`

### ❌ Delete Book

```bash
DELETE /books/{id}
```

## Run the Application

From the backend folder:

```bash
mvn spring-boot:run
```

Server starts at:

```
http://localhost:8080
```

## 🧠 Features

- ✔ Full CRUD functionality
- ✔ PostgreSQL database integration
- ✔ JPA entity mapping
- ✔ Toggle book availability endpoint
- ✔ Environment variable support
- ✔ RESTful architecture

## 👨‍💻 Author

Tawanda Msengezi

## 📜 License

This project is open source and available under the MIT License.  
