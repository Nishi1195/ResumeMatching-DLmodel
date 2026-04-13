import numpy as np
import tensorflow as tf
import joblib
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = tf.keras.models.load_model("models/new_model.h5", compile=False)
scaler = joblib.load("models/scaler.pkl")

embedding_model = SentenceTransformer("all-MiniLM-L6-v2", device="cpu")


def predict_match(resume, jd):

    resume_emb = embedding_model.encode([resume])
    jd_emb = embedding_model.encode([jd])

    cos_sim = cosine_similarity(resume_emb, jd_emb)

    features = np.concatenate([
        resume_emb,
        jd_emb,
        np.abs(resume_emb - jd_emb),
        resume_emb * jd_emb,
        cos_sim.reshape(-1,1)
    ], axis=1)

    features_scaled = scaler.transform(features)

    prob = model.predict(features_scaled)[0][0]

    verdict = "Accepted" if prob > 0.5 else "Rejected"

    return float(prob), verdict