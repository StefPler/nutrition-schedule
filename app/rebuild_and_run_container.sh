#!/bin/bash

# Build the Docker image
docker build --no-cache --tag "nutrition-schedule-page" .

# Stop the container if it's running
docker stop nutrition-schedule 2>/dev/null || true

# Remove the container if it exists
docker rm nutrition-schedule 2>/dev/null || true

# Run the new container
docker run -d --name nutrition-schedule -p 3000:3000 nutrition-schedule-page