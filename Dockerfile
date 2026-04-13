# ── Base image ──────────────────────────────────────────────────────────────
# Use an official Python slim image to keep the container lightweight
FROM python:3.10-slim

# ── Metadata ─────────────────────────────────────────────────────────────────
LABEL maintainer="Nishi"
LABEL description="ApplySmart - AI-powered Resume Matcher (FastAPI + TensorFlow)"

# ── System dependencies ───────────────────────────────────────────────────────
# libgomp1 is required by LightGBM / scikit-learn native libs
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# ── Working directory ─────────────────────────────────────────────────────────
WORKDIR /app

# ── Install Python dependencies ───────────────────────────────────────────────
# Copy requirements first to leverage Docker layer caching
COPY requirements.txt .

# Upgrade pip, then install deps
# tensorflow-cpu keeps the image smaller; use 'tensorflow' if GPU is needed
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir \
        fastapi \
        "uvicorn[standard]" \
        tensorflow-cpu \
        sentence-transformers \
        scikit-learn \
        numpy \
        joblib \
        pydantic \
        pandas

# ── Copy application files ────────────────────────────────────────────────────
COPY app.py .
COPY model_utils.py .
COPY models/ ./models/
COPY static/ ./static/

# ── Hugging Face Spaces port ──────────────────────────────────────────────────
# HF Spaces expects the app to listen on port 7860
EXPOSE 7860

# ── Start the server ──────────────────────────────────────────────────────────
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
