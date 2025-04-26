import { exec } from 'node:child_process';
import { readFile, rm, unlink, writeFile } from 'node:fs/promises';
import { join, posix } from 'node:path';
import { promisify } from 'node:util';

import { cancel, isCancel, select, text } from '@clack/prompts';

const execAsync = promisify(exec);

export const supportedPackageManagers = ['npm', 'yarn', 'pnpm', 'bun'];

export async function cloneRepo(name) {
  const repoUrl = 'https://github.com/flaviodelgrosso/fastify-forge.git';
  const cloneCommand = `git clone --depth=1 --branch=master ${repoUrl} ${name}`;
  const opts = { stdio: 'ignore' };
  await execAsync(cloneCommand, opts);
}

export async function getName() {
  const value = await text({
    message: 'What is your project name?',
    placeholder: 'my-app',
    validate(value) {
      if (value.length === 0) {
        return 'Please enter a project name.';
      }
    },
  });

  if (isCancel(value)) {
    cancel('Cancelled.');
    process.exit(0);
  }

  return value.toString();
}

export async function getPackageManager() {
  const value = await select({
    initialValue: 'pnpm',
    message: 'Which package manager would you like to use?',
    options: supportedPackageManagers.map((choice) => ({
      value: choice,
      label: choice,
    })),
  });

  if (isCancel(value)) {
    cancel('Cancelled.');
    process.exit(0);
  }

  return value.toString();
}

export async function initializeGit() {
  const opts = { stdio: 'ignore' };
  await execAsync('git init', opts);
  await execAsync('git add .', opts);
  await execAsync('git commit -m "✨ Initial commit"', opts);
}

export async function cleanUpRepo(projectDir) {
  await rm(join(projectDir, '.git'), { recursive: true, force: true });

  const packageJson = await getPackageJson(projectDir);
  packageJson.name = projectDir.split(posix.sep).pop();
  packageJson.bin = undefined;
  packageJson.author = undefined;
  packageJson.license = undefined;
  packageJson.description = undefined;
  packageJson.homepage = undefined;
  packageJson.version = '0.1.0';
  packageJson.dependencies = {
    ...packageJson.dependencies,
    '@clack/prompts': undefined,
    commander: undefined,
  };

  const newPackageJson = JSON.stringify(packageJson, null, 2);
  const packageJsonPath = join(projectDir, 'package.json');

  await Promise.all([
    unlink(join(projectDir, 'LICENSE')),
    unlink(join(projectDir, 'README.md')),
    unlink(join(projectDir, 'CHANGELOG.md')),
    rm(join(projectDir, 'cli'), { recursive: true, force: true }),
    writeFile(packageJsonPath, `${newPackageJson}\n`),
  ]);
}

async function getPackageJson(projectDir) {
  const packageJsonPath = join(projectDir, 'package.json');
  const packageJsonFile = await readFile(packageJsonPath, 'utf8');
  return JSON.parse(packageJsonFile);
}

export async function installDependencies() {
  await execAsync('pnpm install', { stdio: 'ignore' });
}
