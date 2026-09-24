@echo off
setlocal
cd /d "%~dp0"
echo ==========================================
echo Seowon Game Electron V2 Builder
echo ==========================================
where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js is not installed.
  pause
  exit /b 1
)
echo [1/3] Installing packages...
call npm install
if errorlevel 1 goto ERROR
echo [2/3] Building test EXE folder...
call npm run pack-win
if errorlevel 1 goto ERROR
echo.
echo TEST EXE READY:
echo dist\win-unpacked\SeowonGame.exe
echo.
echo [3/3] Building single portable EXE...
call npm run dist
if errorlevel 1 goto ERROR
echo.
echo ==========================================
echo SUCCESS
echo Single EXE: dist\SeowonGame.exe
echo ==========================================
explorer dist
pause
exit /b 0
:ERROR
echo BUILD FAILED.
pause
exit /b 1
