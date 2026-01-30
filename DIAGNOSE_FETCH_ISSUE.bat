@echo off
echo ============================================================
echo DIAGNOSING "FAILED TO FETCH" ISSUE
echo ============================================================
echo.

echo [1] Checking if backend is running on port 8000...
echo ============================================================
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8000/api/health' -TimeoutSec 3; Write-Host 'Backend is running!' -ForegroundColor Green; $response.Content } catch { Write-Host 'Backend is NOT running!' -ForegroundColor Red; Write-Host 'Error:' $_.Exception.Message }"

echo.
echo [2] Checking if frontend dev server is running on port 5173...
echo ============================================================
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:5173' -TimeoutSec 3; Write-Host 'Frontend is running!' -ForegroundColor Green } catch { Write-Host 'Frontend is NOT running!' -ForegroundColor Red; Write-Host 'Error:' $_.Exception.Message }"

echo.
echo [3] Configuration Summary...
echo ============================================================
echo Backend should run on: http://localhost:8000
echo Frontend should run on: http://localhost:5173
echo API calls go to: http://localhost:8000/api/*
echo.

echo [4] Next Steps...
echo ============================================================
echo If backend is NOT running:
echo   1. Open a terminal and run: START_BACKEND.bat
echo   2. Wait for "Server starting on http://localhost:8000"
echo.
echo If frontend is NOT running:
echo   1. Open another terminal and run: START_FRONTEND.bat  
echo   2. Wait for "Local: http://localhost:5173"
echo.
echo Then test the connection again with this script.
echo.

pause