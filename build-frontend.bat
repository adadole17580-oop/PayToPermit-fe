@echo off
echo ========================================
echo    PayToPermit Frontend Build
echo ========================================
echo.

REM Try different methods to run Angular build
echo Attempting to build frontend...

REM Method 1: Use npx directly
echo Method 1: Using npx...
call npx ng build --configuration production
if %ERRORLEVEL% EQU 0 goto SUCCESS

REM Method 2: Use node_modules directly
echo Method 2: Using node_modules...
call node_modules\.bin\ng.cmd build --configuration production
if %ERRORLEVEL% EQU 0 goto SUCCESS

REM Method 3: Use node to run angular CLI
echo Method 3: Using node...
call node node_modules\@angular\cli\bin\ng.js build --configuration production
if %ERRORLEVEL% EQU 0 goto SUCCESS

echo.
echo ❌ All build methods failed
echo Please check your Angular installation
goto END

:SUCCESS
echo.
echo ✅ Frontend build completed successfully!
echo Build files are in: dist\paytopermit-fe\

:END
pause
