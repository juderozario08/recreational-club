require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/userRoutes');
const sessionRouter = require('./routes/sessionRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const authRoutes = require('./routes/userAuthRoute');
const signUpRoutes = require('./routes/userSignUpRoute');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());
app.use(userRouter);
app.use(sessionRouter);
app.use(paymentRouter);
app.use(authRoutes);
app.use(signUpRoutes);


const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(process.env.PORT, '0.0.0.0', () => console.log(`Server running on port ${process.env.PORT}`));
