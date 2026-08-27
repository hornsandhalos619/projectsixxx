const { run } = require('@contentlayer/cli');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

async function main() {
  process.chdir(projectRoot);
  console.log('Working directory:', process.cwd());
  
  try {
    await run();
    console.log('Contentlayer build successful!');
  } catch (error) {
    console.error('Contentlayer build failed:', error);
    process.exit(1);
  }
}

main();