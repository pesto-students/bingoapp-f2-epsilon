const path = require('path');
const gateway = require('express-gateway');

gateway()
  .load(path.join(__dirname, 'config'))
  .run();

  const PORT = process.env.PORT || 8080
  const ADMIN_PORT = process.env.ADMIN_PORT || 6456