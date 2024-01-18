# FHIR & ML Exploration: Stroke Risk App

This repo contains the FHIR server, AI API, and web app for the stroke risk app.

## Documentation

[Documentation](./documentation)

## Quickstart

The project can be run using docker-compose. The docker-compose file will run the FHIR server, AI API, and SPA.

Run the following command to spin up the required containers:

```
docker-compose up
```

## File Structure
```
.
├── api/ - AI API for stroke score prediction
│   ├── src/ - source code for the api
│   └── Dockerfile.api - dockerfile to run the api
├── app/ - SPA for stroke risk app
│   ├── src/ - source code for the app
│   └── Dockerfile.app
├── hapi/ - FHIR server (HAPI FHIR)
│   └── Dockerfile.hapi - dockerfile to run the hapi server
├── model/ - resources training the AI model
│   ├── Project_AI_Model.ipynb - notebook for training the AI model
│   └── stroke_prediction_model_best_rf.joblib - trained AI model
|   └── stroke_prediction_model_best_rf.pkl - stroke dataset
├── data/ - sample patient data
├── documentation/ - project documentation
└── docker-compose - docker-compose file to run the app
```

## Project Breakdown
### API
The API is build with Flask and uses the scikit-learn library to make the strok score predictions. The API is run in a docker container and is accessible at http://localhost:5000.

The model was trained in google colab and is saved as a joblib file. The model is loaded into the API when the API is run. [Google Collab Link](https://colab.research.google.com/drive/1pNKFlEPgEzvQCM-l91bhIkVQJXNl3fVj?usp=sharing)

### App
The app is a single page application built with SolidJS. The app is run in a docker container and is accessible at http://localhost:3000.

### FHIR Server
The HAPI FHIR server is run in a docker container and is accessible at http://localhost:8080. The HAPI FHIR server uses hapiproject/hapi:latest as the base image

## AI Model
The API model was trained on the [Stroke Prediction Dataset](https://www.kaggle.com/fedesoriano/stroke-prediction-dataset) from Kaggle. The model was trained using a random forest classifier and achieved an accuracy of 0.94. The model is saved as a joblib file and is located in the resources folder. The model is loaded into the API when the API is run.
