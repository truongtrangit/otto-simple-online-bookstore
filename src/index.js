const configs = require('./configs');
global.configs = configs;
const express = require('express');
const helmet = require('helmet');
const router = require('./routes');
const dbConfig = require('./core/database');
const RequestResponse = require('./responses');
const _ = require('lodash');

async function boot() {
  const app = express();
  // Add helmet middleware to secure app
  app.use(helmet());
  // parse application/json
  app.use(express.json());

  await dbConfig.start();

  // Bind Response Method
  app.all('*', function (req, res, next) {
    _.forEach(RequestResponse, function (val) {
      const { name, func } = val;
      res[name] = func.bind({
        req: req,
        res: res,
      });
    });

    return next();
  });

  app.use('/api', router);

  const PORT = configs.runtime.port;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

boot();
