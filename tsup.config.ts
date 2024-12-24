import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  splitting: false,
  bundle: true,
  outDir: './build',
  clean: true,
  minify: true,
  sourcemap: true,
});
