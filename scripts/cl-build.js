const { run } = require('@contentlayer/cli');

async function main() {
  try {
    await run();
    console.log('Contentlayer build successful!');
  } catch (error) {
    console.error('Contentlayer build failed:', error);
    process.exit(1);
  }
}

main();