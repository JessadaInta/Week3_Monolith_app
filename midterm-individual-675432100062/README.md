# Library Management System - Layered Architecture

## 📋 Project Information
- **Student Name:** [เจษฎา อินตา]
- **Student ID:** [67543210006-2]
- **Course:** ENGSE207 Software Architecture

## 🏗️ Architecture Style
Layered Architecture (3-tier)

## 📂 Project Structure

midterm-individual-675432100062/
├── src/
│   ├── presentation/              # Layer 1: Presentation
│   │   ├── routes/
│   │   │   └── bookRoutes.js     # กำหนด routes
│   │   ├── controllers/
│   │   │   └── bookController.js  # Handle HTTP requests/responses
│   │   └── middlewares/
│   │       └── errorHandler.js    # Error handling middleware
│   │
│   ├── business/                  # Layer 2: Business Logic
│   │   ├── services/
│   │   │   └── bookService.js     # Business logic & rules
│   │   └── validators/
│   │       └── bookValidator.js   # Validation logic
│   │
│   └── data/                      # Layer 3: Data Access
│       ├── repositories/
│       │   └── bookRepository.js  # Database operations
│       └── database/
│           └── connection.js      # Database connection
│
├── server.js                      # Entry point
├── package.json
├── library.db                     # SQLite database
└── README.md                      # Documentation


## 🎯 Refactoring Summary

### ปัญหาของ Monolithic (เดิม):
- [ระบุปัญหา 3-5 ข้อ]

### วิธีแก้ไขด้วย Layered Architecture:
- [อธิบายวิธีแก้แต่ละปัญหา]

### ประโยชน์ที่ได้รับ:
- [ระบุประโยชน์ 3-5 ข้อ]

## 🚀 How to Run

\`\`\`bash
# 1. Clone repository
git clone [your-repo-url]

# 2. Install dependencies
npm install

# 3. Run server
npm start

# 4. Test API
# Open browser: http://localhost:3000
\`\`\`

## 📝 API Endpoints
[ระบุ API endpoints ทั้งหมด]