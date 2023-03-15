from flask import Flask, request, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)


basedir = os.path.abspath(os.path.dirname(__file__))
model_file = os.path.join(basedir, 'static/stroke_prediction_model_best_rf.joblib')

model = joblib.load(model_file)

def prob_to_risk_two(probability):
    max_probability = 0.7764451659451659 # computed when training the model
    risk = probability * 100 / max_probability
    return risk

@app.route('/')
def index():
    return 'Hello, World!'

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    label_encode_dict = {
        'gender': {'Male': 0, 'Female': 1, 'Other': 2},
        'ever_married': {'No': 0, 'Yes': 1},
        'work_type': {'children': 0, 'Govt_job': 1, 'Never_worked': 2, 'Private': 3, 'Self-employed': 4},
        'Residence_type': {'Rural': 0, 'Urban': 1},
        'smoking_status': {'Unknown': 0, 'never smoked': 1, 'formerly smoked': 2, 'smokes': 3}
    }

    # map the inputs
    for feature in label_encode_dict:
        if data[feature] in label_encode_dict[feature]:
            data[feature] = label_encode_dict[feature][data[feature]]
        else:
            data[feature] = np.nan
    
    input_values = np.array([data['gender'], data['age'], data['hypertension'], data['heart_disease'],
                        data['ever_married'], data['work_type'], data['Residence_type'],
                        data['avg_glucose_level'], data['bmi'], data['smoking_status']])
    
    prediction = model.predict_proba([input_values])[0][1]

    return jsonify({'stroke_prediction': prediction})