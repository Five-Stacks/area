-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OAuth accounts (for linking third-party accounts)
CREATE TABLE oauth_accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,
    provider_user_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMP,
    UNIQUE (provider, provider_user_id)
);

-- Services (e.g., Google, Facebook, Timer, etc.)
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- Actions (triggers)
CREATE TABLE actions (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    UNIQUE (service_id, name)
);

-- Reactions (effects)
CREATE TABLE reactions (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    UNIQUE (service_id, name)
);

-- User subscriptions to services (with OAuth tokens if needed)
CREATE TABLE user_services (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    oauth_account_id INTEGER REFERENCES oauth_accounts(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, service_id)
);

-- AREA: user-defined automations linking an action to a reaction
CREATE TABLE areas (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    action_id INTEGER REFERENCES actions(id) ON DELETE CASCADE,
    reaction_id INTEGER REFERENCES reactions(id) ON DELETE CASCADE,
    config JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- For logging AREA executions (optional, for audit/history)
CREATE TABLE area_executions (
    id SERIAL PRIMARY KEY,
    area_id INTEGER REFERENCES areas(id) ON DELETE CASCADE,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    log TEXT
);
