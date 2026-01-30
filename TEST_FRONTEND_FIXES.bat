@echo off
echo ============================================================
echo TESTING FRONTEND FIXES
echo ============================================================
echo.

echo [1] Testing student data endpoint...
echo ============================================================
powershell -Command "$response = Invoke-WebRequest -Uri 'http://localhost:8000/api/student/2023EE345' -Method GET -UseBasicParsing; Write-Host 'Student API Response:' -ForegroundColor Green; $data = $response.Content | ConvertFrom-Json; Write-Host 'Name:' $data.name; Write-Host 'Roll No:' $data.roll_no; Write-Host 'Course:' $data.course; Write-Host 'CGPA Current:' $data.cgpa_current; Write-Host 'Attendance:' $data.attendance_percentage'%'"

echo.
echo [2] Testing prediction endpoint...
echo ============================================================
powershell -Command "$response = Invoke-WebRequest -Uri 'http://localhost:8000/api/predict/2023EE345' -Method POST -UseBasicParsing; Write-Host 'Prediction API Response:' -ForegroundColor Green; $data = $response.Content | ConvertFrom-Json; Write-Host 'Risk Level:' $data.risk_level; Write-Host 'Risk Percentage:' $data.risk_percentage'%'; Write-Host 'Risk Factors Count:' $data.risk_factors.Count; Write-Host 'Recommendations Count:' $data.recommendations.Count"

echo.
echo [3] Data structure summary...
echo ============================================================
echo Frontend components now expect:
echo   - data.roll_no (not data.rollNo)
echo   - data.cgpa_current (not data.currentCGPA)  
echo   - data.attendance_percentage (not data.attendance)
echo   - data.risk_factors (not data.riskFactors)
echo   - data.risk_level (not data.riskLevel)
echo   - rec.description (not rec.text)
echo.

echo [4] Next steps...
echo ============================================================
echo 1. Open browser to: http://localhost:5173
echo 2. Search for student: 2023EE345
echo 3. Click "Predict Dropout Risk"
echo 4. Verify all components display without errors
echo.

pause