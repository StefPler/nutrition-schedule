#!/bin/bash
docker build --no-cache --tag "diet-schedule-page" . && docker run -d --name diet-schedule -p 3000:3000 diet-schedule-page