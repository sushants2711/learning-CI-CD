#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "====================================="
echo "   Setting up Local Environment      "
echo "====================================="

echo "1. Installing Backend Dependencies..."
cd backend
npm install
cd ..

echo "2. Installing Frontend Dependencies..."
cd frontend
npm install
cd ..

echo "Dependencies installed successfully!"
