# Technical User Manual

## 1.0 Deployment

The application is deployed as three separate apps. The API and SPA are deployed to Heroku, while the HAPI FHIR server is deployed to Digital Ocean.

| Application      | URL                                            |
| ---------------- | ---------------------------------------------- |
| Single Page App  | https://stroke-score-app.herokuapp.com/        |
| ML API           | https://stroke-score-api.herokuapp.com/        |
| HAPI FHIR Server | https://lionfish-app-fjtuh.ondigitalocean.app/ |

The deployed application has been seeded with patient data. The patient data can be found in the `data` folder. The patient data was loaded into the HAPI FHIR server using the HAPI FHIR interface.

## 2.0 Local Development

The application can be run locally using Docker Compose. The docker-compose file will run the FHIR server, AI API, and SPA. It is recommended to use the hosted application for testing, but the application can be run locally if desired.

See the [Startup Configuration](./startup-configuration.md) for more information on running the application locally.

## 3.0 Application Usage

- Navigate to the SPA at https://stroke-score-app.herokuapp.com
- Click on a patient to view their details
- Click the "Stoke Risk" logo on the top left to return to the patient list
- Note: each patient has different data, so the stroke risk score will be different for each patient.
