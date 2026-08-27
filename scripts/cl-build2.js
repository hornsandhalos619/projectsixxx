const { run } = require('@contentlayer/cli');

async function main() {
  try {
    // Pass build as an argument
    process.argv = ['node', 'contentlayer', 'build'];
    await run();
    console.log('Contentlayer build successful!');
  } catch (error) {
    console.error('Contentlayer build failed:', error);
    process.exit(1);
  }
}

main();