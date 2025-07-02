/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000'
    ],
    credentials: true
}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/countries', require('./routes/countries'));

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Foodie Book API is running!',
    endpoints: {
      recipes: '/api/recipes',
      auth: '/api/auth',
      countries: '/api/countries'
    },
    documentation: 'Add your API docs link here if available'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;    */




/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer'); // For handling file uploads
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000'
    ],
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/countries', require('./routes/countries'));

// Add recipe endpoint (keeping your existing structure)
app.post('/api/recipes/add', upload.single('image'), async (req, res) => {
    try {
        const { title, ingredients, instructions, country } = req.body;
        
        const newRecipe = {
            title,
            ingredients: JSON.parse(ingredients), // Assuming ingredients is sent as JSON string
            instructions,
            country,
            image: req.file ? req.file.filename : null,
            createdAt: new Date()
        };

        // Save to database (assuming you have a Recipe model)
        const recipe = await Recipe.create(newRecipe);
        
        res.status(201).json({
            status: 'success',
            data: {
                recipe
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
});

// Root route (unchanged)
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Foodie Book API is running!',
    endpoints: {
      recipes: '/api/recipes',
      auth: '/api/auth',
      countries: '/api/countries',
      addRecipe: 'POST /api/recipes/add' // Add the new endpoint to docs
    },
    documentation: 'Add your API docs link here if available'
  });
});

// Error handling middleware (unchanged)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler (unchanged)
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;  */






const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000'
    ],
    credentials: true
}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/countries', require('./routes/countries'));

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Foodie Book API is running!',
    endpoints: {
      recipes: '/api/recipes',
      auth: '/api/auth',
      countries: '/api/countries'
    },
    documentation: 'Add your API docs link here if available'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
