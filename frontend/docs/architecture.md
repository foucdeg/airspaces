## Frontend architecture

The project is structured as follows:

* `src/components`: React components are reusable pieces of the application (such as a button).

* `src/pages`: React pages correspond to the application pages (such as the home page). Sub-components of these pages should be in sub-folders of each page, if they cannot be reused anywhere else.

* `src/redux`: Redux actions/reducers/sagas/selectors are all grouped by page in this folder (following the [ducks pattern](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be)). Learn more about Redux by reading [the documentation](https://redux.js.org/basics).
