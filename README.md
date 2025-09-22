# AREA Automation Platform

This monorepo contains the code for an automation platform inspired by IFTTT/Zapier, with:
- **Backend:** Node.js/Express (REST API)
- **Web client:** Angular
- **Mobile client:** React Native (Android)
- **Database:** PostgreSQL

## Project Structure
- `server/` — Node.js/Express backend
- `web/` — Angular web client
- `mobile/` — React Native mobile client
- `docs/` — Documentation and diagrams

## Getting Started
1. Install Docker and Docker Compose.
2. Clone this repository.
3. Run `docker-compose build` to build all services.
4. Run `docker-compose up` to start the stack.

## Running in Development

For live code updates, use:

```
docker-compose -f docker-compose-dev.yml up
```

## Environment Variables

Create a `.env` file at the root with the following variables:

```
POSTGRES_USER=youruser
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=yourdb
```

## API & Endpoints

- Backend: [http://localhost:8080](http://localhost:8080)
  - Health: `/about.json`
- Web client: [http://localhost:8081](http://localhost:8081)
  - Download Android APK: `/client.apk`

## Documentation
- See `docs/HOWTOCONTRIBUTE.md` for contribution guidelines.
- See `docs/` for architecture diagrams and further documentation.

## Ports
- Backend API: [http://localhost:8080](http://localhost:8080)
- Web client: [http://localhost:8081](http://localhost:8081)
