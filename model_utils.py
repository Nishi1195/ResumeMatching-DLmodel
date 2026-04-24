import numpy as np
import tensorflow as tf
import joblib
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# ── Keras 3.x compatibility fix ──────────────────────────────────────────────
# The .h5 model was saved with an older Keras that stored `quantization_config`
# inside Dense layer configs.  Keras 3.12 does not recognise that key and
# raises a TypeError when loading.  We subclass Dense to silently pop the
# unknown kwarg so the model loads cleanly.
class _CompatDense(tf.keras.layers.Dense):
    def __init__(self, *args, **kwargs):
        kwargs.pop("quantization_config", None)   # strip the unknown key
        super().__init__(*args, **kwargs)

model = tf.keras.models.load_model(
    "models/new_model.h5",
    compile=False,
    custom_objects={"Dense": _CompatDense},
)
# ─────────────────────────────────────────────────────────────────────────────

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