# 🤖 AI Career Assistant

![AI Logo](https://img.icons8.com/?size=100&id=21888&format=png)

A smart, interactive web app powered by the ChatGPT API that guides users in building their AI careers — from learning paths to job insights.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://ai-career-assistant.vercel.app)

---

## 🌟 Overview

**AI Career Assistant** is a web-based chatbot interface — designed to help users explore AI-related career options, learning resources, and personalized advice using the **OpenAI GPT model**.

It works and feels exactly like ChatGPT, but focuses on **AI career guidance**.

---

## 🧩 Features

- 💬 Interactive Chat Interface (like ChatGPT)
- ⚡ Fast, lightweight frontend (HTML + CSS + JS)
- 🔒 Secure backend using **Vercel Serverless Functions**
- 🔑 Powered by **OpenAI GPT API**
- 🌍 Fully deployable on **Vercel** with one click
- 📱 Responsive design (mobile-friendly)

---

## 🧰 Tech Stack

| Area | Technology |
|------|-------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Vercel Serverless Functions (Node.js) |
| AI API | OpenAI (GPT-4 / GPT-3.5) |
| Hosting | Vercel |
| Version Control | Git + GitHub |

---

## ⚙️ Project Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/adineo-cmd/ai-career-assistant.git
cd ai-career-assistant
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add your OpenAI API key

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 4️⃣ Run locally

```bash
npm run dev
```

Open: <http://localhost:3000>

## 🚀 Deployment (Vercel)

1. Push your project to GitHub.
2. Go to <https://vercel.com> → “Add New Project” → Import this repo.
3. Add environment variable:
   - `OPENAI_API_KEY = your_openai_api_key_here`
4. Click Deploy 🎉

Your app will be live at:
<https://ai-career-assistant.vercel.app>

---

## 📁 Folder Structure

ai-career-assistant/

├─ public/  
│  ├─ index.html        # Frontend UI  
│  ├─ style.css         # Chat interface styling  
│  └─ script.js         # Chat logic + API call  

├─ api/  
│  └─ chat.js           # Serverless backend using OpenAI API  

├─ package.json  
├─ .env  
└─ README.md

---

## 🧠 Example Prompt

- “I want to become an AI Engineer — what roadmap should I follow?”
- “What are the top free AI courses for beginners?”
- “How can I prepare for an ML Engineer interview?”

## 🧑‍💻 Author

Aditya Yadav (adineo-cmd) — GitHub Profile

## 🪪 License

This project is licensed under the MIT License — free to use, modify, and distribute.

Built with ❤️ using HTML, JavaScript, and OpenAI API • Deployed on Vercel
