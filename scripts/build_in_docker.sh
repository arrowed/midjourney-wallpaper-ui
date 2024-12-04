#!/bin/sh

cd /app

npm install ci
npm run test
npm run build