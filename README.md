# 📨 Chat App (MERN Stack)

Welcome to the **Chat App**, a real-time messaging application built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with **Socket.IO** for real-time communication. This app features user authentication, profile updates, and live messaging, making it a great choice for chatting with friends and colleagues.

---

## 🚀 Features
- 🔒 **Authentication**: User login and signup with secure JWT tokens.
- 📝 **Real-time Messaging**: Instant messaging powered by Socket.IO.
- 🌐 **Responsive Design**: Fully responsive user interface.
- 🛠️ **Profile Updates**: Update user profiles with ease.
- 👥 **Online Users**: See who's online in real time.

---

## 🛠️ Technologies Used
- **Frontend**: React, Zustand for state management, React Hot Toast for notifications.
- **Backend**: Node.js, Express.js, JWT for authentication, Socket.IO for real-time updates.
- **Database**: MongoDB with Mongoose.

---

## 🖥️ Local Development Setup

Follow these steps to run this project locally on your machine.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Sayan-Rajak-Das/CHAT-APP-using-MERN.git
cd CHAT-APP-using-MERN
```

### 2️⃣ Install Dependencies
#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd ../frontend
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the `backend` directory with the following configuration:

#### Backend `.env` File:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<db_name>?retryWrites=true&w=majority
PORT=5001
JWT_SECRET=mysecretkey
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=<cloudinary_cloud_name>
CLOUDINARY_API_KEY=<cloudinary_api_key>
CLOUDINARY_SECRET_KEY=<cloudinary_secret_key>
```

### 4️⃣ Start the Development Servers
#### Backend:
```bash
cd backend
npm start
```

#### Frontend:
```bash
cd ../frontend
npm start
```

The application will now be running at `http://localhost:3000` (frontend) and `http://localhost:5001` (backend).

---

## 🛡️ Security Features
- **JWT Authentication**: Secure user sessions with HTTP-only cookies.
- **CSRF Protection**: Enforce `sameSite: "strict"` cookies.
- **XSS Prevention**: Use `httpOnly` cookies for secure token storage.

---

Good luck and happy coding! 🌟
