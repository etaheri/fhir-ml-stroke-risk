# Startup Configuration

## Configuration Files

- [Docker Compose File](../docker-compose.yaml)
- [API Dockerfile](../api/Dockerfile.api)
- [APP Dockerfile](../app/Dockerfile.app)
- [HAPI Dockerfile](../hapi/Dockerfile.hapi)

## Running the Application

The application can be run locally using Docker Compose. The docker-compose file will run the HAPI FHIR server, ML API, and SPA. It is recommended to use the hosted application for testing, but the application can be run locally if desired.

See the [Technical User Manual](./technical-user-manual.md) for more information on the application structure.

### Prerequisites
  * [Docker](https://www.docker.com/)
  * [Docker Compose](https://docs.docker.com/compose/)

### Running the Application

Run the following command to spin up the required containers:

```bash
docker-compose up
```

Running the docker compose command will spin up the following containers:

- `stroke-score-api` - ML API - http://localhost:5000
- `stroke-score-app` - Single Page App - http://localhost:3000
- `stroke-score-hapi` - HAPI FHIR Server - http://localhost:8080

Patient data will need to be manually loaded into the HAPI FHIR server. The patient data can be found in the `data` folder. Patient data can be loaded into the HAPI FHIR server using the HAPI FHIR interface. NOTE: The ids of the patients in the data folder may not match the ids of the patients in the HAPI FHIR server. The ids of the patients in the HAPI FHIR server can be found by navigating to the HAPI FHIR server interface.