from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
from model_utils import predict_match

app = FastAPI()

class InputData(BaseModel):
    resume: str
    job_description: str


@app.get("/")
def home():
    return FileResponse("static/index.html")


@app.post("/predict")
def predict(data: InputData):

    prob, verdict = predict_match(
        data.resume,
        data.job_description
    )

    return {
        "match_probability": float(prob),
        "verdict": verdict
    }