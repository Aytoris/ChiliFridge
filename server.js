const express = require('express');
const path = require('path');

// Import database
const { syncDatabase } = require('./src/database');

// Import routes
const fridgeRoutes = require('./src/routes/fridgeRoutes');
const recipeRoutes = require('./src/routes/recipeRoutes');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));

// API Routes
app.use('/api/fridge', fridgeRoutes);
app.use('/api/recipes', recipeRoutes);

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Initialize database and start the server
async function startServer() {
  try {
    // Sync database models
    await syncDatabase();
    
    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
      console.log(`API endpoints available at:`);
      console.log(`- http://localhost:${PORT}/api/fridge`);
      console.log(`- http://localhost:${PORT}/api/recipes`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();