# ArogyaDeep(GIT's HackToFuture Hackathon project)

A multilingual AI-powered health assistant web application.  
It analyzes user symptoms using Gemini/OpenAI, provides probable conditions, prevention tips, and nearby doctor info for Belgaum.  
Frontend: HTML/CSS/JS. Backend: Flask (Python).  
Supports language translation and secure API key management.

---

## Features

- Symptom analysis using Gemini/OpenAI API
- Multilingual UI (translation support)
- List of nearby doctors (Belgaum, hardcoded)
- Secure API key management via `.env`
- Simple frontend (HTML/JS/CSS), backend (Flask)
- CORS enabled for frontend-backend communication

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/SushilChandaragi/Hacktofuture.git
cd HacktofutureGITHUB/gitcohealth
```

### 2. Backend Setup

```sh
cd backend
python -m venv venv
venv\Scripts\activate   # On Windows
# Or: source venv/bin/activate   # On Linux/Mac

pip install -r requirements.txt
```

#### Create a `.env` file in the `backend` folder:

```
OPENAI_API_KEY=your-openai-api-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```

> **Never share your `.env` file or API keys publicly.**

### 3. Run the Backend Server

```sh
python app.py
```

- The backend runs at: [http://localhost:5000](http://localhost:5000)

### 4. Access the Frontend

Open your browser and go to:  
[http://localhost:5000](http://localhost:5000)

---

## Project Structure

```
gitcohealth/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── .env
│   └── ... (other backend files)
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── ... (other frontend files)
```

---

## Usage

- Select your language from the dropdown.
- Enter your symptoms and click "Analyze Symptoms".
- The AI will respond with probable conditions, prevention tips, and urgency.
- View a list of nearby doctors (hardcoded for Belgaum).

---

## Notes

- Requires valid OpenAI and Gemini API keys.
- `.env` is in `.gitignore` and should not be committed.
- Doctor locations are sample data for demo purposes.

---

## License

This project is for educational/demo purposes.
