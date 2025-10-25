# Fridge Recipe Manager

A local application to manage your fridge inventory, recipes, and grocery lists.

## Features

- **Fridge Management**: Keep track of what's in your fridge
- **Recipe Catalog**: Store and browse your favorite recipes
- **Meal Planning**: Plan your meals for the week
- **Grocery List**: Generate grocery lists based on missing ingredients
- **Calendar**: Plan your meals for the week

## Project Structure

The project follows a modular architecture:

```
├── data/                 # Database storage
│   └── fridge.sqlite     # SQLite database file
├── recipes.json          # Recipe data storage
├── server.js             # Main server file
├── package.json          # Project dependencies
└── src/
    ├── controllers/      # Business logic
    ├── database/         # Database configuration and models
    │   ├── config.js     # Database configuration
    │   ├── index.js      # Database initialization
    │   ├── migrate.js    # Migration script
    │   └── models/       # Sequelize models
    │       └── FridgeItem.js # Fridge item model
    ├── models/           # Data models
    ├── routes/           # API routes
    ├── utils/            # Utility functions
    └── public/           # Frontend files
        ├── css/          # Stylesheets
        ├── js/           # JavaScript modules
        ├── img/          # Images
        └── index.html    # Main HTML file
```

## Getting Started

### Prerequisites

- Node.js (v12 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   # OR
   node server.js
   ```
4. Open your browser and navigate to `http://localhost:3000`

## Development

For development with auto-restart:

```
npm run dev
```

## How It Works

1. **Fridge Management**: Add items to your fridge with quantities
2. **Recipe Browsing**: Select recipes to see required ingredients
3. **Missing Ingredients**: The app shows what ingredients you're missing
4. **Grocery List**: Add missing ingredients to your grocery list
5. **Meal Planning**: Plan your meals for the week and generate a grocery list

## Data Storage

The application uses a SQLite database for storing fridge items:
- Fridge items are stored in a SQLite database (`data/fridge.sqlite`)
- Recipes are still stored in `recipes.json`

### Migration

If you're upgrading from a previous version that used JSON files, you can migrate your data:

```
npm run migrate
```

This will transfer data from the old `fridge.json` to the new SQLite database.

## License

MIT