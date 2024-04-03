require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes
const sessionRouter = require('./routes/sessionRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const authRoutes = require('./routes/userAuthRoute');
const signUpRoutes = require('./routes/userSignUpRoute');
const userRouter = require('./routes/userRoutes'); // Ensure this is correctly defined
const classRouter = require('./routes/classRoutes')

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());

// Using routes
app.use(userRouter);
app.use(sessionRouter);
app.use(paymentRouter);
app.use(authRoutes);
app.use(signUpRoutes);

const uri = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected successfully to MongoDB Atlas');

  // Start the Express server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})
.catch((error) => {
  console.error('Could not connect to MongoDB Atlas:', error);
  process.exit(1); // Exit the process with an error code (1) if we can't connect to MongoDB
});

// Optional: Handle graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('MongoDB connection closed.');
  process.exit(0);
});
