# DrugWise Frontend

DrugWise is a smart, interactive medical chatbot interface. It connects to a powerful AI backend to instantly answer complex medical questions based on real FDA drug data. 

The goal of this application is to make finding drug information as easy, safe, and beautiful as possible.

## ✨ Features

- 💬 **AI Medical Chat**: Ask any medication questions. The chat reads the AI's complex data and formats it perfectly with bold text, bullet points, and warning highlights.
- ⏰ **Daily Reminders**: Add, edit, and color-code your daily medication schedule. It automatically converts your times into a simple AM/PM format.
- 📋 **Medication Tracker**: Keep a running list of your active prescriptions with glowing status dots.
- 💾 **Smart History**: Everything you type or save is instantly remembered in your browser. You can close the tab, come back tomorrow, and all your chats and reminders will still be there!
- 🎨 **Glassmorphism UI**: Built with a sleek, modern, translucent design that reacts beautifully to your mouse movements.

## 🛠 Tech Stack

- **React 19** (Started with Vite for lightning-fast speeds)
- **Tailwind CSS v4** (For the beautiful gradients and animations)
- **Axios** (To safely connect to the Python AI backend)
- **Lucide React** (For all the clean UI icons)

## 🚀 How to run locally

Want to try it yourself? Here's how to get it running on your computer:

1. **Clone the code** down to your computer:
   ```bash
   git clone https://github.com/ola-chabot-medicare/DrugWise-frontend.git
   cd DrugWise-frontend
   ```

2. **Install the packages**:
   ```bash
   npm install
   ```

3. **Start the app**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:5173`

---

## 🔌 Connecting to the Backend

**To actually use the chatbot feature, you must also run the separate DrugWise Backend server.** 

1. **Clone the backend repository** (in a separate folder):
   ```bash
   git clone https://github.com/ola-chabot-medicare/DrugWise-backend.git
   cd DrugWise-backend
   ```
2. **Setup your environment variables**:
   Create a `.env` file in the root of the backend folder and provide your own OpenAI key (this ensures your personal budget is never used by random viewers):
   ```env
   OPENAI_API_KEY=your_openai_key_here
   ```
   *(Check the `.env.example` file in the backend repository if you need to set up other variables like ChromaDB)*.
3. **Run the backend server**:
   ```bash
   uvicorn main:app --reload
   ```