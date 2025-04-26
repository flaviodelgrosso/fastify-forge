import { exec } from 'node:child_process';
import { copyFile, readFile, rm, unlink, writeFile } from 'node:fs/promises';
import { join, posix } from 'node:path';
import { promisify } from 'node:util';

import { cancel, isCancel, text } from '@clack/prompts';

const execAsync = promisify(exec);
const execOptions = { stdio: 'ignore' };

export async function cloneRepo(name) {
  const repoUrl = 'https://github.com/flaviodelgrosso/fastify-forge.git';
  const cloneCommand = `git clone --depth=1 --branch=master ${repoUrl} ${name}`;
  await execAsync(cloneCommand, execOptions);
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

export async function initializeGit() {
  await execAsync('git init', execOptions);
  await execAsync('git add .', execOptions);
  await execAsync('git commit -m "✨ Initial commit"', execOptions);
}

export async function cleanUpRepo(projectDir) {
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
    rm(join(projectDir, '.git'), { recursive: true, force: true }),
    rm(join(projectDir, 'cli'), { recursive: true, force: true }),
    writeFile(packageJsonPath, `${newPackageJson}\n`),
  ]);
}

export async function prepareEnv(projectDir) {
  const envPath = join(projectDir, '.env.example');
  await copyFile(envPath, join(projectDir, '.env'));
}

async function getPackageJson(projectDir) {
  const packageJsonPath = join(projectDir, 'package.json');
  const packageJsonFile = await readFile(packageJsonPath, 'utf8');
  return JSON.parse(packageJsonFile);
}

export async function installDependencies() {
  await execAsync('pnpm install', execOptions);
}
