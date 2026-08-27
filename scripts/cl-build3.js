const { run } = require('@contentlayer/cli');

async function main() {
  // Simulate: node contentlayer build
  process.argv = [
    process.argv[0],  // node
    process.argv[1],  // this script
    'build'
  ];
  
  try {
    await run();
    console.log('Contentlayer build successful!');
  } catch (error) {
    console.error('Contentlayer build failed:', error);
    process.exit(1);
  }
}

main();