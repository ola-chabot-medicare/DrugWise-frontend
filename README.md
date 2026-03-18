# DrugWise Frontend

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

A Streamlit-based frontend application for the Medical Chatbot, providing an intuitive chat interface for users to interact with the AI-powered medical assistant.

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| ![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white) | Core programming language |
| ![Streamlit](https://img.shields.io/badge/-Streamlit-FF4B4B?style=flat-square&logo=streamlit&logoColor=white) | Web framework for building interactive data applications |
| ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Containerization for consistent deployment |

---

## 📁 Project Structure

```
frontend/
│
├── 📂 components/               # UI Components
│   └── chat.py                  # Chat interface component
│
├── 📂 state/                    # State Management
│   └── init.py                  # Session state initialization
│
├── 📂 utils/                    # Utility Functions
│   └── config.py                # Configuration and settings
│
├── 📄 app.py                    # Main Streamlit application entry point
├── 📄 Dockerfile                # Docker container configuration
├── 📄 README.md                 # Project documentation
└── 📄 requirements.txt          # Python dependencies
```

### 📂 Folder Descriptions

| Folder | Purpose |
|--------|---------|
| `components/` | Reusable UI components for the chat interface |
| `state/` | Streamlit session state management and initialization |
| `utils/` | Utility functions and configuration settings |

---

## ⚙️ Prerequisites

- Python 3.10 or higher
- pip (Python package manager)
- Docker (optional, for containerized deployment)
- Running backend service (see [Backend README](../backend/README.md))

---

## 🚀 Installation

### 💻 Local Development

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the application**:
   ```bash
   streamlit run app.py
   ```

   The application will be available at [http://localhost:8501](http://localhost:8501)

### 🐳 Docker Deployment

1. **Build the Docker image**:
   ```bash
   docker build -t medical-chatbot-frontend .
   ```

2. **Run the container**:
   ```bash
   docker run -p 8501:8501 medical-chatbot-frontend
   ```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 💬 **Interactive Chat UI** | Clean and intuitive chat interface for medical queries |
| 🔄 **Real-time Responses** | Seamless communication with the backend API |
| 📱 **Responsive Design** | Works across different screen sizes |
| 💾 **Session Management** | Maintains conversation history within session |
| 🎨 **Modern UI** | Streamlit-powered clean and modern interface |

---

## 🔐 Environment Variables

You can configure the application using environment variables or a `.env` file:

```env
# Backend API Configuration
BACKEND_URL=http://localhost:8000

# Streamlit Configuration
STREAMLIT_SERVER_PORT=8501
STREAMLIT_SERVER_ADDRESS=0.0.0.0
```

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `BACKEND_URL` | URL of the backend API service | ❌ No | `http://localhost:8000` |
| `STREAMLIT_SERVER_PORT` | Port for Streamlit server | ❌ No | `8501` |
| `STREAMLIT_SERVER_ADDRESS` | Host address for Streamlit | ❌ No | `localhost` |

---

## 🧪 Development

### Running the App in Development Mode

```bash
# Run with auto-reload enabled
streamlit run app.py --server.runOnSave true
```

### Code Formatting

```bash
# Install dev dependencies
pip install black isort flake8

# Format code
black .
isort .

# Lint code
flake8 .
```

---

## 🖥️ Usage

1. **Start the Backend**: Ensure the backend service is running (see [Backend README](../backend/README.md))

2. **Launch the Frontend**:
   ```bash
   streamlit run app.py
   ```

3. **Open the Application**: Navigate to [http://localhost:8501](http://localhost:8501) in your browser

4. **Start Chatting**: Type your medical questions in the chat input and receive AI-powered responses

---

## 🔗 Related

| Resource | Description |
|----------|-------------|
| 🔧 [Backend](../backend) | The FastAPI backend service for this chatbot |

---

## 📝 Notes

- This frontend requires the backend service to be running for full functionality
- Conversation history is maintained per session and will reset on page refresh
- For production deployment, ensure proper environment configuration

---

## 📄 License

This project is part of the MedicalChatbot application.

---

<p align="center">
  Made with ❤️ using Streamlit
</p>
