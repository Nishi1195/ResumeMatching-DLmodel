FROM python:3.11-slim

WORKDIR /app

# System dependency (needed for sklearn / numpy)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (for caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Pre-download SBERT model (VERY IMPORTANT)
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

# Hugging Face port
EXPOSE 7860

# Run Flask app
CMD ["python", "app.py"]