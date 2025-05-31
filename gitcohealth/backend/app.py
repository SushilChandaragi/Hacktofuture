from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS  # <-- Add this import
import os
import json
import urllib.request

# --- OpenAI integration ---
from dotenv import load_dotenv
import openai


load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)  # <-- Add this line to enable CORS for all routes

TRANSLATIONS_DIR = os.path.join(os.path.dirname(__file__), 'translations')

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/api/translate')
def translate():
    lang = request.args.get('lang', 'en')
    file_path = os.path.join(TRANSLATIONS_DIR, f'{lang}.json')
    if not os.path.exists(file_path):
        return jsonify({'error': 'Language not found'}), 404
    with open(file_path, encoding='utf-8') as f:
        data = json.load(f)
    return jsonify(data)

# Remove hardcoded Gemini API key, load from env
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    symptoms = data.get('symptoms', '')
    prompt = (
        "You are an expert medical AI assistant. "
        "A user will describe their symptoms. "
        "Your tasks are:\n"
        "1. Identify the one or two most probable disease or condition based on the symptoms provided.\n"
        "2. List 5 clear, practical prevention or self-care tips relevant to the identified condition.\n"
        "3. If symptoms are severe or suggest an emergency, advise the user to seek immediate medical attention.\n\n"
        "Rules:\n"
        "- Do not explain or justify the diagnosis.\n"
        "- Do not include disclaimers.\n"
        "- Output only the following format:\n"
        "Disease: <disease or condition name>\n"
        "Prevention:\n"
        "- <tip 1>\n"
        "- <tip 2>\n"
        "- <tip 3 (if applicable)>\n"
        "Urgency: <'Seek immediate medical attention' if needed, otherwise 'Not urgent'>\n\n"
        f"User symptoms: {symptoms} also give a final note for tha patient,remember you are the connection between a doctor and a patient, so be very clear and concise in your response.\n"
    )

    try:
        payload = json.dumps({
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ]
        }).encode('utf-8')
        headers = {
            "Content-Type": "application/json"
        }
        req = urllib.request.Request(GEMINI_URL, data=payload, headers=headers, method="POST")
        with urllib.request.urlopen(req) as resp:
            resp_data = resp.read()
            gemini_data = json.loads(resp_data.decode('utf-8'))
        # Extract the response text from Gemini API
        result = gemini_data["candidates"][0]["content"]["parts"][0]["text"]
        return jsonify({'response': result})
    except Exception as e:
        return jsonify({'response': 'Error', 'error': str(e)})

# To test the OpenAI symptom analysis API in Thunder Client (or Postman):

# METHOD: POST
# URL:    http://localhost:5000/predict
# HEADERS:
#   Content-Type: application/json
# BODY (JSON):
#   {
#     "symptoms": "your symptom description here"
#   }

# Example:
#   {
#     "symptoms": "I have a fever and cough for two days"
#   }

# The response will be a JSON object with a "response" field containing the OpenAI result.

# 🔸 Hardcoded sample doctor locations in Belgaum
doctor_locations = [
    {"name": "Dr. A", "lat": 15.8497, "lon": 74.4977, "specialty": "General", "timing": "9 AM - 1 PM"},
    {"name": "Dr. B", "lat": 15.8582, "lon": 74.5169, "specialty": "Pediatrician", "timing": "10 AM - 2 PM"},
    {"name": "Dr. C", "lat": 15.8640, "lon": 74.5030, "specialty": "Cardiologist", "timing": "11 AM - 4 PM"},
    {"name": "Dr. D", "lat": 15.8587, "lon": 74.5076, "specialty": "Orthopedic", "timing": "2 PM - 6 PM"},
    {"name": "Dr. E", "lat": 15.8540, "lon": 74.4974, "specialty": "Dermatologist", "timing": "9 AM - 12 PM"},
    {"name": "Dr. F", "lat": 15.8499, "lon": 74.5062, "specialty": "ENT", "timing": "1 PM - 5 PM"},
    {"name": "Dr. G", "lat": 15.8572, "lon": 74.4920, "specialty": "Gastroenterologist", "timing": "10 AM - 3 PM"},
    {"name": "Dr. H", "lat": 15.8462, "lon": 74.4947, "specialty": "Pulmonologist", "timing": "9 AM - 11 AM"},
    {"name": "Dr. I", "lat": 15.8650, "lon": 74.5045, "specialty": "Neurologist", "timing": "3 PM - 6 PM"},
    {"name": "Dr. J", "lat": 15.8630, "lon": 74.5134, "specialty": "Oncologist", "timing": "11 AM - 2 PM"},
    {"name": "Dr. K", "lat": 15.8601, "lon": 74.5152, "specialty": "Urologist", "timing": "10 AM - 1 PM"},
    {"name": "Dr. L", "lat": 15.8614, "lon": 74.5001, "specialty": "Psychiatrist", "timing": "4 PM - 7 PM"},
    {"name": "Dr. M", "lat": 15.8527, "lon": 74.5023, "specialty": "Endocrinologist", "timing": "1 PM - 4 PM"},
    {"name": "Dr. N", "lat": 15.8559, "lon": 74.5096, "specialty": "Nephrologist", "timing": "9 AM - 12 PM"},
    {"name": "Dr. O", "lat": 15.8594, "lon": 74.5058, "specialty": "Rheumatologist", "timing": "2 PM - 5 PM"},
    {"name": "Dr. P", "lat": 15.8621, "lon": 74.4987, "specialty": "Hematologist", "timing": "8 AM - 11 AM"},
    {"name": "Dr. Q", "lat": 15.8560, "lon": 74.5010, "specialty": "Allergist", "timing": "3 PM - 6 PM"},
    {"name": "Dr. R", "lat": 15.8479, "lon": 74.5068, "specialty": "Immunologist", "timing": "12 PM - 4 PM"},
    {"name": "Dr. S", "lat": 15.8590, "lon": 74.5123, "specialty": "Dentist", "timing": "10 AM - 2 PM"},
    {"name": "Dr. T", "lat": 15.8533, "lon": 74.4940, "specialty": "Gynecologist", "timing": "9 AM - 1 PM"},
    {"name": "Dr. U", "lat": 15.8485, "lon": 74.5072, "specialty": "Surgeon", "timing": "2 PM - 6 PM"},
    {"name": "Dr. V", "lat": 15.8645, "lon": 74.5020, "specialty": "Psychologist", "timing": "1 PM - 5 PM"},
    {"name": "Dr. W", "lat": 15.8507, "lon": 74.5033, "specialty": "Radiologist", "timing": "11 AM - 3 PM"},
    {"name": "Dr. X", "lat": 15.8570, "lon": 74.5084, "specialty": "Pathologist", "timing": "8 AM - 12 PM"},
    {"name": "Dr. Y", "lat": 15.8551, "lon": 74.5007, "specialty": "Ophthalmologist", "timing": "10 AM - 1 PM"},
    {"name": "Dr. Z", "lat": 15.8512, "lon": 74.5045, "specialty": "Physiotherapist", "timing": "2 PM - 6 PM"},
    {"name": "Dr. AA", "lat": 15.8493, "lon": 74.4967, "specialty": "Geneticist", "timing": "9 AM - 12 PM"},
    {"name": "Dr. AB", "lat": 15.8568, "lon": 74.4999, "specialty": "Sleep Specialist", "timing": "3 PM - 7 PM"},
    {"name": "Dr. AC", "lat": 15.8625, "lon": 74.5066, "specialty": "Pain Management", "timing": "11 AM - 3 PM"},
    {"name": "Dr. AD", "lat": 15.8502, "lon": 74.5104, "specialty": "Occupational Therapist", "timing": "1 PM - 5 PM"},
    {"name": "Dr. AE", "lat": 15.8538, "lon": 74.5090, "specialty": "Speech Therapist", "timing": "10 AM - 1 PM"},
    {"name": "Dr. AF", "lat": 15.8575, "lon": 74.5005, "specialty": "Infectious Disease", "timing": "9 AM - 11 AM"},
    {"name": "Dr. AG", "lat": 15.8556, "lon": 74.5061, "specialty": "Public Health", "timing": "12 PM - 3 PM"},
    {"name": "Dr. AH", "lat": 15.8588, "lon": 74.4945, "specialty": "Palliative Care", "timing": "3 PM - 6 PM"},
    {"name": "Dr. AI", "lat": 15.8509, "lon": 74.5088, "specialty": "Homeopathy", "timing": "9 AM - 12 PM"}
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/doctors')
def doctors():
    return jsonify(doctor_locations)

@app.route('/kanishka.html')
def kanishka():
    return send_from_directory('../frontend', 'kanishka.html')

if __name__ == '__main__':
    app.run(debug=True)