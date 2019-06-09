# Linter

The generated project is packed with [ESLINT](https://eslint.org/) for linting, [Prettier](https://prettier.io/) for code formatting and [EditorConfig](https://editorconfig.org/) for editor configuration.

## ESLINT and Prettier Configuration

There are three configuration files: .eslintrc, .prettierrc and .editorconfig.

- To be able to use ESLINT on TypeScript code, we use the **@typescript-eslint/parser** and the **@typescript-eslint/eslint-plugin** in our .eslintrc file.
- The Prettier configuration is in and only in the .prettierrc file
- In order to use both Prettier and ESLINT without generating any conflicts, we use the [**eslint-config-prettier**](https://github.com/prettier/eslint-config-prettier) package and we extend prettier in our .eslintrc file. This allows us to disable any ESLINT rules potentially conflicting with Prettier.
- To avoid conflicts between prettier and the react and TypeScript ESLINT rules, we extend the ESLINT configuration with the **prettier/@typescript-eslint** and **prettier/react** configurations.

```JSON

  "extends": [
    "plugin:@typescript-eslint/recommended",
    "react-app",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react"
  ],

```

**IMPORTANT !** If you want to add a ESLINT plugin, extend it before all the prettier configurations in the extends array. The order has its importance here.

- In the rules array, we add this line:

```JSON
"prettier/prettier": "error"
```

This allows eslint to lint prettier errors as ESLINT errors (Handy because we can rely only and totally on ESLINT for our CI linter validation whether the errors are found by ESLINT or Prettier). Now when we execute:

```bash
eslint --fix
```

both ESLINT and Prettier will run.

## EditorConfig

EditorConfig allows us to have the same editor configuration regardless of the editor used (eg: indent style, indent width, end of line sequence). With this configuration, we do not have to rely on Prettier to format our code with the team's conventions each time new code is written.

However, this means that Prettier and EditorConfig share some configuration options that we do not want to repeat in two separate configuration files. The latest versions of [Prettier](https://prettier.io/docs/en/api.html#prettierresolveconfigfilepath-options) address this issue by parsing the .editorconfig file to determine what configuration options to use.

Those options include and are limited to:

```yaml
end_of_line
indent_style
indent_size/tab_width
max_line_length
```

These configuration options will override the following prettier options:

```JSON
"endOfLine"
"useTabs"
"tabWidth"
"printWidth"
```

If you wish to change the configuration, the rule is to check whether it is a editorconfig or prettier relevant configuration and then change it in the appropriate file. The previous configuration options should be written only in the .editorconfig.

## Some recommendations

- Do not adopt a setup once and forget approach for your linting and formatting experience. If you wish to modify the configuration, it is highly recommended to follow the conventions of this documentation.
- If you have both format on save and lint on save (auto fix on save) capabilities on your editor, it is possible to turn the lint on save on and the format on save off for the project. Indeed, since ESLINT is bundled together with prettier, running a ESLINT fix will also format your code using the prettier configuration.
