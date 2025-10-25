# ChiliFridge - Simple Test Server
# This is just for testing. The app doesn't need a server to run!
# After testing, you can host the src/public folder anywhere

Write-Host "🧊 ChiliFridge - Test Server Starting..." -ForegroundColor Cyan
Write-Host ""
Write-Host "NOTE: This server is only for testing!" -ForegroundColor Yellow
Write-Host "The app works completely offline without any server." -ForegroundColor Yellow
Write-Host ""

# Check if Python is installed
$pythonCmd = $null
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonCmd = "python"
} elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    $pythonCmd = "python3"
}

if ($pythonCmd) {
    Write-Host "Starting HTTP server on http://localhost:8000" -ForegroundColor Green
    Write-Host ""
    Write-Host "📱 To test on your phone:" -ForegroundColor Cyan
    Write-Host "1. Find your computer's IP address (run 'ipconfig' in another window)"
    Write-Host "2. On your phone (same WiFi), open: http://YOUR-IP:8000"
    Write-Host "3. Install as PWA from Chrome menu"
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""

    Set-Location "src\public"
    & $pythonCmd -m http.server 8000
} else {
    Write-Host "❌ Python not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternative: Use the Node.js server instead:" -ForegroundColor Yellow
    Write-Host "  npm start" -ForegroundColor White
    Write-Host ""
    Write-Host "Or host the 'src/public' folder on:" -ForegroundColor Yellow
    Write-Host "  - GitHub Pages (free)"
    Write-Host "  - Netlify (free)"
    Write-Host "  - Vercel (free)"
    Write-Host ""
    Write-Host "See MOBILE_INSTALL_GUIDE.md for details"
}
