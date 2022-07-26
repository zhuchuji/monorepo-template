const path = require('path');

const baseDir = process.cwd();

const outputDir = path.resolve(baseDir, 'dist');

function getExternalsFromPeerDeps() {
  const packageJson = require(path.resolve(baseDir, 'package.json'));
  const peerDeps = packageJson.peerDependencies || {};
  const externals = {};
  for (const dep of Object.keys(peerDeps)) {
    externals[dep] = dep;
  }
  return externals;
}

const config = {
  mode: 'production',
  entry: {
    index: path.resolve(baseDir, 'src/index.ts'),
  },
  output: {
    filename: 'index.js',
    path: outputDir,
    clean: true,
    library: {
      type: 'commonjs2',
    }
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  externals: getExternalsFromPeerDeps(),  
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ["@babel/preset-env"],
                ["@babel/preset-react"]
              ],
              plugins: []
            }
          },
          {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
              compilerOptions: {
                baseDir,
                outDir: outputDir,
              },
            }
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [],
}

module.exports = config;
