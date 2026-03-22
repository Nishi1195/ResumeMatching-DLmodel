# 📄 Resume Matcher — Deep Learning Model

> An AI-powered resume screening system that uses **Sentence Embeddings** and a **Deep Learning classifier** to predict how well a resume matches a given job description.

[![Python](https://img.shields.io/badge/Python-3.10-blue?logo=python)](https://www.python.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange?logo=tensorflow)](https://www.tensorflow.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.x-green?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Render](https://img.shields.io/badge/Deployed%20on-Render-purple?logo=render)](https://render.com/)

---

## 🧠 Project Overview

Resume Matcher is a **Deep Learning-based NLP application** that automates resume screening. Given a raw resume and a job description (JD), the model computes rich semantic features using **Sentence-BERT embeddings** and passes them through a trained **Keras neural network classifier** to predict a match probability and a binary verdict: `Accepted` or `Rejected`.

This project focuses entirely on the **AI/ML pipeline**, from feature engineering to model inference, served through a lightweight **FastAPI** backend.

---

## 🚀 Demo

Paste your resume text and a job description into the web UI, click **"Check Match"**, and instantly get:

- ✅ A **match probability score** (0.0 → 1.0)
- ✅ A binary **verdict**: `Accepted` or `Rejected`

---

## 🏗️ Deep Learning Pipeline

The core of this project is a multi-stage feature engineering + neural network pipeline:

```
┌───────────────────────────────────────────────────────────────────────┐
│                        INPUT                                          │
│          Resume Text                   Job Description Text           │
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
│                  FEATURE ENGINEERING                                 │
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
│                     STANDARD SCALER                                  │
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
│                         OUTPUT                                       │
│                                                                      │
│   match_probability : float  (e.g. 0.873)                            │
│   verdict           : str    ("Accepted" if prob > 0.5 else          │
│                               "Rejected")                            │
└──────────────────────────────────────────────────────────────────────┘
```

### Pipeline Steps Explained

| Step | Component | Detail |
|------|-----------|--------|
| **1. Embedding** | `sentence-transformers` — `all-MiniLM-L6-v2` | Converts raw text into dense 384-dimensional semantic vectors. Captures contextual meaning far beyond keyword matching. |
| **2. Feature Engineering** | `numpy` + `sklearn` | Derives 4 complementary feature signals: raw embeddings, absolute difference, element-wise product, and cosine similarity. Provides the model with rich, multi-perspective input. |
| **3. Scaling** | `StandardScaler` (scikit-learn) | Pre-fitted scaler (`scaler.pkl`) normalizes features to zero mean and unit variance for stable gradient flow. |
| **4. Classification** | TensorFlow/Keras DNN (`resume_match_model.h5`) | Feed-forward neural network with a sigmoid output for binary classification. Outputs a match probability. |
| **5. Verdict** | Threshold at 0.5 | Probability > 0.5 → **Accepted**, else → **Rejected**. |

---

## 🗂️ Project Structure

```
Resume-matcher/
│
├── app.py                  # FastAPI server — REST API + static file serving
├── model_utils.py          # Core ML pipeline: embedding → features → prediction
│
├── models/
│   ├── resume_match_model.h5   # Trained Keras deep learning model (~11 MB)
│   └── scaler.pkl              # Pre-fitted StandardScaler
│
├── static/
│   └── index.html          # Minimal frontend UI (HTML + JS)
│
├── requirements.txt        # Python dependencies
├── runtime.txt             # Python version for deployment
└── render.yaml             # Render.com deployment configuration
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Deep Learning** | TensorFlow / Keras |
| **NLP Embeddings** | `sentence-transformers` (`all-MiniLM-L6-v2`) |
| **Feature Engineering** | NumPy, Scikit-learn |
| **API Backend** | FastAPI + Uvicorn |
| **Frontend** | HTML + Vanilla JS |
| **Deployment** | Render.com |

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

The app will be available at `http://127.0.0.1:8000`

---

## 🌐 API Reference

### `POST /predict`

Predicts resume–job description match.

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
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ using TensorFlow, Sentence-BERT, and FastAPI</p>
