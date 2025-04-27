import { join } from 'node:path';

import { confirm, intro, log, outro, spinner } from '@clack/prompts';
import {
  cleanUpRepo,
  cloneRepo,
  getName,
  initializeGit,
  installDependencies,
  prepareEnv,
} from './utils.js';

export async function create(options) {
  try {
    intro('Welcome to Fastify Forge!');

    const cwd = process.cwd();
    const name = options.name || (await getName());

    const s = spinner();
    const projectDir = join(cwd, name);

    s.start('Cloning fastify-forge...');
    await cloneRepo(name);
    s.stop('Clone complete!');

    process.chdir(projectDir);

    s.start('Cleaning up repository...');
    await cleanUpRepo(projectDir);
    s.stop('Cleanup complete!');

    s.start('Prepare environment...');
    await prepareEnv(projectDir);
    s.stop('Environment prepared!');

    if (!options.disableGit) {
      s.start('Initializing Git repository...');
      await initializeGit();
      s.stop('Git initialized!');
    }

    // ask if user wants to install dependencies
    const install = await confirm({
      message: 'Do you want to install dependencies?',
      initialValue: true,
    });

    if (!install) {
      log.info('Skipping dependency installation.');
    }

    if (install) {
      s.start('Installing dependencies, please wait...');
      await installDependencies();
      s.stop('Dependencies installed!');
    }

    outro('Your project is ready! You can now run pnpm dev to start the development server.');
  } catch (error) {
    const message =
      error instanceof Error ? error.message : `Failed to initialize project: ${error}`;

    log.error(message);
    process.exit(1);
  }
}
