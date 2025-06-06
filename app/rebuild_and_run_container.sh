#!/bin/bash
docker build --no-cache --tag "nutrition-schedule-page" . && docker run -d --name nutrition-schedule -p 3000:3000 nutrition-schedule-page