const TSPathsPlugin = require('tsconfig-paths-webpack-plugin');

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `@babel/plugin-proposal-decorators`,
    options: { legacy: true },
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TSPathsPlugin({ configFile: '../tsconfig.json' })],
    },
  });
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /trtc-js-sdk/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
