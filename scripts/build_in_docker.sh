#!/bin/sh

cd /app

npm install ci
npm run test -- --watchAll=false
npm run build