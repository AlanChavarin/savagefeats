#!/bin/bash

set -euo pipefail

# Define variables
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DATABASE=my_database
BACKUP_DIRECTORY=/mongodump

# Restore the MongoDB dump
mongorestore --uri "mongodb://admin:password@localhost:27017" ./docker-entrypoint-initdb.d/mongodump/
