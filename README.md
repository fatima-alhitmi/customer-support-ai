# Customer Support AI

**An AI-powered customer support chatbot built with a locally running large language model.**

Customer Support AI is a web application that generates responses to user inquiries using a locally hosted language model. The application connects a React frontend to a FastAPI backend, which communicates with Ollama to generate responses.

## Features

- AI-generated responses to customer inquiries
- Integration with a locally hosted large language model
- REST API for communication between the frontend and backend
- Interactive chat interface
- Local model inference through Ollama
- Modular frontend and backend architecture

## Technology Stack

- **Programming language:** Python, JavaScript
- **Frontend:** React, Vite, CSS
- **Backend:** FastAPI, Uvicorn
- **Language model runtime:** Ollama
- **Model:** Llama 3.2 3B
- **Version control:** Git and GitHub

## Architecture

The application follows a frontend-backend architecture:

1. The user submits a message through the React chat interface.
2. The frontend sends the message to the FastAPI backend.
3. The backend forwards the message to Ollama's local generation API.
4. The language model generates a response.
5. The backend returns the response to the frontend for display.

## Project Structure

```text
customer-support-ai/
├── backend/
│   └── main.py
├── frontend/
│   ├── src/
│   ├── package.json
│   └── index.html
├── .gitignore
└── README.md
```

## Requirements

- Python 3
- Node.js and npm
- Ollama
- Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd customer-support-ai
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the actual URL of your repository.

### 2. Install and start Ollama

Install Ollama from [ollama.com](https://ollama.com/).

Download the model used by the application:

```bash
ollama pull llama3.2:3b
```

Confirm that the model is available:

```bash
ollama list
```

Ollama must be running locally for the chatbot to generate responses.

### 3. Configure the backend

Create and activate a Python virtual environment from the project root:

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the backend dependencies:

```bash
python -m pip install fastapi "uvicorn[standard]" requests
```

Start the FastAPI server:

```bash
uvicorn backend.main:app --reload
```

The API will be available at:

`http://127.0.0.1:8000`

Interactive API documentation:

`http://127.0.0.1:8000/docs`

### 4. Configure the frontend

Open a separate terminal:

```bash
source ~/.nvm/nvm.sh
nvm use 24
cd customer-support-ai/frontend
npm install
npm run dev
```

Open the local URL printed by Vite, normally:

`http://localhost:5173`

Keep Ollama, the backend, and the frontend running while using the application.

## API

The backend exposes the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend status |
| POST | `/api/chat` | Submit a message and receive an AI-generated response |

The chat endpoint accepts a user message, sends it to the locally hosted model, and returns the generated reply.

## Privacy and Limitations

The application uses a locally hosted language model, allowing inference to run on the user's machine rather than requiring a hosted LLM API.

However, local inference alone does not guarantee complete privacy. Privacy also depends on the application's configuration, logging, and any external services it uses.

The chatbot is a demonstration project. Its responses may be inaccurate, incomplete, or unsuitable for complex customer support situations. Production use would require additional testing, error handling, safeguards, and evaluation.

## Future Improvements

- Add persistent conversation history
- Implement customer-specific memory
- Add conversation management and chat sessions
- Improve error handling and response latency
- Evaluate response quality across common support scenarios
- Add authentication and deployment support

## Author

**Fatma Al-Hitmi**

GitHub: [fatima-alhitmi](https://github.com/fatima-alhitmi)
