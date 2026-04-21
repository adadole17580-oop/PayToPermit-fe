@echo off
echo ========================================
echo    PayToPermit Frontend Start
echo ========================================
echo.

REM Try different methods to start Angular dev server
echo Starting frontend development server...

REM Method 1: Use npx directly
echo Method 1: Using npx...
call npx ng serve --host 0.0.0.0 --port 4200
if %ERRORLEVEL% EQU 0 goto END

REM Method 2: Use node_modules directly
echo Method 2: Using node_modules...
call node_modules\.bin\ng.cmd serve --host 0.0.0.0 --port 4200
if %ERRORLEVEL% EQU 0 goto END

REM Method 3: Use node to run angular CLI
echo Method 3: Using node...
call node node_modules\@angular\cli\bin\ng.js serve --host 0.0.0.0 --port 4200
if %ERRORLEVEL% EQU 0 goto END

echo.
echo ❌ All start methods failed
echo Please check your Angular installation

:END
pause
