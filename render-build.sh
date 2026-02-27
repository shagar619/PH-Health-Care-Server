#!/usr/bin/env bash
# Build the TypeScript code
# set on error
set -o errexit

npm install
npm run build
npx prisma generate
npx prisma migrate deploy