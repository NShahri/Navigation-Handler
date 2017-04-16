/* global require*/

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

let pkg = require('./package.json');

export default {
    entry: 'src/index.js',
    external: Object.keys(pkg.dependencies || {}),
    globals: {
        'react-router-dom': 'ReactRouterDOM',
        'react': 'React',
        'prop-types': 'PropTypes'
    },
    plugins: [
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            runtimeHelpers: true,
            presets: [
              [ 'es2015', { modules: false } ],
              [ 'react' ],
              [ 'stage-0' ],
              [ 'flow' ]
            ],
            plugins: [
                'external-helpers'
            ]
        }),
        commonjs(),
        nodeResolve({
            module: true,
            jsnext: true,
            main: true,
            preferBuiltins: false
        })
    ],
    targets: [
        {
            dest: pkg['module'],
            format: 'es',
            moduleName: pkg.name,
            sourceMap: true
        },
        {
            dest: pkg['main'],
            format: 'umd',
            moduleName: 'RouterHandler',
            sourceMap: true
        }
    ]
};
