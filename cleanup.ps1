# ChiliFridge Cleanup Script
# Removes all unused server-side files

Write-Host ""
Write-Host "🧹 ChiliFridge Cleanup Script" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This will remove all server-side files that are no longer needed." -ForegroundColor Yellow
Write-Host "Your PWA in 'src/public' will NOT be affected." -ForegroundColor Green
Write-Host ""

# Ask for confirmation
$confirmation = Read-Host "Do you want to continue? (yes/no)"
if ($confirmation -ne 'yes') {
    Write-Host "Cleanup cancelled." -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "Starting cleanup..." -ForegroundColor Cyan
Write-Host ""

# Track what's being deleted
$deletedItems = @()
$deletedSize = 0

# Function to safely remove items
function Remove-SafeItem {
    param($Path, $Description)

    if (Test-Path $Path) {
        try {
            $item = Get-Item $Path
            if ($item -is [System.IO.DirectoryInfo]) {
                $size = (Get-ChildItem $Path -Recurse -File | Measure-Object -Property Length -Sum).Sum
                $deletedSize += $size
            } else {
                $deletedSize += $item.Length
            }

            Remove-Item $Path -Recurse -Force -ErrorAction Stop
            Write-Host "✓ Removed: $Description" -ForegroundColor Green
            $deletedItems += $Description
            return $true
        } catch {
            Write-Host "✗ Failed to remove: $Description - $_" -ForegroundColor Red
            return $false
        }
    } else {
        Write-Host "- Skipped: $Description (not found)" -ForegroundColor Gray
        return $false
    }
}

# Remove server files
Write-Host "Removing server files..." -ForegroundColor Yellow
Remove-SafeItem "server.js" "Server (server.js)"
Remove-SafeItem "recipes.json" "Recipes JSON (now embedded)"
Remove-SafeItem "package.json" "Package config"
Remove-SafeItem "package-lock.json" "Package lock"

# Remove node_modules (usually the largest)
Write-Host ""
Write-Host "Removing node_modules (this may take a moment)..." -ForegroundColor Yellow
Remove-SafeItem "node_modules" "Node modules (~50-100 MB)"

# Remove server code directories
Write-Host ""
Write-Host "Removing server code directories..." -ForegroundColor Yellow
Remove-SafeItem "src\controllers" "Controllers"
Remove-SafeItem "src\database" "Database code"
Remove-SafeItem "src\models" "Server models"
Remove-SafeItem "src\routes" "Express routes"
Remove-SafeItem "src\utils" "Server utilities"

# Remove old/duplicate folders
Write-Host ""
Write-Host "Removing old/duplicate folders..." -ForegroundColor Yellow
Remove-SafeItem "public" "Old public folder"
Remove-SafeItem "data" "Database data folder"

# Summary
Write-Host ""
Write-Host "=============================" -ForegroundColor Cyan
Write-Host "✅ Cleanup Complete!" -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Removed items:" -ForegroundColor Cyan
foreach ($item in $deletedItems) {
    Write-Host "  - $item" -ForegroundColor White
}
Write-Host ""
Write-Host "Disk space freed: $([math]::Round($deletedSize / 1MB, 2)) MB" -ForegroundColor Green
Write-Host ""

# Show what's left
Write-Host "Your project now contains:" -ForegroundColor Cyan
Write-Host "  ✓ src/public/ - Your PWA app" -ForegroundColor Green
Write-Host "  ✓ Documentation files (.md)" -ForegroundColor Green
Write-Host "  ✓ Test files (test-local.html, test-pwa.ps1)" -ForegroundColor Green
Write-Host ""

# Next steps
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Test your app: Open test-local.html" -ForegroundColor White
Write-Host "  2. Deploy src/public to hosting service" -ForegroundColor White
Write-Host "  3. Install on your phone as PWA" -ForegroundColor White
Write-Host ""
Write-Host "See DEPLOYMENT_CHECKLIST.md for details!" -ForegroundColor Cyan
Write-Host ""
