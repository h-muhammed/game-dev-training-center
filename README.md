## 🚀 Game Training App – Setup Guide

This guide will walk you through setting up the **Backend** and **Frontend** of the Game Training App on your local machine.

---

## 🔧 Backend Setup

1. **Navigate to the backend directory**:

   ```bash
   cd game-training-fbackend
   ```

2. **Create a `.env` file** in the root of the backend project and add the following environment variables:

   ```env
   DB_LOCAL_URI=mongodb+srv://hmuhammed3386:mhd2001@cluster1.dceekqy.mongodb.net/game-training?retryWrites=true&w=majority
   PORT=8080
   JWT_SECRET=be793fd375f72d0a4591b57ef0ee5b6c90aa571eaffa0abe3de78c5bcfc2e6749b831bbb89c8fd889bc7110ca86182f7fa17d23d524a2f52a227c741e54d8866
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Start the backend server**:

   ```bash
   npm run dev
   ```

> The backend will run on **[http://localhost:8080](http://localhost:8080)**

---

## 🎨 Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd game-training-frontend
   ```

2. **Install frontend dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root of the frontend project and add:

   ```env
   REACT_APP_BACKEND_URL=http://localhost:8080/api
   ```

4. **Run the frontend**:

   ```bash
   npm start
   ```

> The frontend will be available at **[http://localhost:3000](http://localhost:3000)**

---

## 🔐 Admin Portal Access

To access the Admin Portal:

* Navigate to:
  **[http://localhost:3000/admin/login](http://localhost:3000/admin/login)**

* 🔒 This is a protected route – only authorized users can access the admin dashboard.

### ✅ Admin Credentials

* **Username**: `Muhammed Hussain`
* **Password**: `mhd123`

After logging in, you will be redirected to:
**[http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)**


