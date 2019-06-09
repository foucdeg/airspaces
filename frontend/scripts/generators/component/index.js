const {
  componentAlreadyExists,
  componentsFolderExists,
  pagesFolderExists,
} = require('../utils/component-exists');

const choices = [];
if (componentsFolderExists()) choices.push('Component');
if (pagesFolderExists()) choices.push('Page');

module.exports = {
  description: 'Add a component',
  prompts: [
    {
      type: 'list',
      name: 'componentType',
      message: 'Do you want a page or a component?',
      default: 'Component',
      choices: () => choices,
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return componentAlreadyExists(value)
            ? 'A component or page with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'list',
      name: 'component',
      message: 'Select a type of component:',
      default: 'PureComponent',
      choices: () => ['PureComponent', 'Component', 'Stateless'],
    },
    {
      type: 'confirm',
      name: 'wantConnect',
      default: true,
      message: 'Do you want to connect your component to redux?',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want to use react-intl?',
    },
    {
      type: 'confirm',
      name: 'wantStyledComponents',
      default: true,
      message: 'Do you want to use styled-components?',
    },
    {
      type: 'confirm',
      name: 'wantSnapshotTests',
      default: true,
      message: 'Do you want snapshot tests?',
    },
  ],
  actions: data => {
    let componentTemplate;
    const styleExtension = data.wantStyledComponents ? 'ts' : 'css';
    const componentType = data.componentType === 'Component' ? 'components' : 'pages';

    switch (data.component) {
      case 'Component': {
        componentTemplate = './component/component.tsx.hbs';
        break;
      }
      case 'Stateless': {
        componentTemplate = './component/component.stateless.tsx.hbs';
        break;
      }
      default: {
        componentTemplate = './component/component.pure.tsx.hbs';
      }
    }

    const actions = [
      {
        type: 'add',
        path: `../../src/${componentType}/{{properCase name}}/tests/{{properCase name}}.test.tsx`,
        templateFile: './component/test.tsx.hbs',
        abortOnFail: true,
        data,
      },
      {
        type: 'add',
        path: `../../src/${componentType}/{{properCase name}}/{{properCase name}}.tsx`,
        templateFile: componentTemplate,
        abortOnFail: true,
        data,
      },
      {
        type: 'add',
        path: `../../src/${componentType}/{{properCase name}}/{{properCase name}}.style.${styleExtension}`,
        templateFile: `./component/style.${styleExtension}.hbs`,
        abortOnFail: true,
        data,
      },
      {
        type: 'add',
        path: `../../src/${componentType}/{{properCase name}}/index.ts`,
        templateFile: './component/index.ts.hbs',
        abortOnFail: true,
        data,
      },
    ];

    if (data.wantConnect) {
      actions.push({
        type: 'add',
        path: `../../src/${componentType}/{{properCase name}}/{{properCase name}}.wrap.tsx`,
        templateFile: './component/wrap.tsx.hbs',
        abortOnFail: true,
        data,
      });
    }

    if (data.wantSnapshotTests) {
      actions.push({
        type: 'add',
        path: `../../src/${componentType}/{{properCase name}}/tests/{{properCase name}}.snapshot.test.tsx`,
        templateFile: './component/snapshot.test.tsx.hbs',
        abortOnFail: true,
        data,
      });
    }

    return actions;
  },
};
