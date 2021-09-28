const colors = require('colors');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

// Initialization
dotenv.config({ path: './config/config.env' });

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS),
  max: parseInt(process.env.RATE_LIMIT_MAX),
});

// Route files
const alerts = require('./routes/alerts');
const auth = require('./routes/auth');
const feedbacks = require('./routes/feedbacks');
const me = require('./routes/me');
const password = require('./routes/password');
const search = require('./routes/search');
const tags = require('./routes/tags');
const info = require('./routes/info');

// Database
connectDB();

// App
const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
app.use(xss());
app.use(limiter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v1/alerts', alerts);
app.use('/api/v1/auth', auth);
app.use('/api/v1/feedbacks', feedbacks);
app.use('/api/v1/me', me);
app.use('/api/v1/password', password);
app.use('/api/v1/search', search);
app.use('/api/v1/tags', tags);
app.use('/api/v1/info', info);
app.use(errorHandler);

// Server
const port = process.env.PORT;
const host = process.env.HOST;
app.listen(
  port,
  host,
  console.log(
    `Server running in ${process.env.NODE_ENV} on http://${host}:${port}`.green
  )
);

// Cron jobs
const sendAlerts = require('./jobs/sendAlerts');
cron.schedule('0 0 * * *', sendAlerts(host, port));

// Unhandled errors
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error: ${error.message}`.red);
});
