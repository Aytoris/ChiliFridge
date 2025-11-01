# ChiliFridge Data Transfer Guide

## Overview

ChiliFridge now includes a complete data transfer system that allows you to seamlessly move all your app data between devices. This feature enables you to:

- **Backup your data** for safekeeping
- **Transfer to a new device** (phone, tablet, or computer)
- **Sync between devices** manually
- **Restore data** if you clear your browser cache

## What Data is Transferred?

The transfer system includes **all** of your ChiliFridge data:

### 📦 Complete State Transfer
- ✅ **Fridge Inventory** - All items with quantities, units, and categories
- ✅ **Grocery List** - All grocery items with categories and quantities
- ✅ **Meal Planner** - All 7 days of planned meals with people counts
- ✅ **Custom Recipes** - Any recipes you've added
- ✅ **Fridge Categories** - Your custom storage location categories
- ✅ **Store Sections** - Your customized grocery store layout
- ✅ **Fridge History** - Ingredient usage history for smart categorization

## How to Transfer Data

### 📥 Download Your Data (Export)

1. **Locate the Transfer Section**
   - Scroll to the bottom of the **Fridge** section
   - Look for "Transfer Data" heading

2. **Click "📥 Download All Data"**
   - A JSON file will automatically download
   - File name format: `chilifridge-backup-YYYY-MM-DD.json`
   - Save this file somewhere safe (Downloads folder, cloud storage, etc.)

3. **Success!**
   - You'll see a green notification: "Data downloaded successfully!"

### 📤 Upload Data to Another Device (Import)

1. **Transfer the File**
   - Send the JSON file to your other device via:
     - Email attachment
     - Cloud storage (Google Drive, Dropbox, iCloud)
     - USB transfer
     - AirDrop (iOS/Mac)
     - Any file sharing method

2. **Open ChiliFridge on the New Device**
   - Navigate to the Transfer Data section

3. **Click "📤 Upload Data"**
   - A file picker will open
   - Select your `chilifridge-backup-*.json` file

4. **Import Complete**
   - You'll see "Importing data..." notification
   - Followed by "Data imported successfully. Refreshing page..."
   - The page will automatically refresh
   - **All your data is now on the new device!**

## Use Cases

### 🔄 Moving from Phone to Tablet
1. Download data on your phone
2. Share file via email or cloud
3. Upload on your tablet
4. Both devices now have identical data

### 💾 Creating a Backup
1. Download data regularly (weekly/monthly)
2. Store backup files in cloud storage
3. Keep multiple versions if desired

### 🔧 After Browser Cache Clear
1. If you accidentally clear browser data
2. Upload your most recent backup file
3. Restore all your data instantly

### 📱 Syncing Between Devices
Since the app works offline, you can:
1. Use Device A, download data
2. Upload to Device B
3. Make changes on Device B
4. Download from Device B
5. Upload back to Device A

## Technical Details

### File Format
- **Format**: JSON (JavaScript Object Notation)
- **Human-readable**: Yes, you can open and view the file in a text editor
- **Size**: Typically 10-100 KB (very small)
- **Version**: Files include version number for future compatibility

### File Structure
```json
{
  "version": "1.0",
  "exportDate": "2025-11-01T12:34:56.789Z",
  "data": {
    "fridge": "...",
    "calendarData": "...",
    "groceryList": "...",
    "fridgeCategories": "...",
    "customRecipes": "...",
    "storeSections": "...",
    "fridgeHistory": "..."
  }
}
```

### Data Storage
- All data is stored in browser's **localStorage**
- No server involved - completely client-side
- Privacy: Your data never leaves your device except when you manually export it

## Best Practices

### ✅ Recommended
- Download a backup before clearing browser cache
- Create monthly backups for peace of mind
- Use cloud storage to keep backups accessible
- Name your files descriptively if managing multiple backups

### ⚠️ Important Notes
- **The upload will REPLACE all current data** on the device
- Make sure to download current data before uploading if you want to keep it
- The file is specific to ChiliFridge - don't edit it manually unless you know what you're doing

## Troubleshooting

### "Invalid file format" error
- Make sure you're uploading a ChiliFridge backup file (`.json`)
- File may be corrupted - try downloading again from source device

### Download not working
- Check your browser's download settings
- Ensure you have enough storage space
- Try a different browser if issue persists

### Data not appearing after upload
- The page should refresh automatically
- If not, manually refresh the page (F5 or pull-to-refresh)
- Check that you uploaded the correct file

### File too large to email
- ChiliFridge files are usually very small (< 100 KB)
- If email rejects it, use cloud storage instead
- Google Drive, Dropbox, or OneDrive work great

## Security & Privacy

- ✅ **No account required** - Your data is yours
- ✅ **No cloud sync** - You control where your data goes
- ✅ **No tracking** - We don't know when you export/import
- ✅ **Local first** - Everything stays on your device unless you export

## Future Enhancements

Potential features being considered:
- Automatic cloud sync (optional)
- QR code transfer for quick device-to-device sync
- Selective export (choose what to include)
- Merge capabilities (combine data from multiple devices)

## Questions?

The data transfer feature is designed to be simple and reliable. If you encounter any issues or have suggestions for improvements, feel free to create an issue on the GitHub repository!

---

**Last Updated**: November 2025
**Version**: 1.0
