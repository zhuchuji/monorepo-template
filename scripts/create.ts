import nodePlop from 'node-plop';
import path from 'path';
import chalk from 'chalk';

const plop = nodePlop(path.resolve(__dirname, 'config.ts'));

const generator = plop.getGenerator('create');

async function run() {
  const answer = await generator.runPrompts();
  console.log(answer);
  const { failures } = await generator.runActions(answer);
  if (failures.length > 0) {
    console.log(chalk.red(failures));
  }
}

run();
