const chalk = require('chalk');
const glob = require('glob');
const prettier = require('prettier');
const fs = require('fs');
const listChangedFiles = require('../shared/listChangedFiles');
const prettierConfigPath = require.resolve('../.././.prettierrc');
const changedFiles = listChangedFiles();
const mode = process.argv[2];
const shouldWrite = mode === 'write';

let didWarn = false;
let didError = false;

const files = glob
  .sync('**/*.{js,jsx,ts,tsx}', {
    ignore: ['**/node_modules/**', '**/build/**', 'script/**'],
  })
  .filter((f) => changedFiles.has(f));

if (!files.length) {
  return;
}

files.forEach((file) => {
  const options = prettier.resolveConfig.sync(file, {
    config: prettierConfigPath,
  });
  try {
    const input = fs.readFileSync(file, 'utf8');

    if (shouldWrite) {
      const output = prettier.format(input, options);
      if (output !== input) {
        fs.writeFileSync(file, output, 'utf8');
      }
      console.log(chalk.green(`    Formatted ${file} 😀.`));
    } else {
      if (!prettier.check(input, options)) {
        if (!didWarn) {
          console.log(
            '\n' +
            chalk.red(
              `  This projects uses prettier to format all JavaScript code.\n`
            ) +
            chalk.dim(`  Please run `) +
            chalk.reset.bold(`npm run prettier-write`) +
            chalk.dim(
              ` and add changes to files listed below to your commit:`
            ) +
            `\n\n`
          );
          didWarn = true;
        }

        console.log(chalk.cyan(file));
      }
    }
  } catch (error) {
    didError = true;
    console.log('\n\n' + error.message);
    console.log(file);
  }
});

if (didWarn || didError) {
  process.exit(1);
}
