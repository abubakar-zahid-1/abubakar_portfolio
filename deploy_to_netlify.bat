@echo off
title Deploy Portfolio to Netlify Drop (100%% Free)
echo ========================================================
echo   Abubakar Z. Portfolio - Instant Free Live Deployment
echo ========================================================
echo.
echo [1/2] Opening Netlify Drop in your browser...
start https://app.netlify.com/drop
echo.
echo [2/2] Opening your portfolio public folder in File Explorer...
explorer.exe "%~dp0public"
echo.
echo --------------------------------------------------------
echo INSTRUCTIONS:
echo 1. Simply DRAG the "public" folder into the Netlify Drop page
echo    in your browser.
echo 2. Within 10 seconds, your portfolio is 100%% live worldwide!
echo 3. You can set your custom link like:
echo    https://abubakar-portfolio.netlify.app
echo --------------------------------------------------------
echo.
pause
