const { execSync } = require('child_process');
const path = require('path');

const projectRoot = path.resolve(__dirname);

// Change to project root
process.chdir(projectRoot);

try {
  execSync('npx contentlayer build', { 
    stdio: 'inherit',
    cwd: projectRoot 
  });
  console.log('Contentlayer build successful!');
} catch (error) {
  console.error('Contentlayer build failed:', error.message);
  process.exit(1);
}