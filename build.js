const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.ts'], // Replace with your TypeScript entry file
  outfile: 'dist/index.js',      // Replace with your desired output file
  bundle: true,                  // Combine all dependencies into a single file
  platform: 'node',              // Target Node.js
  target: 'node16',              // Adjust Node.js version to your target
  sourcemap: false,               // Optional: Generate source maps
  external: ['node_modules'],// Optional: Exclude specific node_modules
  format: 'cjs',                 // CommonJS module format
  loader: { '.ts': 'ts' },       // Handle TypeScript files
}).catch(() => process.exit(1));
