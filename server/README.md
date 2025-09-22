# AREA Server

This folder contains the Node.js/Express backend for the AREA automation platform.

## Features

- REST API built with Express (ESM modules)
- Connects to PostgreSQL
- Exposes endpoints for automation logic

## File Structure

```
server/
  ├── Dockerfile
  ├── package.json
  ├── .env
  └── src/
      ├── app.js         # Express app setup
      ├── server.js      # Entry point, starts the server on port 8080
      ├── routes/        # Route definitions, connect endpoints to controllers
      ├── controllers/   # Request/response logic for each route
      ├── middleware/    # Auth, logging, error handlers, parsers
      ├── database/      # DB queries, schema, connection logic
      ├── services/      # Business logic, external API, reusable app logic
      └── utils/         # Small helpers, formatting, generic utilities
```

## Usage

- Start in production:
  `npm start`
- Start in development (with auto-reload):
  `npm run dev`

## Module System

- Uses ECMAScript Modules (ESM):
  Import syntax: `import express from 'express';`
  (instead of CommonJS: `const express = require('express')`)

## Docker

The server can be built and run using Docker.
See the root [README.md](../README.md) for instructions.
