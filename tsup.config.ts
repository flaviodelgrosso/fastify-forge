import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  splitting: true,
  treeshake: true,
  bundle: false,
  outDir: './build',
  clean: true,
  minify: true,
  sourcemap: true,
});
