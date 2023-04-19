# Technical Manual

## 1.0 Deployment

The application is deployed as three separate apps. The API and SPA are deployed to Heroku, while the HAPI FHIR server is deployed to Digital Ocean.

| Application      | URL                                            |
| ---------------- | ---------------------------------------------- |
| Single Page App  | https://stroke-score-app.herokuapp.com/        |
| ML API           | https://stroke-score-api.herokuapp.com/        |
| HAPI FHIR Server | https://lionfish-app-fjtuh.ondigitalocean.app/ |

The deployed application has been seeded with patient data. The patient data can be found in the `data` folder. The patient data was loaded into the HAPI FHIR server using the HAPI FHIR interface.

## 2.0 Development

### 2.1 Startup Configuration

The application can be run locally using Docker Compose. The docker-compose file will run the FHIR server, ML API, and SPA. It is recommended to use the hosted application for testing, but the application can be run locally if desired.

See the [Startup Configuration](./startup-configuration.md) for more information on running the application locally.

## 3.0 Application Design

### 3.1 Architecture

The high-level architecture of the application can be found in the [Architecture Diagram](./architecture-diagram.md) section of the documentation.

### 3.2 Single Page Web App (SPA)

The Single Page Web App is a Solid JS application that uses the [Solid JS](https://www.solidjs.com/) framework. The application is a single page application that uses the [Solid Router](https://github.com/solidjs/solid-router) library to handle routing. The application uses the [Tailwind CSS](https://tailwindcss.com/) framework for styling.

The Single Page Web App is deployed to Heroku. The application is deployed using the [Node.js buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs). The application is deployed using the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). The application can be deployed to any hosting providers that supports web applications.

The SPA src code can be found in the `app` folder.

### 3.3 Machine Learning API

The Machine Learning API is a Flask application that uses the [Flask](https://flask.palletsprojects.com/en/2.0.x/) framework. The application is deployed to Heroku. The application is deployed using the [Python buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-python). The application is deployed using the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). The application can be deployed to any hosting providers that supports python applications.

The model is trained using the [scikit-learn](https://scikit-learn.org/stable/) library. The model is trained using the [Stroke Prediction Dataset](https://www.kaggle.com/fedesoriano/stroke-prediction-dataset) from Kaggle. The model is trained in a Jupyter Notebook using the [Google Colab](https://colab.research.google.com/) platform. The model is trained using the [Random Forest Classifier](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html) and uses the [GridSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html) library to find the best hyperparameters for the model. The model is saved as a joblib file and is loaded into the API at runtime. The model is loaded using the [joblib](https://joblib.readthedocs.io/en/latest/) library. The joblib file can be found in the `model` folder [here](../model/stroke_prediction_model_best_rf.joblib).

The API src code can be found in the `api` folder.

The google colab notebook can be found [here](https://colab.research.google.com/drive/1pNKFlEPgEzvQCM-l91bhIkVQJXNl3fVj?usp=sharing). The notebook can also be found in the `model` folder [here](../model/Project_AI_Model.ipynb). You will need to upload the `healthcare-dataset-stroke-data.csv` file to the notebook to run the notebook in colab.


### 3.4 HAPI FHIR Server

The HAPI FHIR server is a Java application that uses the [HAPI FHIR](https://hapifhir.io/) library. The application used the [hapiproject/hapi](https://hub.docker.com/r/hapiproject/hapi) docker image to run the HAPI FHIR server. The HAPI FHIR server utilizes a [H2](https://www.h2database.com/html/main.html) database to persist patient data. The application is deployed to Digital Ocean. The application is deployed using the [Docker](https://www.docker.com/) container platform. The application can be deployed to any hosting providers that supports docker containers.

The HAPI FHIR server src code can be found in the `hapi` folder. There is no code for the HAPI FHIR server, as the docker image is used to run the server.

You can use the HAPI FHIR interface to load data into the HAPI FHIR server. The HAPI FHIR interface can be used to create, read, update, and delete patient data.

## 4.0 Data

The data used in the application is from the [Stroke Prediction Dataset](https://www.kaggle.com/fedesoriano/stroke-prediction-dataset) from Kaggle. The data is stored in the `data` folder. The data is loaded into the HAPI FHIR server using the HAPI FHIR interface.

## 5.0 Testing

The application has been tested manually and by using the [Postman](https://www.postman.com/) application.

## 6.0 Repository Structure

The repository is structured as follows:

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
