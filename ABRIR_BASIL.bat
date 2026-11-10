@echo off
chcp 65001 >nul
cd /d "%~dp0"
title BASIL - Kitchen Stories
where node >nul 2>nul
if errorlevel 1 (
  echo O Node.js nao foi encontrado. Instale a versao LTS em https://nodejs.org
  pause
  exit /b 1
)
if not exist "node_modules\vite\bin\vite.js" (
  echo Instalando as bibliotecas do BASIL...
  call npm.cmd install
  if errorlevel 1 (
    echo Nao foi possivel instalar as dependencias.
    pause
    exit /b 1
  )
)
echo Abrindo BASIL em http://127.0.0.1:5177
call npm.cmd run dev
if errorlevel 1 pause
