from flask import Flask, request, jsonify, send_from_directory
from model_utils import predict_match

app = Flask(__name__, static_folder="static")

# Serve frontend
@app.route("/")
def home():
    return send_from_directory("static", "index.html")

# Prediction API
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    resume = data.get("resume", "")
    job_description = data.get("job_description", "")

    prob, verdict = predict_match(resume, job_description)

    return jsonify({
        "match_probability": float(prob),
        "verdict": verdict
    })

# Run (for Hugging Face)
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7860)