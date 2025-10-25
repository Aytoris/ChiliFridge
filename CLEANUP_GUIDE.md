# 🧹 Cleanup Guide - Remove Unused Server Files

## Files/Folders to DELETE (No Longer Needed)

These are server-side files that are NOT needed for the standalone PWA:

### 🗑️ Server Files (Root Level)
- [ ] `server.js` - Express server (not needed)
- [ ] `recipes.json` - Now embedded in recipesData.js
- [ ] `package.json` - Server dependencies (not needed)
- [ ] `package-lock.json` - Server dependencies
- [ ] `node_modules/` - Server dependencies (can be large!)

### 🗑️ Server Code (src/ folder)
- [ ] `src/controllers/` - Server controllers
- [ ] `src/database/` - SQLite database code
- [ ] `src/models/` - Server-side models
- [ ] `src/routes/` - Express routes
- [ ] `src/utils/` - Server utilities

### 🗑️ Old Public Folder
- [ ] `public/` - Old public folder (duplicate)
- [ ] `public/app.js` - Not used

### 🗑️ Data Folder
- [ ] `data/` - SQLite database files (not needed)

---

## ✅ Files to KEEP

### Keep These (Required for PWA):
```
src/public/          ← THIS IS YOUR APP!
├── index.html
├── manifest.json
├── sw.js
├── css/
│   └── styles.css
├── js/
│   ├── api.js
│   ├── recipesData.js
│   ├── utility.js
│   ├── fridge.js
│   ├── meal.js
│   ├── grocery.js
│   ├── calendar.js
│   └── storeCategoriesData.js
└── img/
    ├── icon-192x192.svg
    └── icon-512x512.svg
```

### Keep These (Documentation):
```
README.md
MOBILE_INSTALL_GUIDE.md
QUICKSTART_MOBILE.md
DEPLOYMENT_CHECKLIST.md
CONVERSION_SUMMARY.md
test-local.html
test-pwa.ps1
CHECKLIST COURSES.txt (optional)
.gitignore
.git/ (if using git)
```

---

## 📊 Before and After

### Before Cleanup:
```
Total Size: ~50-100 MB (with node_modules)
- Server files: ~50-100 MB
- Database files: ~1-5 MB
- App files: ~500 KB
```

### After Cleanup:
```
Total Size: ~500 KB
- App files: ~500 KB
- Documentation: ~50 KB
```

**You'll save 99% of disk space!** 🎉

---

## 🚀 Automated Cleanup (PowerShell)

Save this as `cleanup.ps1` and run it:

```powershell
# Cleanup Script for ChiliFridge PWA

Write-Host "🧹 Cleaning up unused server files..." -ForegroundColor Cyan

# Remove server files
Remove-Item "server.js" -ErrorAction SilentlyContinue
Remove-Item "recipes.json" -ErrorAction SilentlyContinue
Remove-Item "package.json" -ErrorAction SilentlyContinue
Remove-Item "package-lock.json" -ErrorAction SilentlyContinue

# Remove node_modules (largest folder)
if (Test-Path "node_modules") {
    Write-Host "Removing node_modules (this may take a moment)..." -ForegroundColor Yellow
    Remove-Item "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
}

# Remove server code folders
Remove-Item "src\controllers" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "src\database" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "src\models" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "src\routes" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "src\utils" -Recurse -Force -ErrorAction SilentlyContinue

# Remove old public folder
Remove-Item "public" -Recurse -Force -ErrorAction SilentlyContinue

# Remove data folder
Remove-Item "data" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "✅ Cleanup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Your app is now clean and ready to deploy!" -ForegroundColor Cyan
Write-Host "Only the 'src/public' folder and documentation remain." -ForegroundColor Cyan
```

---

## 🔍 Manual Cleanup Steps

If you prefer to do it manually:

1. **Delete Server Dependencies:**
   ```powershell
   Remove-Item node_modules -Recurse -Force
   Remove-Item package.json
   Remove-Item package-lock.json
   ```

2. **Delete Server Code:**
   ```powershell
   Remove-Item server.js
   Remove-Item recipes.json
   Remove-Item src\controllers -Recurse
   Remove-Item src\database -Recurse
   Remove-Item src\models -Recurse
   Remove-Item src\routes -Recurse
   Remove-Item src\utils -Recurse
   ```

3. **Delete Old/Duplicate Files:**
   ```powershell
   Remove-Item public -Recurse
   Remove-Item data -Recurse
   ```

4. **Verify What's Left:**
   ```powershell
   Get-ChildItem -Recurse | Where-Object {!$_.PSIsContainer} | Measure-Object -Property Length -Sum
   ```

---

## ⚠️ Important Notes

1. **Backup First** (if you want to keep server code):
   ```powershell
   Copy-Item -Path . -Destination "..\ChiliFridge-ServerBackup" -Recurse
   ```

2. **Git Users**: Commit before cleanup:
   ```bash
   git add .
   git commit -m "Backup before cleanup"
   ```

3. **Can't Undo**: Once deleted, files are gone (unless you have backup)

---

## ✅ What to Do After Cleanup

1. **Verify App Works:**
   - Open `test-local.html` in browser
   - Click "Launch ChiliFridge"
   - Test all features

2. **Deploy to Hosting:**
   - Upload `src/public` folder only
   - Follow `DEPLOYMENT_CHECKLIST.md`

3. **Install on Phone:**
   - Access your hosted URL
   - Install as PWA

---

## 🎯 Final Structure

After cleanup, your project should look like:

```
ChiliFridge/
├── src/
│   └── public/              ← Your entire app!
│       ├── index.html
│       ├── manifest.json
│       ├── sw.js
│       ├── css/
│       ├── js/
│       └── img/
├── MOBILE_INSTALL_GUIDE.md
├── QUICKSTART_MOBILE.md
├── DEPLOYMENT_CHECKLIST.md
├── CONVERSION_SUMMARY.md
├── CLEANUP_GUIDE.md
├── README.md
├── test-local.html
├── test-pwa.ps1
└── .gitignore
```

**Clean, simple, and ready to deploy!** ✨

---

## 🤔 FAQ

**Q: Can I delete the documentation files too?**
A: Yes, but keep at least `MOBILE_INSTALL_GUIDE.md` for reference.

**Q: What if I need the server later?**
A: Keep a backup or use git to revert. But the PWA is better for mobile!

**Q: Will this affect my deployed app?**
A: No! Once deployed, your app is independent. Local cleanup doesn't affect it.

**Q: Should I delete .git folder?**
A: No, keep it if you're using version control.

---

Ready to clean up? Run the cleanup script or delete files manually! 🧹
