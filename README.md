# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.


# 🎓 CampusGPT

> **An AI-Powered Multi-Tenant College Assistant (Proof of Concept)**

CampusGPT is a **Proof of Concept (POC)** that demonstrates how **Artificial Intelligence** can improve the way colleges manage and access academic information. The platform enables students, faculty, and administrators to interact with college-specific documents using natural language through an AI-powered chat interface.

> **⚠️ Disclaimer**
>
> This project is currently a **prototype** and is under active development. It is **not a production-ready application**, but it showcases the architecture, workflows, and AI capabilities required for a scalable college assistant platform.

---

# 📌 Problem Statement

Educational institutions store important information across PDFs, notices, regulations, circulars, timetables, and academic documents. Finding the right information is often slow and inefficient.

Traditional search methods require users to manually browse documents, while general-purpose AI assistants may provide inaccurate responses because they do not have access to institution-specific knowledge.

---

# 💡 Solution

CampusGPT uses **Retrieval-Augmented Generation (RAG)** to create a secure AI knowledge base for each college.

Users can ask questions in natural language, and the system:

1. Retrieves relevant content from uploaded college documents.
2. Uses an LLM to generate contextual responses.
3. Returns answers based only on the documents belonging to the user's college.

This ensures accurate, relevant, and secure responses while maintaining complete data isolation between institutions.

---

# ✨ Features

* 🔐 JWT Authentication
* 👥 Role-Based Access Control (Admin, Faculty, Student)
* 🏫 Multi-Tenant College Architecture
* 🤖 AI Chat with College-Specific Knowledge
* 📄 PDF Upload & Processing
* 🔍 Retrieval-Augmented Generation (RAG)
* 📚 Intelligent Document Retrieval
* 💬 Chat History
* 📧 SMTP Email Integration

  * Account Verification
  * OTP Verification
  * Password Reset
* 🌙 Light/Dark Mode
* 📱 Responsive User Interface

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios

## Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication
* REST APIs
* Maven

## Database

* MySQL

## Artificial Intelligence

* LangChain4j
* Google Gemini API
* Retrieval-Augmented Generation (RAG)

## Document Processing

* Apache PDFBox

## Security

* Spring Security
* BCrypt Password Encryption
* JWT Token Authentication

## Email Service

* SMTP Email Integration

---

# 🏗️ System Workflow

1. User registers and verifies their account through email.
2. User logs in using secure JWT authentication.
3. Admin uploads institutional PDF documents.
4. Documents are processed and converted into searchable text.
5. The AI retrieves relevant document content using RAG.
6. Gemini generates an answer using only the retrieved context.
7. The response is returned to the user.

---

# 🎯 User Roles

### 👨‍💼 Admin

* Manage Colleges
* Manage Faculty
* Manage Students
* Upload Documents
* Monitor Platform

### 👨‍🏫 Faculty

* Access Department Documents
* Use AI Chat
* View Chat History

### 👨‍🎓 Student

* Ask Questions
* Access College Information
* View AI Chat History

---

# 🔒 Security Features

* JWT Authentication
* Role-Based Authorization
* Password Encryption (BCrypt)
* Secure Email Verification
* Password Reset via Email
* College-Level Data Isolation

---

# 🚀 Future Enhancements

* Voice-Based AI Assistant
* Mobile Application (Flutter)
* OCR Support for Scanned PDFs
* Multilingual AI Responses
* Analytics Dashboard
* Vector Database Integration
* Notification System
* Attendance & Academic Module
* LMS Integration
* Real-Time Chat



# 📂 Project Status

**Current Status:** 🚧 Active Development

CampusGPT is currently a **Proof of Concept (POC)** developed to validate the architecture and AI workflow. Additional modules, optimizations, and production-ready enhancements are planned.

---

# 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

If you'd like to improve this project:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a Pull Request.

---

# 👨‍💻 Author

**Dhinakaran**

AI & Data Science Graduate | Java Full Stack Developer | AI Enthusiast

---

# ⭐ Support

If you found this project interesting, consider giving it a ⭐ on GitHub. Your support helps motivate future development.
