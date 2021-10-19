import { createPlugin } from 'docz-core';
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxyConfigs = [
  {
    path: '/live/api',
    target: 'http://liveapi.uae.shensz.local',
  },
  {
    path: '/courseliveapi',
    target: 'http://courseliveapi.uae.shensz.local',
  },
];

const proxyPlugin = () =>
  createPlugin({
    onCreateDevServer({ app }) {
      proxyConfigs.forEach((config) => {
        app.use(
          config.path,
          createProxyMiddleware({
            target: config.target,
            changeOrigin: true,
            onProxyReq: config.onProxyReq,
          }),
        );
      });
    },
  });

export default {
  typescript: true,
  port: 9006,
  dest: 'public',
  base: 'live-modules',
  themeConfig: {
    showPlaygroundEditor: false,
  },
  plugins: [proxyPlugin()],
};
