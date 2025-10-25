# 🧊 ChiliFridge - Fridge & Recipe Manager# Fridge Recipe Manager



**A fully offline Progressive Web App to manage your fridge inventory, recipes, and grocery lists.**A local application to manage your fridge inventory, recipes, and grocery lists.



> 📱 **No server required!** Runs completely on your phone. Works 100% offline.## Features



---- **Fridge Management**: Keep track of what's in your fridge

- **Recipe Catalog**: Store and browse your favorite recipes

## ✨ Features- **Meal Planning**: Plan your meals for the week

- **Grocery List**: Generate grocery lists based on missing ingredients

- 🥗 **Fridge Management** - Track what's in your fridge- **Calendar**: Plan your meals for the week

- 📖 **40+ Built-in Recipes** - All embedded in the app

- 📅 **Meal Planning** - Weekly meal calendar## Project Structure

- 🛒 **Smart Grocery Lists** - Auto-generate from meal plans

- 🏪 **Shopping Mode** - Organize by store layoutThe project follows a modular architecture:

- 📱 **Progressive Web App** - Install like a native app

- ✈️ **Works Offline** - No internet needed```

- 🔒 **Privacy First** - All data stored locally├── data/                 # Database storage

│   └── fridge.sqlite     # SQLite database file

---├── recipes.json          # Recipe data storage

├── server.js             # Main server file

## 🚀 Quick Start├── package.json          # Project dependencies

└── src/

### For Mobile (Android/iOS):    ├── controllers/      # Business logic

    ├── database/         # Database configuration and models

1. **Host the app** (choose one):    │   ├── config.js     # Database configuration

   - **Netlify**: Drag `src/public` to [Netlify Drop](https://app.netlify.com/drop)    │   ├── index.js      # Database initialization

   - **GitHub Pages**: Push to GitHub, enable Pages    │   ├── migrate.js    # Migration script

   - **Vercel**: Deploy with `vercel --prod`    │   └── models/       # Sequelize models

    │       └── FridgeItem.js # Fridge item model

2. **Install on your phone**:    ├── models/           # Data models

   - Open the hosted URL in Chrome    ├── routes/           # API routes

   - Tap menu → "Add to Home screen"    ├── utils/            # Utility functions

   - Done! 🎉    └── public/           # Frontend files

        ├── css/          # Stylesheets

See **[MOBILE_INSTALL_GUIDE.md](MOBILE_INSTALL_GUIDE.md)** for detailed instructions.        ├── js/           # JavaScript modules

        ├── img/          # Images

---        └── index.html    # Main HTML file

```

## 📂 Project Structure

## Getting Started

```

ChiliFridge/### Prerequisites

├── src/public/              ← YOUR APP (deploy this folder!)

│   ├── index.html           Main app- Node.js (v12 or higher)

│   ├── manifest.json        PWA config

│   ├── sw.js               Service worker### Installation

│   ├── css/

│   │   └── styles.css1. Clone the repository

│   ├── js/2. Install dependencies:

│   │   ├── recipesData.js   40+ embedded recipes   ```

│   │   ├── api.js           localStorage API   npm install

│   │   ├── fridge.js        Fridge management   ```

│   │   ├── meal.js          Meal planning3. Start the server:

│   │   ├── grocery.js       Grocery lists   ```

│   │   ├── calendar.js      Week planner   npm start

│   │   └── ...   # OR

│   └── img/   node server.js

│       ├── icon-192x192.svg   ```

│       └── icon-512x512.svg4. Open your browser and navigate to `http://localhost:3000`

├── MOBILE_INSTALL_GUIDE.md  ← Installation guide

├── QUICKSTART_MOBILE.md      Quick reference## Development

├── DEPLOYMENT_CHECKLIST.md   Deploy steps

├── CLEANUP_GUIDE.md          Remove old filesFor development with auto-restart:

└── test-local.html           Test locally

``````

npm run dev

---```



## 🎯 How It Works## How It Works



### All Client-Side:1. **Fridge Management**: Add items to your fridge with quantities

- ✅ **No Node.js server** - Just HTML/CSS/JavaScript2. **Recipe Browsing**: Select recipes to see required ingredients

- ✅ **No database server** - Uses browser localStorage3. **Missing Ingredients**: The app shows what ingredients you're missing

- ✅ **No API calls** - All data is local4. **Grocery List**: Add missing ingredients to your grocery list

- ✅ **No internet needed** - Works completely offline5. **Meal Planning**: Plan your meals for the week and generate a grocery list



### Data Storage:## Data Storage

- All data stored in browser's localStorage

- Recipes embedded in JavaScriptThe application uses a SQLite database for storing fridge items:

- No external dependencies- Fridge items are stored in a SQLite database (`data/fridge.sqlite`)

- Private and secure- Recipes are still stored in `recipes.json`



---### Migration



## 📱 InstallationIf you're upgrading from a previous version that used JSON files, you can migrate your data:



### Option 1: Quick Deploy (Recommended)```

npm run migrate

**Netlify Drop (2 minutes):**```

```bash

1. Go to https://app.netlify.com/dropThis will transfer data from the old `fridge.json` to the new SQLite database.

2. Drag the 'src/public' folder

3. Get your URL## License

4. Install as PWA on phone

```MIT

### Option 2: GitHub Pages

```bash
1. Push src/public to GitHub
2. Settings → Pages → Enable
3. Visit https://yourusername.github.io/chilifridge
4. Install as PWA
```

### Option 3: Test Locally

```powershell
# PowerShell
.\test-pwa.ps1

# Or Python
cd src/public
python -m http.server 8000

# Then visit http://localhost:8000
```

---

## 🧹 Cleanup Old Server Files

If you have server files from a previous version:

```powershell
.\cleanup.ps1
```

This removes:
- ❌ Node.js server files
- ❌ Database files
- ❌ Server dependencies
- ✅ Keeps only the PWA in `src/public`

See **[CLEANUP_GUIDE.md](CLEANUP_GUIDE.md)** for details.

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

## 📖 Documentation

- **[MOBILE_INSTALL_GUIDE.md](MOBILE_INSTALL_GUIDE.md)** - Complete installation guide
- **[QUICKSTART_MOBILE.md](QUICKSTART_MOBILE.md)** - Quick reference
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Step-by-step deploy
- **[CLEANUP_GUIDE.md](CLEANUP_GUIDE.md)** - Remove unused files
- **[CONVERSION_SUMMARY.md](CONVERSION_SUMMARY.md)** - Technical details

---

## 🔧 Troubleshooting

**Can't install as PWA?**
- Must use HTTPS (hosting provides this)
- Use Chrome browser
- Wait for page to fully load

**Lost data?**
- Data is browser-specific
- Clearing browser data = losing everything
- Keep the app installed

**App not working?**
- Check browser console for errors
- Verify all files in `src/public`
- Try refreshing the page

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
- Report issues

---

## 📄 License

MIT License - Use it however you want!

---

## 🎉 Credits

Built with vanilla JavaScript. No frameworks needed!

**ChiliFridge** - Your fridge, your recipes, your way. 🥗📱✨
