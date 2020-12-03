#!/usr/bin/env bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER postgres;
    CREATE DATABASE star_buddy_db ENCODING UTF8;
    GRANT ALL PRIVILEGES ON DATABASE star_buddy_db TO postgres;
    ALTER USER postgres WITH PASSWORD 'root';
    ALTER USER postgres WITH SUPERUSER;
EOSQL