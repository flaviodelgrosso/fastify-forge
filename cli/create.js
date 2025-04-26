import { join } from 'node:path';

import { intro, log, outro, spinner } from '@clack/prompts';
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

    s.message('Moving into repository...');
    process.chdir(projectDir);

    s.message('Cleaning up repository...');
    await cleanUpRepo(projectDir);

    s.message('Prepare environment...');
    await prepareEnv(projectDir);

    if (!options.disableGit) {
      s.message('Initializing Git repository...');
      await initializeGit();
    }

    s.message('Installing dependencies...');
    await installDependencies();

    s.stop('Done!');

    outro('Your project is ready! You can now run pnpm dev to start the development server.');
  } catch (error) {
    const message =
      error instanceof Error ? error.message : `Failed to initialize project: ${error}`;

    log.error(message);
    process.exit(1);
  }
}
