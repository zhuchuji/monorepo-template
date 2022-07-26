import nodePlop from 'node-plop';
import path from 'path';
import chalk from 'chalk';

const managePath = require('./manage-path');
const plop = nodePlop(path.resolve(__dirname, './config.ts'));

const generator = plop.getGenerator('create');

async function run() {
  const answer = await generator.runPrompts();
  const { failures } = await generator.runActions(answer);
  if (failures.length > 0) {
    for (const { error } of failures) {
      console.error(chalk.red(error));
    }
    process.exit(1);
  } else {
    managePath();
  }
}

run();
