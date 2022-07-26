import { NodePlopAPI } from 'node-plop';
import fs from 'fs';
import path from 'path';

const BASE_DIR = path.resolve(__dirname, '../../');

const TEMPLATE_DIR = path.resolve(BASE_DIR, 'templates');

interface PackageInfo {
  type: string;
  packageName: string;
  packageFullName: string;
}

function getPackageTypes() {
  const dirs = fs.readdirSync(TEMPLATE_DIR);
  return dirs;
}

function run(plop: NodePlopAPI) {
  const types = getPackageTypes();
  plop.setGenerator('create', {
    description: 'create new package',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'select package type',
        choices: types,
      },
      {
        type: 'input',
        name: 'packageName',
        message: 'input the package name(only alphabetic & dash - allowed)',
        validate: (input: string) => /^[a-z0-9\-]+$/.test(input)
      },
    ],
    actions: [
      async (answer) => {
        const packageInfo = answer as PackageInfo;
        packageInfo.packageFullName = `@monorepo/${packageInfo.packageName}`;
        fs.mkdirSync(`./packages/${packageInfo.packageName}`);
        return 'success';
      },
      {
        type: 'addMany',
        base: `${TEMPLATE_DIR}/{{type}}`,
        destination: `${BASE_DIR}/packages/{{packageName}}/`,
        templateFiles: `${TEMPLATE_DIR}/{{type}}/**/*`,
      },
    ],
  });
}

export default run;
