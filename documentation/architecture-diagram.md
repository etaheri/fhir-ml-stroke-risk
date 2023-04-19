# Architecture Diagram

For details on the technologies used in this application, see the [Technical Manual](./technical-manual.md).

The application is made up of three components:

1. HAPI FHIR server
2. Machine Learning API
3. Single Page Web App

The FHIR server is used to store patient data. The HAPI FHIR uses a S2 database to persist patient data.

The ML API is used to make stroke risk predictions. The ML API uses a machine learning model to make stroke risk predictions. The ML API uses the patient data stored in the FHIR server to make stroke risk predictions.

The SPA is used to interact with the FHIR server and AI API. The SPA is also used to display the stroke risk prediction. The SPA uses SolidJS to display the patient data and stroke risk prediction.

![Architecture Diagram](./images/architecture-diagram.png)
