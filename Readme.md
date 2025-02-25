
# 📝 Resume Parser - AI-Powered Resume Analysis

![Tech Stack](https://img.shields.io/badge/Tech%20Stack-MERN-blueviolet) ![Status](https://img.shields.io/badge/Status-Complete-brightgreen) 

## 📌 **Assignment Requirements**
The Resume Parser application was built based on the following assignment specifications:

### **1️⃣ Backend Requirements**
- ✅ **Authentication API**: Authenticate users via **JWT**.
- ✅ **Resume Extraction API**:
  - Accept **PDF URL**, extract **resume text** using `pdf-parse`.
  - Use **Google Gemini AI** to structure data into JSON format.
  - Store parsed resume details in **MongoDB**.
- ✅ **Resume Search API**:
  - Allow searching resumes by **name** (case-insensitive, token-agnostic).
  - If no results found, return `404`.

### **2️⃣ Database**
- ✅ Use **MongoDB (Cloud - Free Tier)** to store resumes.

### **3️⃣ LLM Integration**
- ✅ Use **Google Gemini AI API** for resume data structuring.

### **4️⃣ Deployment**
- ✅ Deploy backend using **Vercel / Render / Railway (Free Tier)**.

### **5️⃣ API Testing**
- ✅ APIs should be **tested using Postman**.

---

## 🎯 **Extra Features Implemented**
In addition to the assignment, we implemented **extra features** for security, performance, and usability.

### **✅ Security Enhancements**
- **⛔ Rate Limiting (Express-Rate-Limit)** - Prevent API abuse.
- **🛡️ Input Validation (Joi)** - Prevent invalid data submission.
- **🛠️ NoSQL Injection Prevention** - Secure MongoDB queries.

### **✅ Performance Optimizations**
- **⚡ Redis Caching** - Speeds up **resume searches** and **parsed resumes**.

### **✅ API Documentation**
- **📜 Swagger API Documentation** available at `/api-docs`.

---

## ⚙️ **Tech Stack**
### **Frontend**
- **React (Vite)**
- **Tailwind CSS**
- **React Router**
- **Axios**
  
### **Backend**
- **Node.js + Express.js**
- **MongoDB (Mongoose)**
- **Google Gemini AI API**
- **JWT Authentication**
- **Redis Caching**
- **Swagger for API Docs**
- **Winston + Morgan for Logging**
- **Joi for Input Validation**

### **Deployment**
- **Backend:**  [`https://resume-parser-0tn4.onrender.com`](https://resume-parser-0tn4.onrender.com)
- **Frontend:** [`https://resume-parser-tanmay.netlify.app`](https://resume-parser-tanmay.netlify.app)
- **Swagger Api Documentation:** [`http://localhost:5000/api-docs`](http://localhost:5000/api-docs)


---

## 📌 **Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/ChefnCoder/resume-parser.git
cd resume-parser
```

### **2️⃣ Install Dependencies**
#### **Backend**
```sh
cd backend
npm install
```
#### **Frontend**
```sh
cd frontend
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file inside the **backend** folder:
```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

---

## 🚀 **Run the Application**
### **1️⃣ Start Backend**
```sh
cd backend
node server.js
```

### **2️⃣ Start Redis Server (Ensure Redis is Running)**
```sh
sudo service redis-server start  
```

### **3️⃣ Start Frontend**
```sh
cd frontend
npm run dev
```

---

## 📂 **Project Structure**
```
resume-parser/
│── backend/
│   ├── controllers/    # API logic (Auth, Resume Parsing, Search)
│   ├── middleware/     # Auth, Rate-Limiting, Validation
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Routes
│   ├── utils/          # Encryption, Caching, Logging
│   ├── server.js       # Express Server
│   └── .env            # Environment Variables
│
│── frontend/
│   ├── src/
│   │   ├── components/  # UI Components
│   │   ├── pages/       # Login, Upload, Search Pages
│   │   ├── App.jsx      # Main React Component
│   │   ├── main.jsx     # Entry Point
│   └── .env             # Frontend Environment Variables
│
└── README.md
```

---

## ✅ **API Documentation (Swagger)**
Once the backend is running, open:
📄 [`http://localhost:5000/api-docs`](http://localhost:5000/api-docs)

---

## 📸 **Screenshots**
| **Login Page** | **Resume Upload** | **Resume Search** |
|---------------|-----------------|----------------|
| ![Login](https://via.placeholder.com/300) | ![Upload](https://via.placeholder.com/300) | ![Search](https://via.placeholder.com/300) |

---

## 🛠️ **Testing the API**
Use **Postman** or **Swagger UI** (`/api-docs`) to test:
### **1️⃣ Login API**
```http
POST /api/auth/login
Content-Type: application/json
{
  "username": "naval.ravikant",
  "password": "05111974"
}
```
✅ **Response**
```json
{ "JWT": "your-jwt-token" }
```

### **2️⃣ Upload Resume**
```http
POST /api/resume/extract
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
{
  "url": "https://www.dhli.in/uploaded_files/resumes/resume_3404.pdf"
}
```

### **3️⃣ Search Resume**
```http
POST /api/resume/search
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
{
  "name": "Raj"
}
```
✅ **Response**
```json
[
  {
    "name": "Raj Kumar",
    "email": "raj@example.com",
    "education": { ... },
    "experience": { ... },
    "skills": [ "JavaScript", "MongoDB" ]
  }
]
```

---

## ✨ **Contributors**
👨‍💻 **Tanmay Anand** - Full-Stack Developer  
📧 Contact: [tanmay2020anand@gmail.com](mailto:tanmay2020anand@gmail.com)

