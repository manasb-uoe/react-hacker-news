/*
 * Create a context for all tests files below the tests folder and all sub-folders.
 */
const context = require.context('../tests/', true, /\.spec\.jsx?$/);

/*
 * For each file, call the context function that will require the file and load it up here.
 */
context.keys().forEach(context);