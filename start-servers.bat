@echo off
echo =====================================
echo    Starting Local Development Servers
echo =====================================

rem Use concurrently to run both frontend and backend in the same terminal
npx concurrently -k -n "backend,frontend" -c "cyan,magenta" "cd backend && npm run dev" "cd frontend && npm run dev"
