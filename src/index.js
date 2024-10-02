const configs = require('./configs');
global.configs = configs;
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { xss } = require('express-xss-sanitizer');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes');
const dbConfig = require('./core/database');
const RequestResponse = require('./responses');
const swaggerSpecs = require('./apiDocs/swaggerConfig');

async function start() {
  const app = express();
  // Add helmet middleware to secure app
  app.use(helmet());

  // Enable CORS
  app.use(cors());

  // Rate limiting middleware
  const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10, // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);

  // parse application/json
  app.use(express.json());

  // Apply the XSS sanitizer middleware globally
  app.use(xss());

  await dbConfig.start();

  // Bind Response Method
  app.all('*', function (req, res, next) {
    RequestResponse.forEach((item) => {
      const { name, func } = item;
      res[name] = func.bind({
        req,
        res,
      });
    });
    return next();
  });

  // Swagger setup
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

  app.use('/api', router);

  const PORT = configs.runtime.port;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
});
