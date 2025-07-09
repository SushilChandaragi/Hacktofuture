#!/bin/bash

# Start script for Render deployment
echo "Starting ArogyaDeep application..."

# Navigate to backend directory
cd gitcohealth/backend

# Start the Flask application with Gunicorn
gunicorn --bind 0.0.0.0:$PORT app:app
