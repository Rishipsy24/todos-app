const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

// CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://todos-d50msx1kg-rishipsy24.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Todo API is running. Go to /api/health to check health.');
});

app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Todo API'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Todo API is running'
  });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;