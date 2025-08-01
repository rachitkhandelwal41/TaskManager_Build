Certainly! Here's your original content beautifully formatted with consistent markdown, indentation, spacing, and proper code block syntax — **nothing added, nothing removed**, just made elegant:

---

```markdown
# 🗂️ Task Management Web Application

A full-stack task management web app built using the MERN stack with secure JWT authentication. Users can sign up, sign in, create multiple task lists, and manage tasks within those lists. Tasks can be marked as complete, edited, or deleted. The app supports dynamic routing, efficient state management, and is deployed securely using AWS infrastructure.

---

## 🚀 Tech Stack

- **Frontend**: React (Vite + TypeScript), Recoil, Tailwind CSS  
- **Backend**: Node.js, Express.js, MongoDB  
- **Authentication**: JWT (JSON Web Tokens)

---

## 🔐 Features

- User registration and login using JWT-based authentication  
- Create, update, delete multiple **Task Lists**  
- Add, mark complete, edit, and delete **Tasks** in each list  
- Dynamic routing for lists and tasks  
- Recoil for clean and efficient frontend state management  
- Fully responsive UI with Tailwind CSS  
- Production-ready with HTTPS and CDN for global performance

---

## 🛠️ Local Development Setup

### ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) installed (v16 or higher)  
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) URI or a local MongoDB instance

---

### 📁 Project Structure

```

/frontend   → React + Vite client
/backend    → Express + MongoDB server

````

---

### 🔧 Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file using the template:

   ```bash
   cp .example.env .env
   ```

4. Paste your MongoDB URI and JWT secret in `.env`:

   ```env
   MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
   ```

5. Build the TypeScript backend:

   ```bash
   npx tsc
   ```

6. Start the server:

   ```bash
   node dist/index.js
   ```

---

### 💻 Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and configure your backend URL:

   ```env
   VITE_BASE_URL=http://localhost:3000/api/v1
   ```

4. Run the frontend in development mode:

   ```bash
   npm run dev
   ```

---

## 📄 .example.env

Create this file inside the `/backend` folder:

```env
MONGO_URL=mongodb+srv://your-user:your-password@cluster.mongodb.net/dbname
```

Create this file inside the `/frontend` folder:

```env
VITE_BASE_URL=http://localhost:3000/api/v1
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request for any improvements or new features.

---

**Rachit Khandelwal**

```

