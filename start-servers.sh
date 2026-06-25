#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "====================================="
echo "   Starting Local Development Servers"
echo "====================================="

# Use concurrently to run both frontend and backend in the same terminal
npx concurrently -k -n "backend,frontend" -c "cyan,magenta" "cd backend && npm run dev" "cd frontend && npm run dev"
