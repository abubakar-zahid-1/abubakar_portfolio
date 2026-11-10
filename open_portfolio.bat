@echo off
title Abubakar Z. Portfolio Launcher
echo ===================================================
echo Starting Abubakar Z. Portfolio Server on Port 5000...
echo ===================================================
timeout /t 1 >nul
start "" "http://localhost:5000"
node server.js
pause
