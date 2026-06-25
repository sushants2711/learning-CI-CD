@echo off
echo =====================================
echo    Setting up Local Environment      
echo =====================================

echo 1. Installing Backend Dependencies...
cd backend
call npm install
cd ..

echo 2. Installing Frontend Dependencies...
cd frontend
call npm install
cd ..

echo Dependencies installed successfully!
