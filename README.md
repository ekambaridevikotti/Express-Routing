# Express Routing Assignment

This project demonstrates Express.js routing, Express Router, and CRUD operations using a JSON file as a database.
The application manages Users and Todos with full Create, Read, Update, and Delete functionality.

## 📁 Project Structure
```
express-routing/
│
├── src/
│   ├── index.js
│   ├── db.json
│   └── routes/
│       ├── users.routes.js
│       └── todos.routes.js
│
├── package.json
└── .gitignore

```

## 🚀 Features

Express server running on port 3000

Uses Express Router for modular routing

### CRUD operations for:

Users

Todos

Data stored in db.json with real-time updates

Uses ES Modules (import/export)

Proper HTTP status codes and error handling


## ⚙️ Installation & Setup

Clone the repository:

```
git clone <your-repo-link>

```

Navigate to the project folder:

```
cd express-routing-assignment

```

Install dependencies:

```
npm install

```

Start the server:

```
node src/index.js

```

🖥️ Server Output

```
Server is running on http://localhost:3000

```


## 📌 API Endpoints
### 👤 Users Routes (/users)

```
Method	Endpoint	Description
POST	/users/add	Add a new user
GET	/users	Get all users
GET	/users/:userId	Get a single user
PUT	/users/update/:userId	Update a user
DELETE	/users/delete/:userId	Delete a user

```

### ✅ Todos Routes (/todos)

```
Method	Endpoint	Description
POST	/todos/add	Add a new todo
GET	/todos	Get all todos
GET	/todos/:todoId	Get a single todo
PUT	/todos/update/:todoId	Update a todo
DELETE	/todos/delete/:todoId	Delete a todo

```

## 🧪 Testing

All routes were tested using Postman

CRUD operations update db.json immediately

Data persists after server restarts

## 🛠️ Technologies Used

Node.js

Express.js

Express Router

File System (fs) module

ES Modules

