# Stoke Prediction - CS-6440 Project - etaheri6

This repo contains the FHIR server, AI API, and web app for the stroke risk app.

[Submission Documentation](./documentation)

## Quickstart

The project can be run using docker-compose. The docker-compose file will run the FHIR server, AI API, and SPA.

Run the following command to spin up the required containers:

```
docker-compose up
```

## Deployed Environments

A deployed app is available for testing:

SPA: https://stroke-score-app.herokuapp.com/

API: https://stroke-score-api.herokuapp.com/

HAPI FHIR Server: https://lionfish-app-fjtuh.ondigitalocean.app/

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
├── resources/ - resources for the app
│   ├── Project_AI_Model.ipynb - notebook for training the AI model
│   └── stroke_prediction_model_best_rf.joblib - trained AI model
├── data/ - sample patient data
├── documentation/ - project documentation
└── docker-compose - docker-compose file to run the app
```

## Project Breakdown
### API
The API is build with Flask and uses the scikit-learn library to make the strok score predictions. The API is run in a docker container and is accessible at http://localhost:5000.

### App
The app is a single page application built with SolidJS. The app is run in a docker container and is accessible at http://localhost:3000.

### FHIR Server
The HAPI FHIR server is run in a docker container and is accessible at http://localhost:8080. The HAPI FHIR server uses hapiproject/hapi:latest as the base image

## AI Model
The API model was trained on the [Stroke Prediction Dataset](https://www.kaggle.com/fedesoriano/stroke-prediction-dataset) from Kaggle. The model was trained using a random forest classifier and achieved an accuracy of 0.94. The model is saved as a joblib file and is located in the resources folder. The model is loaded into the API when the API is run.
