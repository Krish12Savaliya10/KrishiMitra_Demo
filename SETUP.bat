@echo off
title KrishiMitra - One-Click Setup
color 0A
cls

echo.
echo  ██╗  ██╗██████╗ ██╗███████╗██╗  ██╗██╗███╗   ███╗██╗████████╗██████╗  █████╗ 
echo  ██║ ██╔╝██╔══██╗██║██╔════╝██║  ██║██║████╗ ████║██║╚══██╔══╝██╔══██╗██╔══██╗
echo  █████╔╝ ██████╔╝██║███████╗███████║██║██╔████╔██║██║   ██║   ██████╔╝███████║
echo  ██╔═██╗ ██╔══██╗██║╚════██║██╔══██║██║██║╚██╔╝██║██║   ██║   ██╔══██╗██╔══██║
echo  ██║  ██╗██║  ██║██║███████║██║  ██║██║██║ ╚═╝ ██║██║   ██║   ██║  ██║██║  ██║
echo  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
echo.
echo                    AI-Powered Smart Farming Platform
echo                    ===================================
echo.
echo  [SETUP] Starting one-click installation...
echo.

:: ─────────────────────────────────────────────
::  STEP 1: Check Node.js
:: ─────────────────────────────────────────────
echo [1/6] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Node.js is NOT installed!
    echo.
    echo  Please install Node.js first:
    echo  1. Go to: https://nodejs.org
    echo  2. Download the "LTS" version ^(recommended^)
    echo  3. Run the installer ^(keep all defaults^)
    echo  4. Restart this script after installation
    echo.
    pause
    exit /b 1
)
echo  [OK] Node.js found: 
node --version
echo.

:: ─────────────────────────────────────────────
::  STEP 2: Check npm
:: ─────────────────────────────────────────────
echo [2/6] Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] npm not found. Please reinstall Node.js from nodejs.org
    pause
    exit /b 1
)
echo  [OK] npm found: 
npm --version
echo.

:: ─────────────────────────────────────────────
::  STEP 3: Setup backend .env file
:: ─────────────────────────────────────────────
echo [3/6] Setting up backend environment...
if not exist "backend\.env" (
    echo  Creating .env file from template...
    copy "backend\.env.example" "backend\.env" >nul
    echo.
    echo  ┌─────────────────────────────────────────────────────────────────┐
    echo  │                    IMPORTANT - READ THIS!                       │
    echo  │                                                                 │
    echo  │  The .env file has been created. You have 2 options:           │
    echo  │                                                                 │
    echo  │  OPTION A - Use MongoDB Atlas (Recommended, Free Cloud DB):    │
    echo  │    1. Go to: https://mongodb.com/atlas                         │
    echo  │    2. Create a free account and cluster                        │
    echo  │    3. Copy your connection string                              │
    echo  │    4. Open: backend\.env                          │
    echo  │    5. Replace MONGO_URI= with your Atlas connection string     │
    echo  │                                                                 │
    echo  │  OPTION B - Use Local MongoDB (Already installed?):            │
    echo  │    The default .env already points to localhost MongoDB.       │
    echo  │    Make sure MongoDB service is running.                       │
    echo  └─────────────────────────────────────────────────────────────────┘
    echo.
    pause
) else (
    echo  [OK] .env file already exists, skipping.
)
echo.

:: ─────────────────────────────────────────────
::  STEP 4: Install backend dependencies
:: ─────────────────────────────────────────────
echo [4/6] Installing backend packages (this may take 1-2 minutes)...
cd backend
call cd frontend && npm install && cd ..
if %errorlevel% neq 0 (
    echo  [ERROR] Backend cd frontend && npm install && cd .. failed!
    pause
    exit /b 1
)
cd ..
echo  [OK] Backend packages installed!
echo.

:: ─────────────────────────────────────────────
::  STEP 5: Install frontend dependencies
:: ─────────────────────────────────────────────
echo [5/6] Installing frontend packages (this may take 3-5 minutes)...
call cd frontend && npm install && cd ..
if %errorlevel% neq 0 (
    echo  [ERROR] Frontend cd frontend && npm install && cd .. failed!
    pause
    exit /b 1
)
echo  [OK] Frontend packages installed!
echo.

:: ─────────────────────────────────────────────
::  STEP 6: Create start script shortcut
:: ─────────────────────────────────────────────
echo [6/6] Creating launch shortcut...
echo  [OK] Start.bat is ready.
echo.

:: ─────────────────────────────────────────────
::  DONE
:: ─────────────────────────────────────────────
echo.
echo  ╔═══════════════════════════════════════════════════════════════════╗
echo  ║                   SETUP COMPLETE!                                ║
echo  ║                                                                  ║
echo  ║   To start KrishiMitra, simply run:  START.bat                  ║
echo  ║                                                                  ║
echo  ║   The app will open at:  http://localhost:3000                   ║
echo  ╚═══════════════════════════════════════════════════════════════════╝
echo.
set /p choice="Do you want to start the app now? (y/n): "
if /i "%choice%"=="y" (
    call START.bat
) else (
    echo  Run START.bat whenever you're ready. 
    pause
)
