import path from 'path';
import glob from 'glob';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import pkg from '../package.json';

const babelOpts = {
  babelrc: false,
  exclude: 'node_modules/**',
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/proposal-class-properties',
    ['babel-plugin-webpack-alias', { config: './config/webpack.babel.js' }],
  ],
};

const commonConfig = {
  external: [
    'react',
    'react-dom',
    ...Object.keys(pkg.dependencies),
  ],
};

export default glob.sync('./src/components/*/index.js').map(file => {
  const componentName = file.split(path.sep).slice(-2, -1)[0];
  const config = {
    input: file,
    output: {
      file: path.resolve(process.cwd(), `dist/components/${componentName}/index.js`),
      format: 'cjs',
      // banner: 'import \'./index.css\';',
    },
    plugins: [
      babel(babelOpts),
      json(),
      postcss({
        modules: {
          generateScopedName: 'politico_style___[hash:base64:10]',
        },
        extract: true,
      }),
      resolve({
        preferBuiltins: true,
        extensions: ['.js', '.jsx'],
        modulesOnly: true,
      }),
    ],
  };
  return {
    ...config,
    ...commonConfig,
  };
});
