const fs = require('fs');
const path = require('path');

/**
 * Read a JSON file
 * @param {string} filePath - Path to the JSON file
 * @returns {Promise<Object>} - Parsed JSON data
 */
function readJsonFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      
      try {
        // Remove BOM if present and safely parse JSON
        const jsonData = safelyParseJson(data);
        resolve(jsonData);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

/**
 * Safely parse JSON data, handling BOM and other issues
 * @param {string} jsonString - The JSON string to parse
 * @returns {Object} - Parsed JSON data
 */
function safelyParseJson(jsonString) {
  if (!jsonString) {
    throw new Error('Empty JSON string');
  }
  
  try {
    // First try direct parsing
    return JSON.parse(jsonString);
  } catch (error) {
    // Try removing BOM (Byte Order Mark) if present
    if (jsonString.charCodeAt(0) === 0xFEFF) {
      console.log('Removing BOM from JSON string');
      const cleanJsonString = jsonString.slice(1);
      return JSON.parse(cleanJsonString);
    }
    
    // Try removing any invisible characters at the beginning
    const cleanJsonString = jsonString.replace(/^\s+/, '');
    if (cleanJsonString !== jsonString) {
      console.log('Removed whitespace at the beginning of JSON string');
      return JSON.parse(cleanJsonString);
    }
    
    // If nothing helped, log more details about the string
    const firstFewChars = jsonString.substring(0, 20);
    const charCodes = Array.from(firstFewChars).map(c => c.charCodeAt(0));
    console.error('JSON parsing error. First few characters:', firstFewChars);
    console.error('Character codes:', charCodes);
    
    throw error;
  }
}

/**
 * Write data to a JSON file
 * @param {string} filePath - Path to the JSON file
 * @param {Object} data - Data to write
 * @returns {Promise<void>}
 */
function writeJsonFile(filePath, data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(filePath, jsonData, 'utf8', (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

/**
 * Ensure a directory exists
 * @param {string} dirPath - Directory path
 * @returns {Promise<void>}
 */
function ensureDirectoryExists(dirPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err && err.code !== 'EEXIST') {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = {
  readJsonFile,
  writeJsonFile,
  ensureDirectoryExists,
  safelyParseJson
}; 