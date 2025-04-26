#!/usr/bin/env node

import { program } from 'commander';
import { create } from './create.js';

program
  .description('Create a new fastify-forge project')
  .option('--name <name>', 'Name of the project')
  .option('--no-git', 'Disable git initialization')
  .action(create);

program.parse(process.argv);
