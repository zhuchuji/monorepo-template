import { NodePlopAPI } from 'node-plop';
import fs from 'fs';
import path from 'path';

function getPackageTypes() {
  const dirs = fs.readdirSync(path.resolve(__dirname, '../templates'));
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
        message: 'please select package type',
        choices: types,
      },
      {
        type: 'input',
        name: 'packageName',
        message: 'please input the package name',
        // eslint-disable-next-line
        validate: (input) => /^[a-z0-9\-]+$/.test(input),
      },
    ],
    actions: [
      async (answer: any) => {
        fs.mkdirSync(`./packages/${answer.packageName}`);
        return '';
      },
      {
        type: 'addMany',
        base: '../templates/{{type}}',
        destination: '../packages/{{packageName}}',
        templateFiles: '../templates/{{type}}/**/*',
        verbose: true,
      },
    ],
  });
}

export default run;
