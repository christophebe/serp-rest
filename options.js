const pLoader = require('simple-proxies/lib/proxyfileloader');

const loadProxies = async (file) => {
  if (!file) {
    console.warn('No proxy file. Take care !');
    return null;
  }
  try {
    console.log('Loading proxies ...');
    const config = pLoader.config()
      .setProxyFile(file)
      .setCheckProxies(true)
      .setRemoveInvalidProxies(true);

    const proxyList = await pLoader.loadProxyFile(config);
    console.log(`Proxies loaded : ${proxyList.getNumberOfProxies()}`);
    return proxyList.getNumberOfProxies() === 0 ? null : proxyList;
  } catch (error) {
    console.error(`Error when loading the proxies :${error.message}`);
    return null;
  }
};

const buildOptions = (req, proxyLoader) => {
  const options = {
    qs: {
      q: req.query.keyword,
      pws: 0,

    },
    proxyLoader,
  };

  if (req.query.host) {
    options.host = req.query.host;
  }

  if (req.query.num) {
    options.num = req.query.num;
  }

  if (req.query.lr) {
    options.qs.lr = req.query.lr;
  }

  if (req.query.cr) {
    options.qs.lr = req.query.cr;
  }

  return options;
};

module.exports = { buildOptions, loadProxies };
