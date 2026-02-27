#!/usr/bin/env bash
# Build the TypeScript code
# set on error
set -o errexit

# Force npm to install devDependencies so TypeScript has its types
npm install --include=dev

npm run build
npx prisma generate
npx prisma migrate deploy