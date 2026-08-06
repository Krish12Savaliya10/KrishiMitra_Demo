
@echo off
title KrishiMitra - Running
color 0A
cls

echo.
echo  KrishiMitra - AI Smart Farming Platform
echo  =========================================
echo  Starting all services...
echo.

:: Check if node_modules exist - if not, run setup first
if not exist "frontend\node_modules" (
    echo  [WARNING] Frontend packages not installed!
    echo  Please run SETUP.bat first.
    pause
    exit /b 1
)
if not exist "backend\node_modules" (
    echo  [WARNING] Backend packages not installed!
    echo  Please run SETUP.bat first.
    pause
    exit /b 1
)

echo  [1/3] Starting Backend API server on port 5001...
start "KrishiMitra Backend" cmd /k "cd backend && echo Backend starting... && node server.js"

timeout /t 3 /nobreak >nul

echo  [2/3] Starting ML Service on port 5005...
start "KrishiMitra ML" cmd /k "cd ml-service && if exist venv\Scripts\activate.bat (call venv\Scripts\activate.bat) && echo ML starting... && python manage.py runserver 0.0.0.0:5005"

timeout /t 3 /nobreak >nul

echo  [3/3] Starting Frontend on port 3000...
start "KrishiMitra Frontend" cmd /k "cd frontend && echo Frontend starting... && npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║   KrishiMitra is running!                                   ║
echo  ║                                                             ║
echo  ║   Frontend:  http://localhost:3000                          ║
echo  ║   Backend:   http://localhost:5001                          ║
echo  ║   ML:        http://localhost:5005                          ║
echo  ║                                                             ║
echo  ║   Opening browser...                                        ║
echo  ║   To stop: close the three black terminal windows           ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

timeout /t 3 /nobreak >nul
start "" "http://localhost:3000"

pause
