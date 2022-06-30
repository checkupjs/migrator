import { join } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function migrate(baseDir: string, flags: any) {
  if (baseDir === '.') {
    baseDir = process.cwd();
  }

  try {
    const { run } = await import(
      fileURLToPath(new URL(join('migrations', flags.migration, 'index.js'), import.meta.url))
    );

    await run(baseDir);
  } catch (e) {
    process.exitCode = 1;
    process.stderr.write(
      `Could not location the ${flags.migration} migration. Please check if the migration exists, and your spelling of the migration's name when passed to --migration`
    );
  }
}
