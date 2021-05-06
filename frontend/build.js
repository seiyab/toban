let result = require('esbuild').buildSync({
  entryPoints: ['src/app.ts'],
  bundle: true,
  minify: false,
  sourcemap:true,
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
  },
  // target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  target: ['firefox57'],
  outdir: 'out',
})

