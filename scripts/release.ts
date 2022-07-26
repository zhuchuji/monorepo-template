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
        reject(new Error(`command fail: ${command}`));
      }
    });
  });
}

async function release() {
  const { stdout } = await asyncExec('git rev-parse --abbrev-ref HEAD');
  const branchName = stdout.toString().trim();
  const pushCmdLine = `git push origin ${branchName}`;
  await execCmd(pushCmdLine);
  const isTrunk = branchName === 'master' || branchName === 'develop';
  const distTag = isTrunk ? 'latest' : 'next';
  const log = chalk.green(`release on branch: ${branchName}, dist-tag: ${distTag}`);
  console.log(log);
  const publishCmdLine = isTrunk ? 'lerna publish' : `lerna publish prerelease --preid beta --dist-tag ${distTag}`;
  await execCmd(publishCmdLine);
  console.log(log);
}

release();
