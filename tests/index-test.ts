import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import { createBinTester } from '@scalvert/bin-tester';
import { fileURLToPath } from 'url';

describe('migrator', () => {
  const { setupProject, teardownProject, runBin } = createBinTester({
    binPath: fileURLToPath(new URL('../bin/index.mjs', import.meta.url)),
  });

  beforeEach(async () => {
    await setupProject();
  });

  afterEach(() => {
    teardownProject();
  });

  it('can output help', async () => {
    const result = await runBin('--help');

    expect(result.exitCode).toEqual(0);
    expect(result.stdout).toMatchInlineSnapshot(`
      "
        A migration tool for the Checkup framework

        Usage
          $ npx @checkup/migrator <working directory>

        Options
          --migration, -m  Specify a migration to run

        Examples
          $ npx @checkup/migrator . --migration foo
           ✔ Successfully completed foo migration
      "
    `);
  });

  it('outputs error when missing required --migration flag', async () => {
    const result = await runBin('.');

    expect(result.exitCode).toBeGreaterThan(0);
    expect(result.stderr).toMatchInlineSnapshot(`
      "Missing required flag
      	--migration, -m"
    `);
  });

  it('outputs error when unknown migration name specified with --migration', async () => {
    const result = await runBin('.', '--migration', 'foo');

    expect(result.exitCode).toBeGreaterThan(0);
    expect(result.stderr).toMatchInlineSnapshot('"Could not location the foo migration. Please check if the migration exists, and your spelling of the migration\'s name when passed to --migration"');
  });
});
