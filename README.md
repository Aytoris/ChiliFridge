# 🧊 ChiliFridge - Fridge & Recipe Manager

**A fully offline Progressive Web App to manage your fridge inventory, recipes, and grocery lists.**

> 📱 **No server required!** Runs completely on your phone. Works 100% offline.

---

## ✨ Features

- 🥗 **Fridge Management** - Track what's in your fridge
- 📖 **40+ Built-in Recipes** - All embedded in the app
- 📅 **Meal Planning** - Weekly meal calendar
- 🛒 **Smart Grocery Lists** - Auto-generate from meal plans
- 🏪 **Shopping Mode** - Organize by store layout
- 📱 **Progressive Web App** - Install like a native app
- ✈️ **Works Offline** - No internet needed
- 🔒 **Privacy First** - All data stored locally

---

## 🚀 Quick Start

### Access the Live App:

**Deployed on GitHub Pages:** `https://Aytoris.github.io/ChiliFridge`

### Install on Your Phone:

1. **On Android**:
   - Open the URL above in Chrome
   - Tap menu (⋮) → "Add to Home screen" or "Install app"

2. **On iOS**:
   - Open the URL above in Safari
   - Tap Share button → "Add to Home Screen"

3. **Done!** 🎉 The app icon appears on your home screen

See **[MOBILE_INSTALL_GUIDE.md](MOBILE_INSTALL_GUIDE.md)** for detailed instructions.

---

## 📂 Project Structure

```
ChiliFridge/
├── src/public/              ← THE APP (deployed to GitHub Pages)
│   ├── index.html           Main app
│   ├── manifest.json        PWA config
│   ├── sw.js               Service worker
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── recipesData.js   40+ embedded recipes
│   │   ├── api.js           localStorage API
│   │   ├── fridge.js        Fridge management
│   │   ├── meal.js          Meal planning
│   │   ├── grocery.js       Grocery lists
│   │   ├── calendar.js      Week planner
│   │   └── ...
│   └── img/
│       ├── icon-192x192.svg
│       └── icon-512x512.svg
├── MOBILE_INSTALL_GUIDE.md  ← Installation guide
├── QUICKSTART_MOBILE.md      Quick reference
├── DEPLOYMENT_CHECKLIST.md   GitHub Pages info
└── README.md                This file
```

---

## 🎯 How It Works

### All Client-Side:
- ✅ **No Node.js server** - Just HTML/CSS/JavaScript
- ✅ **No database server** - Uses browser localStorage
- ✅ **No API calls** - All data is local
- ✅ **No internet needed** - Works completely offline

### User Flow:
1. **Fridge Management**: Add items to your fridge with quantities
2. **Recipe Browsing**: Select recipes to see required ingredients
3. **Missing Ingredients**: The app shows what ingredients you're missing
4. **Grocery List**: Add missing ingredients to your grocery list
5. **Meal Planning**: Plan your meals for the week and generate a grocery list

---

## 💾 Data Storage

All data stored in browser's localStorage:
- 🥗 **Fridge items** → `chilifridge_fridge`
- 📖 **Custom recipes** → `chilifridge_custom_recipes`
- 📅 **Meal calendar** → `mealCalendar`
- 🛒 **Grocery list** → `groceryList`
- 📁 **Categories** → `fridgeCategories`
- 🏪 **Store layout** → `storeLayout`

**Important:** Recipes are embedded in JavaScript. No external dependencies. Private and secure.

---

## 🌐 Deployment

**Currently deployed on GitHub Pages**

- **Live URL**: `https://Aytoris.github.io/ChiliFridge`
- **Repository**: `Aytoris/ChiliFridge`
- **Deployment folder**: `src/public`

The GitHub Pages deployment automatically serves all files from the `src/public` folder with HTTPS, enabling PWA installation.

---

---

## 💾 Data Management

### What's Stored:
- Fridge inventory → `chilifridge_fridge`
- Meal calendar → `mealCalendar`
- Grocery lists → `groceryList`
- Custom recipes → `chilifridge_custom_recipes`
- Preferences → Various localStorage keys

### Backup Your Data:
Data is stored in browser's localStorage. To backup:
1. Don't clear browser data
2. Use the export feature (future)
3. Or copy localStorage manually

---

## 🎨 Customization

### Change App Icons:
1. Create PNG icons (192x192 and 512x512)
2. Replace `img/icon-*.svg` files
3. Update `manifest.json`

### Add Custom Recipes:
1. Open app
2. Use the app (future feature)
3. Or edit `js/recipesData.js` directly

---

## � For Developers

### Test Locally:

```powershell
# Navigate to the app folder
cd src/public

# Start a local server (Python)
python -m http.server 8000

# Or use Node.js
npx http-server -p 8000

# Then visit http://localhost:8000
```

### Make Changes & Deploy:

1. **Edit files** in `src/public/`
2. **Test locally** using the commands above
3. **Commit changes**:
   ```powershell
   git add .
   git commit -m "Description of changes"
   ```
4. **Push to GitHub**:
   ```powershell
   git push origin main
   ```
5. **Wait 1-2 minutes** - GitHub Pages auto-deploys
6. **Changes are live** at `https://Aytoris.github.io/ChiliFridge`

### Check Deployment Status:
- Visit: `https://github.com/Aytoris/ChiliFridge/actions`
- Look for green checkmark ✅ on latest workflow

---

## �📖 Documentation

- **[MOBILE_INSTALL_GUIDE.md](MOBILE_INSTALL_GUIDE.md)** - Complete installation guide
- **[QUICKSTART_MOBILE.md](QUICKSTART_MOBILE.md)** - Quick reference
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - GitHub Pages deployment info

---

## 🔧 Troubleshooting

**Can't install as PWA?**
- Make sure you're using the GitHub Pages URL (HTTPS)
- Use Chrome (Android) or Safari (iOS)
- Wait for page to fully load
- Look for "Install" prompt or menu option

**Lost data?**
- Data is stored in browser's localStorage
- Clearing browser data = losing everything
- Keep the app installed to preserve data

**App not working?**
- Check browser console for errors (F12)
- Ensure you're accessing via HTTPS
- Try clearing cache and reloading
- Verify internet connection for first load

---

## 🌟 Features in Detail

### Fridge Management
- Add/edit/delete items
- Quantity tracking
- Custom categories
- Storage location organization

### Meal Planning
- Weekly calendar view
- Recipe selection
- Portion calculator
- Missing ingredients detection

### Grocery Lists
- Auto-generation from meals
- Shopping mode
- Store layout customization
- Item checking

### Progressive Web App
- Install on home screen
- Full-screen mode
- Works offline
- Fast loading

---

## 🤝 Contributing

This is a personal project, but feel free to:
- Fork it
- Customize it
- Share improvements
- Report issues on GitHub

---

## 📤 Sharing ChiliFridge

Want to share this app with others?

**Simply share the URL**: `https://Aytoris.github.io/ChiliFridge`

Anyone can:
- Visit the link
- Install it as a PWA on their device
- Have their own independent data
- Use it completely offline

Perfect for sharing with:
- 👨‍👩‍�‍👦 Family members
- 🏠 Roommates
- 👫 Friends
- 🎓 Students

---

## �📄 License

MIT License - Use it however you want!

---

## 🎉 Credits

Built with vanilla JavaScript. No frameworks needed!

**ChiliFridge** - Your fridge, your recipes, your way. 🥗📱✨

---

## 📞 Support

- **Live App**: `https://Aytoris.github.io/ChiliFridge`
- **Repository**: `https://github.com/Aytoris/ChiliFridge`
- **Issues**: Report bugs or request features on GitHub

Enjoy managing your fridge like a pro! 🎊
