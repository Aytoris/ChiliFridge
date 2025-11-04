# Always-Have Items Feature

## Overview
A new interface has been added to manage "always-have" items - ingredients that you always keep in stock and therefore should not appear in grocery lists.

## What Was Added

### 1. New Interface Section
- Added a 5th section to the app (after Calendar, Grocery, Fridge, and Cook a Meal)
- Located after the "Cook a Meal" interface
- Orange-themed interface to distinguish it from other sections

### 2. Features
- **Add Items**: Uses the same autocomplete functionality as the inventory interface
- **Item List**: Displays all always-have items alphabetically
- **Delete Items**: Individual delete buttons for each item
- **Clear All**: Button to clear the entire list
- **Auto-sync**: Updates recipe availability and missing ingredients in real-time

### 3. Integration with Existing Features

#### Grocery List
- Always-have items will NOT appear in grocery lists when generating from meal plans
- Even if a recipe requires these items, they won't be added to the shopping list

#### Missing Ingredients
- Always-have items are considered to be always available in unlimited quantities
- They won't appear in the "Missing Ingredients" list when selecting a recipe
- Recipes are marked as available even if they require always-have items

#### Recipe Availability
- Recipes requiring always-have items are marked as available (green in the dropdown)
- The system assumes you always have these ingredients in stock

#### Cooking
- When cooking a meal, always-have items are NOT removed from the fridge
- Only regular inventory items are deducted

### 4. Data Persistence
- Always-have items are stored in localStorage under the key `alwaysHaveItems`
- Included in data export/import functionality for device transfers
- Automatically backed up with the rest of your ChiliFridge data

## Files Modified

### New Files
- `/src/public/js/alwaysHave.js` - Main module for always-have functionality

### Modified Files
- `/src/public/index.html` - Added HTML structure and module initialization
- `/src/public/css/styles.css` - Added styling for the new section
- `/src/public/js/meal.js` - Updated to consider always-have items
- `/src/public/js/api.js` - Updated data export/import to include always-have items

## Usage

### Adding Always-Have Items
1. Navigate to the "Always-Have Items" section (bottom of the page)
2. Start typing an ingredient name in the input field
3. Select from autocomplete suggestions or type a new item
4. Click "Add" button

### Common Use Cases
Examples of items you might add to always-have:
- Salt
- Pepper
- Olive oil
- Water
- Common spices
- Sugar
- Flour
- Butter (if you always restock)

### Removing Items
- Click the × button next to any item to remove it
- Click "Clear All" to remove all items at once

## Technical Details

### Module Structure
```javascript
const AlwaysHaveModule = {
  init(),
  isAlwaysHave(ingredientName),
  getAlwaysHaveItems(),
  displayAlwaysHaveList()
}
```

### Events
- Dispatches `alwaysHaveUpdated` event when the list changes
- Listens to `recipeDataLoaded` to populate autocomplete

### Storage Format
```json
[
  {
    "name": "Salt",
    "id": "1699123456789abc"
  },
  {
    "name": "Olive oil",
    "id": "1699123456790def"
  }
]
```

## Benefits
1. **Cleaner Grocery Lists**: No need to see basic staples you always have
2. **Accurate Planning**: Better representation of what you actually need to buy
3. **Flexible Management**: Easy to add/remove items as your habits change
4. **No Fridge Clutter**: Don't need to track unlimited items in your inventory
