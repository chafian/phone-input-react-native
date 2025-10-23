import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-native', 'react-native-svg'],
  treeshake: true,
  splitting: false,
  minify: false,
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});

