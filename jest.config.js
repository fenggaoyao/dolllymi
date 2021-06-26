module.exports = {
    setupFilesAfterEnv: ['./scripts/setupJestEnv.ts'],
    "testMatch": ["**/__tests__/**/*.[jt]s?(x)"],
    "moduleFileExtensions": [
        "ts",
        "js",
        "json",
        // 告诉 Jest 处理 `*.vue` 文件
        "vue",
        "node",
        'tsx',
        'jsx'
    ],
    globals: {
        __DEV__: true,
        __TEST__: true,
        __VERSION__: require('./package.json').version,
        __BROWSER__: false,
        __GLOBAL__: false,
        __ESM_BUNDLER__: true,
        __ESM_BROWSER__: false,
        __NODE_JS__: true,
        __FEATURE_OPTIONS_API__: true,
        __FEATURE_SUSPENSE__: true,
        __FEATURE_PROD_DEVTOOLS__: false,
        __COMPAT__: true
    },
    "transform": {
        // 用 `vue-jest` 处理 `*.vue` 文件
        ".*\\.(vue)$": "vue-jest",
        '^.+\\.(t|j)sx?$': [
            'babel-jest', {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                node: true,
                            },
                        },
                    ],
                    '@babel/preset-typescript',
                ],
                plugins: [
                    '@vue/babel-plugin-jsx',
                    '@babel/plugin-proposal-class-properties',
                    'babel-plugin-const-enum'
                ],
            },
        ],

    },
    "moduleNameMapper": {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"

    }
}