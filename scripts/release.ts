import util from 'util';
import chalk from 'chalk';
import { exec, spawn } from 'child_process';

const asyncExec = util.promisify(exec);

function execCmd(command: string) {
  const log = chalk.blue(command);
  console.log(log);
  return new Promise((resolve, reject) => {
    const process = spawn(command, [], { stdio: 'inherit', shell: true });
    process.on('exit', (code) => {
      if (code === 0) {
        resolve('success');
      } else {
        reject(`command fail: ${command}`);
      }
    });
  });
}

async function release() {
  const { stdout: branchStd } = await asyncExec('git rev-parse --abbrev-ref HEAD');
  const branchName = branchStd.toString().trim();
  const pushCmdLine = `git push origin ${branchName}`;
  await execCmd(pushCmdLine);
  const isTrunk = branchName === 'develop';
  const distTag = isTrunk ? 'latest' : branchName.replace(/[^a-zA-Z0-9]+/g, '_');
  const log = chalk.green(`release on branch: ${branchName}, dist-tag: ${distTag}`);
  console.log(log);
  const publishCmdLine = isTrunk
    ? 'lerna publish'
    : `lerna publish prerelease --dist-tag ${distTag}`;
  await execCmd(publishCmdLine);
  console.log(log);
}

release();
