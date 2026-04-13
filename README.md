# 📄 Resume Matcher — AI-Powered Resume Screening

> An AI-powered resume screening tool that uses **Sentence-BERT embeddings** and a **Deep Learning classifier** to predict how well a resume matches a given job description — served through a sleek, premium dark-mode web interface.

[![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python&logoColor=white)](https://www.python.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange?logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.x-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Sentence Transformers](https://img.shields.io/badge/Sentence--Transformers-all--MiniLM--L6--v2-blueviolet)](https://www.sbert.net/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🧠 Project Overview

**Resume Matcher** is a full-stack AI application that automates resume screening. Given a plain-text resume and a job description, the system:

1. Encodes both texts into semantic **384-dimensional Sentence-BERT vectors**
2. Engineers a rich **1537-dimensional feature vector** from those embeddings
3. Passes the features through a trained **Keras DNN classifier**
4. Returns a **match probability score** (0.0 → 1.0) and a binary verdict: `Accepted` or `Rejected`

The result is displayed in a fully animated, responsive dark-mode web interface with a real-time circular progress gauge.

---

## ✨ Features

- 🔮 **AI Match Scoring** — Semantic similarity beyond keyword matching, powered by Sentence-BERT
- 🎯 **Binary Verdict** — Clear `Accepted` / `Rejected` decision at a 0.5 probability threshold
- 📊 **Animated Score Gauge** — Circular SVG progress ring animates to your match score
- ✍️ **Live Character Counter** — Tracks input length for both resume and job description fields
- ⌨️ **Keyboard Shortcut** — `Ctrl + Enter` triggers analysis instantly
- ✅ **Inline Validation** — Animated error states if fields are left empty
- 📱 **Fully Responsive** — Adapts from desktop to mobile with a stacked layout
- 🌊 **Liquid Animated Background** — Fluid blob animations with `mix-blend-mode: screen`

---

## 🖥️ UI Preview

The web interface features:
- A deep **dark background** (`#05050A`) with animated purple/blue/cyan gradient blobs
- A **glassmorphism card** (`backdrop-filter: blur(24px)`) containing side-by-side text areas
- A **result card** that reveals with a `bounceIn` animation, color-coded green (Accepted) or red (Rejected)
- **Righteous** display font and **Urbanist** body font (Google Fonts)
- Lucide icons throughout the interface

---

## 🏗️ Deep Learning Pipeline

```
┌───────────────────────────────────────────────────────────────────────┐
│                              INPUT                                    │
│         Resume Text                    Job Description Text           │
└───────────────┬───────────────────────────────────┬───────────────────┘
                │                                   │
                ▼                                   ▼
┌──────────────────────────────────────────────────────────────────────┐
│                  SENTENCE-BERT EMBEDDING                             │
│           Model: all-MiniLM-L6-v2  (384-dim dense vectors)          │
│                                                                      │
│      resume_emb  [384]           jd_emb  [384]                       │
└───────────────┬───────────────────────────────────┬──────────────────┘
                │                                   │
                └─────────────┬─────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     FEATURE ENGINEERING                              │
│                                                                      │
│  1. resume_emb         → [384-dim]   Raw resume embedding            │
│  2. jd_emb             → [384-dim]   Raw JD embedding                │
│  3. |resume - jd|      → [384-dim]   Element-wise absolute diff      │
│  4. resume * jd        → [384-dim]   Element-wise product            │
│  5. cosine_similarity  → [1-dim]     Scalar similarity score         │
│                                                                      │
│  Concatenated Feature Vector: [384+384+384+384+1] = 1537-dim         │
└───────────────────────────────────┬──────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│                      STANDARD SCALER                                 │
│         Normalizes feature vector using pre-fitted scaler.pkl        │
│         Scaled Feature Vector: [1537-dim]                            │
└───────────────────────────────────┬──────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│                 DEEP LEARNING CLASSIFIER (Keras)                     │
│              Saved Model: models/resume_match_model.h5               │
│                                                                      │
│     Input Layer  → [1537]                                            │
│     Hidden Layers (Dense + BatchNorm + Dropout)                      │
│     Output Layer → Sigmoid Activation → match_probability [0,1]     │
└───────────────────────────────────┬──────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│                            OUTPUT                                    │
│                                                                      │
│   match_probability : float  (e.g. 0.873)                            │
│   verdict           : str    ("Accepted" if prob > 0.5 else          │
│                               "Rejected")                            │
└──────────────────────────────────────────────────────────────────────┘
```

### Pipeline Steps

| Step | Component | Detail |
|------|-----------|--------|
| **1. Embedding** | `sentence-transformers` — `all-MiniLM-L6-v2` | Converts raw text into dense 384-dim semantic vectors. Captures contextual meaning far beyond keyword matching. |
| **2. Feature Engineering** | `numpy` + `sklearn` | Derives 4 complementary feature signals: raw embeddings, absolute difference, element-wise product, and cosine similarity. |
| **3. Scaling** | `StandardScaler` (scikit-learn) | Pre-fitted `scaler.pkl` normalizes the 1537-dim vector to zero mean and unit variance for stable inference. |
| **4. Classification** | TensorFlow/Keras DNN (`resume_match_model.h5`) | Feed-forward neural network with a sigmoid output for binary classification. |
| **5. Verdict** | Threshold at 0.5 | Probability ≥ 0.5 → **Accepted**, else → **Rejected**. |

---

## 🗂️ Project Structure

```
Resume-matcher-model/
│
├── app.py                      # FastAPI server — REST API + static file serving
├── model_utils.py              # Core ML pipeline: embedding → features → prediction
│
├── models/
│   ├── resume_match_model.h5   # Trained Keras deep learning model
│   └── scaler.pkl              # Pre-fitted StandardScaler
│
├── static/
│   └── index.html              # Full-featured single-page frontend (HTML + CSS + JS)
│
├── applysmartmodel.ipynb       # Model training & evaluation notebook
├── requirements.txt            # Python dependencies
└── .gitignore
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Deep Learning** | TensorFlow / Keras |
| **NLP Embeddings** | `sentence-transformers` (`all-MiniLM-L6-v2`) |
| **Feature Engineering** | NumPy, Scikit-learn |
| **API Backend** | FastAPI + Uvicorn |
| **Frontend** | HTML5 + Vanilla CSS + Vanilla JS |
| **Icons** | Lucide Icons (CDN) |
| **Fonts** | Google Fonts — Righteous, Urbanist |

---

## 🔧 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Nishi1195/ResumeMatching-DLmodel.git
cd ResumeMatching-DLmodel
```

### 2. Create a virtual environment

```bash
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the server

```bash
uvicorn app:app --reload
```

The app will be available at **`http://127.0.0.1:8000`**

---

## 🌐 API Reference

### `GET /`

Serves the web UI (`static/index.html`).

---

### `POST /predict`

Runs the full ML pipeline and returns a match score.

**Request Body (JSON):**

```json
{
  "resume": "Experienced Python developer with 3 years in ML...",
  "job_description": "We are looking for a Machine Learning Engineer..."
}
```

**Response:**

```json
{
  "match_probability": 0.873,
  "verdict": "Accepted"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `match_probability` | `float` | Score between 0.0 and 1.0 |
| `verdict` | `string` | `"Accepted"` if prob ≥ 0.5, else `"Rejected"` |

---

## 📦 Dependencies

```
fastapi
uvicorn
tensorflow
sentence-transformers
scikit-learn
numpy
joblib
pydantic
pandas
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ using TensorFlow · Sentence-BERT · FastAPI · Vanilla JS</p>
