const express = require('express');
require('querystring');
const asyncHandler = require('express-async-handler');
const serp = require('serp');
const options = require('./options');

require('dotenv').config();

(async () => {
  const app = express();
  const port = 3000;
  let proxyList;
  try {
    proxyList = await options.loadProxies(process.env.PROXY_FILE);
  } catch (e) {
    console.log(e);
    console.log(`[x] Error when loading proxies :\n ${e.message}\n`);
  }
  app.listen(port, () => {
    console.log(`Google Search app listening at http://localhost:${port}`);
  });

  app.get('/search', asyncHandler(async (req, res, next) => {
    try {
      const o = options.buildOptions(req, proxyList);
      console.log(`get search : ${req.query.keyword}`);
      console.log('With options : ');
      console.log(o);
      const links = await serp.search(o);
      return res.send(links);
    } catch (e) {
      return next(e);
    }
  }));
})();
