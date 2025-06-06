#!/bin/bash

# Rebuild and restart the container using docker-compose
docker compose down && docker compose up --build -d