
# 🛒 Shopping List API — CodeTribe Task


<img src="https://socialify.git.ci/Samukelokhathi/CodeTribe-Shopping-List-API/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="CodeTribe-Shopping-List-API" width="640" height="320" />

A lightweight, production-oriented Shopping List REST API built with native Node.js HTTP modules and TypeScript. This project was created to practice backend development, RESTful API design, CRUD operations, request validation, and structured JSON responses without relying on frameworks such as Express.

## 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/Samukelokhathi/CodeTribe-Shopping-List-API.git
```

Navigate into the project

```bash
cd CodeTribe-Shopping-List-API
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Build the project

```bash
npm run build
```

The API will be available at:

```text
http://localhost:3000
```

## ✨ Features

* ➕ Add new shopping list items
* 📋 Retrieve all shopping list items
* 🔍 Retrieve a single item by ID
* ✏️ Update an existing shopping list item
* 🗑️ Delete a shopping list item
* 🛡️ Validate incoming request data
* 📦 Return consistent JSON response envelopes
* 🔄 Support RESTful HTTP methods
* 🧩 Organize backend logic into routes, controllers, and models
* 📱 Lightweight and easy-to-maintain API structure

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/items` | Add a new shopping list item |
| `GET` | `/items` | Retrieve all shopping list items |
| `GET` | `/items/:id` | Retrieve a single item by ID |
| `PUT` | `/items/:id` | Update an existing shopping list item |
| `DELETE` | `/items/:id` | Delete a shopping list item |

## 🛠️ Technologies Used

* Node.js
* TypeScript
* Native Node.js HTTP modules
* `tsx`
* `nodemon`

## 📚 What I Learned

During this project I practiced:

* Building a REST API without Express
* Creating and handling HTTP requests and responses
* Working with TypeScript interfaces and strict typing
* Organizing backend code into routes, controllers, and models
* Implementing CRUD operations
* Validating request bodies and URL parameters
* Handling HTTP status codes and JSON responses
* Structuring a backend project for readability and maintainability
* Using `tsx` and `nodemon` for development
* Testing API endpoints using tools such as Postman

## 📁 Project Structure

```text
CodeTribe-Shopping-List-API/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## 🔗 Documents Links

* 🔗 **GitHub Repository:** https://github.com/Samukelokhathi/CodeTribe-Shopping-List-API
