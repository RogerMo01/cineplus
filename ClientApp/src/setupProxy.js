const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:26853';

const context = [
  "/weatherforecast",
  "/api/form",
  "/api/movie",
  "/api/room",
  "/api/movieprogramming",
  "/api/authentication",
  "/api/registration",
  'api/moviesactors',
  '/api/actor',
  '/api/genre',
  '/api/discount',
  '/api/seats',
  '/api/sales',
  '/api/criterion',
  '/api/activecriterion',
  '/api/availableprogramming',
  '/api/shoppinghistory',
  '/api/receipt',
  '/api/poster',
  '/api/like'
];

const onError = (err, req, resp, target) => {
  console.error(`${err.message}`);
}

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    proxyTimeout: 10000,
    target: target,
    // Handle errors to prevent the proxy middleware from crashing when
    // the ASP NET Core webserver is unavailable
    onError: onError,
    secure: false,
    // Uncomment this line to add support for proxying websockets
    //ws: true, 
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};
