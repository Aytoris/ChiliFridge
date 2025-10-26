# 📱 ChiliFridge - Mobile Installation Guide

## ✨ Deployed on GitHub Pages - Ready to Install!

Your ChiliFridge app is live and ready to install on your phone!

**Live URL**: `https://Aytoris.github.io/ChiliFridge`

---

## 🚀 Quick Install - Android & iOS

### Step-by-Step Installation:

#### **On Android (Chrome):**

1. **Open Chrome** on your Android phone
2. **Visit**: `https://Aytoris.github.io/ChiliFridge`
3. **Wait** for the page to fully load
4. **Look for** the "Install" prompt at the bottom, OR:
5. **Tap the 3-dot menu** (⋮) in top-right
6. **Select** "Add to Home screen" or "Install app"
7. **Tap "Install"** or "Add"
8. **Done!** 🎉 App icon appears on your home screen

#### **On iOS (Safari):**

1. **Open Safari** on your iPhone or iPad
2. **Visit**: `https://Aytoris.github.io/ChiliFridge`
3. **Wait** for the page to fully load
4. **Tap the Share button** (square with arrow pointing up)
5. **Scroll down** and tap **"Add to Home Screen"**
6. **Tap "Add"** in the top-right
7. **Done!** 🎉 App icon appears on your home screen

---

## ✅ What You Get

After installation:
- ✅ **Full-screen app** - No browser UI
- ✅ **Home screen icon** - Launch like any native app
- ✅ **Works offline** - No internet required after first load
- ✅ **Private data** - All stored locally on your device
- ✅ **Fast loading** - Cached for instant access

---

## 📂 What's in the App

The app at `https://Aytoris.github.io/ChiliFridge` includes:

```
✅ index.html           (Main app)
✅ manifest.json        (PWA configuration)
✅ sw.js               (Service worker for offline support)
✅ css/styles.css      (All styling)
✅ js/
   ├── recipesData.js  (40+ recipes - embedded!)
   ├── api.js          (localStorage API)
   ├── fridge.js       (Fridge management)
   ├── meal.js         (Meal planning)
   ├── grocery.js      (Grocery lists)
   ├── calendar.js     (Weekly planner)
   └── ...
✅ img/
   ├── icon-192x192.svg (App icon)
   └── icon-512x512.svg (App icon large)
```

**Total size**: ~500KB - fits easily in browser storage!

---

## 💾 How Data is Stored

All your data is stored in **browser's localStorage**:

- 🥗 **Fridge items**: `chilifridge_fridge`
- 📖 **Custom recipes**: `chilifridge_custom_recipes`
- 📅 **Meal calendar**: `mealCalendar`
- 🛒 **Grocery list**: `groceryList`
- 📁 **Categories**: `fridgeCategories`
- 🏪 **Store layout**: `storeLayout`

**Important:** Data is stored per-browser. If you clear browser data, you'll lose your fridge contents. Consider exporting your data regularly!

---

## ✅ What Works Offline

✅ **Full app functionality** - everything works!
✅ **All 40+ recipes** - embedded in the app
✅ **Fridge management** - add, edit, delete items
✅ **Meal planning** - weekly calendar
✅ **Grocery lists** - with shopping mode
✅ **Custom categories** - organize your way
✅ **No internet required** - after first install

---

## 🎨 Customizing Your Icons

The app includes basic SVG icons. For better appearance:

1. **Create PNG icons:**
   - 192x192 pixels
   - 512x512 pixels

2. **Use a free tool:**
   - [Favicon.io](https://favicon.io/)
   - [PWA Builder](https://www.pwabuilder.com/imageGenerator)

3. **Replace files:**
   - Save as `img/icon-192x192.png`
   - Save as `img/icon-512x512.png`
   - Update `manifest.json` to use `.png` instead of `.svg`

---

## 🔧 Troubleshooting

### Can't find "Add to Home screen" option?
- ✅ Make sure you're using **Chrome** (Android) or **Safari** (iOS)
- ✅ Visit the GitHub Pages URL (not a local file)
- ✅ Wait for the page to **fully load**
- ✅ Try **refreshing** the page
- ✅ Look for an **install banner** at the bottom of the screen

### App won't install as PWA?
- ✅ Ensure you're accessing via **HTTPS** (GitHub Pages provides this)
- ✅ **file://** protocol doesn't support PWAs
- ✅ The service worker needs to register (requires HTTPS)
- ✅ Check browser console (F12) for any errors

### Lost my data?
- ⚠️ Data is stored in **browser localStorage**
- ⚠️ Clearing browser data = losing app data
- ⚠️ Each browser/device has its own data
- 💡 **Backup tip**: Don't clear browser data for this app
- 💡 **Future**: Export/import feature coming

### Can I use on multiple devices?
- ✅ Yes! Install on as many devices as you want
- ⚠️ Each device has **independent data** (no sync)
- 💡 Each installation is completely separate
- 💡 Perfect for family members to have their own

### App not working offline?
- ✅ Visit the app **once while online** first
- ✅ Service worker caches files on first visit
- ✅ After that, works 100% offline
- ✅ Check browser supports service workers (most modern browsers do)

---

## 🌟 First-Time Setup

After installing the app:

1. **Launch the app** from your home screen
2. **Add some fridge items** to get started
3. **Browse the 40+ recipes** included
4. **Plan your first week** of meals
5. **Generate a grocery list** from your meal plan
6. **Go shopping!** 🛒

---

## � Understanding Data Storage

**Where is my data?**
- All data is stored in your browser's **localStorage**
- Completely private and local to your device
- No data is sent to any server

**What's stored:**
- 🥗 **Fridge items**: `chilifridge_fridge`
- 📖 **Custom recipes**: `chilifridge_custom_recipes`
- 📅 **Meal calendar**: `mealCalendar`
- 🛒 **Grocery list**: `groceryList`
- 📁 **Categories**: `fridgeCategories`
- 🏪 **Store layout**: `storeLayout`

**Important:**
- ⚠️ Clearing browser data will delete everything
- 💡 Don't use incognito/private mode for regular use
- 💡 Data is tied to the specific browser on the specific device

---

## � Next Steps

Now that your app is installed:

1. ✅ **Use it daily** for meal planning
2. ✅ **Track your fridge** inventory
3. ✅ **Never forget** what you have at home
4. ✅ **Generate smart** grocery lists
5. ✅ **Save money** by reducing food waste

---

## 📤 Sharing with Others

Want to share ChiliFridge with friends or family?

**Simply share the URL:**
`https://Aytoris.github.io/ChiliFridge`

They can:
- Visit the link on their phone
- Install it as a PWA
- Have their own independent data
- Use it completely offline

---

Enjoy your fully standalone ChiliFridge app! 🎉🥗📱
