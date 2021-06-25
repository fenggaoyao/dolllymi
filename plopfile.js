module.exports = plop => {
    plop.setGenerator('component', {
        description: 'create a custom component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'component name',
            default: 'MyComponent'
        }],
        actions: [{
                type: 'add',
                path: 'packages/{{lowerCase name}}/src/index.vue',
                templateFile: 'plop-template/component/src/component.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{lowerCase name}}/__tests__/{{lowerCase name}}.test.js',
                templateFile: 'plop-template/component/__tests__/component.test.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{lowerCase name}}/stories/{{lowerCase name}}.stories.js',
                templateFile: 'plop-template/component/stories/component.stories.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{lowerCase name}}/index.js',
                templateFile: 'plop-template/component/index.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{lowerCase name}}/install.js',
                templateFile: 'plop-template/component/install.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{lowerCase name}}/LICENSE',
                templateFile: 'plop-template/component/LICENSE'
            },
            {
                type: 'add',
                path: 'packages/{{lowerCase name}}/package.json',
                templateFile: 'plop-template/component/package.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{lowerCase name}}/sample.html',
                templateFile: 'plop-template/component/sample.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{lowerCase name}}/README.md',
                templateFile: 'plop-template/component/README.hbs'
            }
        ]
    })

    plop.setGenerator('library', {
        description: 'create a library',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'library name',
            default: 'dollymi'
        }],
        actions: [{
                type: 'add',
                path: 'packages/{{lowerCase name}}/src/index.ts',
                templateFile: 'plop-template/library/src/index.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{lowerCase name}}/__tests__/{{lowerCase name}}.test.ts',
                templateFile: 'plop-template/library/__tests__/library.test.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{lowerCase name}}/index.js',
                templateFile: 'plop-template/library/index.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{lowerCase name}}/LICENSE',
                templateFile: 'plop-template/library/LICENSE'
            },
            {
                type: 'add',
                path: 'packages/{{lowerCase name}}/package.json',
                templateFile: 'plop-template/library/package.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{lowerCase name}}/README.md',
                templateFile: 'plop-template/library/README.hbs'
            }
        ]
    })
}