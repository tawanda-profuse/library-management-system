# Library Management System Server

## API Endpoints Summary

| Method | Endpoint          | Description    |
| ------ | ----------------- | -------------- |
| POST   | `/api/books`      | Create book    |
| GET    | `/api/books`      | Get all books  |
| GET    | `/api/books/{id}` | Get book by ID |
| PUT    | `/api/books/{id}` | Update book    |
| PUT    | `/api/books/{id}/availability`     | Update book availability status   |
| DELETE | `/api/books/{id}` | Delete book    |

## Usage

- To start the Spring Boot server, use this command: `cd backend && ./mvnw spring-boot:run`.
- To start the client side, use this command: `cd frontend && npm run dev`

## Helpful Tips

- To bootstrap a new Spring project, go to this URL: https://start.spring.io.
- To check the Java version installed use the command: `java -version` or `javac -version`.