const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
  stories: ['../packages/**/*.stories.mdx', '../packages/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  // webpackFinal: async (config, { configType }) => {
  //   config.module.rules.push({
  //     test: /\.less$/,
  //     use: [
  //       'style-loader',
  //       {
  //         loader: 'css-loader',
  //         // due to storybook's issue, options is required, otherwise className & styles will not be added
  //         options: {
  //           modules: {
  //             localIdentName: '[local]__[hash:base64:5]'
  //           }
  //         }
  //       },
  //       'less-loader'
  //     ],
  //     include: path.resolve(__dirname, '../')
  //   });

  //   config.resolve.plugins = [
  //     ...(config.resolve.plugins || []),
  //     new TsconfigPathsPlugin({
  //       extensions: config.resolve.extensions
  //     })
  //   ];

  //   return config;
  // }
};
