#!/usr/bin/env node

// const { renameSync, rmSync } = require('fs-extra');
// const { success, warning, error } = require('log-symbols');
import meow from 'meow';
import { migrate } from '../dist/migrator.js';

const cli = meow(
  `
	Usage
	  $ npx @checkup/migrator <working directory>

	Options
	  --migration, -m  Specify a migration to run

	Examples
	  $ npx @checkup/migrator . --migration foo
    ✔ Successfully completed foo migration
`,
  {
    importMeta: import.meta,
    flags: {
      migration: {
        type: 'string',
        alias: 'm',
        isRequired: true,
      },
    },
  }
);

migrate(cli.input[0], cli.flags);
