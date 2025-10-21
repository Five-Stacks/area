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
      ├── database/      # Setup database at server start
      ├── config/        # Setup the configuration for the modules
      ├── controllers/   # Request/response logic for each route
      ├── middleware/    # Auth, logging, error handlers, parsers
      ├── models/        # ORM models and database connection logic
      ├── routes/        # Route definitions, connect endpoints to controllers
      ├── services/      # Area engine and hook execution logic
      └── utils/         # Small helpers, formatting, generic utilities
```

## Usage

- Start in production:
  `npm start`
- Start in development (with auto-reload):
  `npm run dev`

## Environment Variables

Create a `.env` file at the root with the following variables:

```
POSTGRES_URL=postgres://user:password@localhost:5432/dbname
JWT_SECRET=yoursecret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Discord OAuth
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret

# Spotify OAuth
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Twitter OAuth (OAuth 2.0)
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret

# Microsoft OAuth
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret
```

## Module System

- Uses ECMAScript Modules (ESM):
  Import syntax: `import express from 'express';`
  (instead of CommonJS: `const express = require('express')`)

## Docker

The server can be built and run using Docker.
See the root [README.md](../README.md) for instructions.
