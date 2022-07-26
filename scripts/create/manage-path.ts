const path = require('path');
const fs = require('fs');

const BASE_DIR = path.resolve(__dirname, '../../');

const PACKAGES_DIR = path.resolve(BASE_DIR, 'packages');

function managePaths() {
  const packages = fs.readdirSync(PACKAGES_DIR);
  const paths: { [key: string]: string[] } = {};
  for (let i = 0; i < packages.length; i += 1) {
    const packageName = packages[i];
    paths[`@monorepo/${packageName}`] = [`./packages/${packageName}/src`, `../../packages/${packageName}/src`];
  }
  const tsconfigJson = require(path.resolve(BASE_DIR, 'tsconfig.paths.json'));
  tsconfigJson.compilerOptions.paths = paths;
  fs.writeFileSync(path.resolve(BASE_DIR, 'tsconfig.paths.json'), JSON.stringify(tsconfigJson));
}

module.exports = managePaths;
