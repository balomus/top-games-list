const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://top-games-list.fly.dev/',
      // target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};