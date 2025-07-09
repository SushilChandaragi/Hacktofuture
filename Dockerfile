# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first for better caching
COPY gitcohealth/backend/requirements.txt ./gitcohealth/backend/

# Install Python dependencies
RUN pip install --no-cache-dir -r gitcohealth/backend/requirements.txt

# Copy the backend code
COPY gitcohealth/backend/ ./gitcohealth/backend/
COPY gitcohealth/frontend/ ./gitcohealth/frontend/

# Set working directory to backend
WORKDIR /app/gitcohealth/backend

# Expose port
EXPOSE 5000

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Run the application
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
