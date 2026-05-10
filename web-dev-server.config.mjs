import { esbuildPlugin } from '@web/dev-server-esbuild';

/** @type {import('@web/dev-server').DevServerConfig} */
export default {
  nodeResolve: true,
  open: '/demo/',
  watch: true,
  appIndex: 'demo/index.html',
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'auto',
      tsconfig: './tsconfig.json',
    }),
  ],
};
