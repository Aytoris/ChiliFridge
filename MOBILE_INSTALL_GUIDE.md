# 📱 ChiliFridge - Mobile Installation Guide

## ✨ No Server Required - Fully Standalone PWA!

Your ChiliFridge app has been converted to work **entirely offline** on your Android phone. No computer or server needed!

---

## 🚀 Quick Start - Install on Android

### Method 1: Host on Free Static Hosting (Recommended)

The easiest way is to host the `src/public` folder on a free static hosting service, then install it as a PWA.

#### Option A: GitHub Pages (Free)
1. **Push the `src/public` folder to a GitHub repository**
2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select branch: `main`, folder: `/src/public`
   - Save
3. **Wait 1-2 minutes** for deployment
4. **Visit the URL** on your Android phone (e.g., `https://yourusername.github.io/chilifridge`)
5. **Install the app:**
   - Tap the 3-dot menu in Chrome
   - Tap **"Add to Home screen"** or **"Install app"**
   - Done! 🎉

#### Option B: Netlify Drop (Free - Drag & Drop)
1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag the `src/public` folder to the upload area
3. Get your URL (e.g., `https://random-name-12345.netlify.app`)
4. Open it on your Android phone and install as PWA

#### Option C: Vercel (Free)
1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to `src/public` folder
3. Run: `vercel --prod`
4. Get your URL and install as PWA on phone

---

### Method 2: Direct File Access (For Testing)

You can also copy the `src/public` folder directly to your phone:

1. **Copy the entire `src/public` folder** to your phone storage
2. **Open with Chrome:**
   - Use a file manager app
   - Navigate to the folder
   - Open `index.html` with Chrome
3. **Limitations:**
   - Service Worker won't register (file:// protocol)
   - Can't install as PWA this way
   - But the app will still work!

---

## 📂 Files You Need

Only copy the **`src/public`** folder to your phone or hosting. It contains:

```
src/public/
├── index.html           (Main app)
├── manifest.json        (PWA config)
├── sw.js               (Service worker)
├── css/
│   └── styles.css
├── js/
│   ├── recipesData.js  (All recipes - embedded!)
│   ├── api.js          (localStorage API)
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

### App won't install as PWA?
- Make sure you're accessing via **https://** or **localhost**
- File:// protocol doesn't support PWAs
- Use a hosting service (see Method 1)

### Lost my data?
- Data is stored in browser localStorage
- Clearing browser data = losing app data
- Export your data regularly using the future export feature

### Can I use multiple devices?
- Each device/browser has its own data
- No automatic sync (it's fully offline!)
- You can manually export/import data between devices

---

## 🚀 Next Steps

Now that your app is client-side:

1. **Host it** on a free service (GitHub Pages, Netlify, Vercel)
2. **Install it** on your Android phone as a PWA
3. **Use it** just like a native app!
4. **Optional:** Add data export/import for backups

---

## 📊 What Changed?

### Before (Server-Based):
- ❌ Needed Node.js server running
- ❌ Needed computer to be on
- ❌ Used SQLite database
- ❌ Network-dependent

### After (Client-Side):
- ✅ No server needed
- ✅ Works on phone alone
- ✅ Uses browser localStorage
- ✅ Fully offline capable

---

## 💡 Tips

- **Backup regularly**: Export your data once a month
- **Don't clear browser data**: Or you'll lose everything
- **Use Chrome**: Best PWA support on Android
- **Add to home screen**: For the full app experience

---

Enjoy your fully standalone ChiliFridge app! 🎉🥗📱
