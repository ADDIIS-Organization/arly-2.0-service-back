import * as fs from 'fs';
import * as path from 'path';

// Function to sort imports
function sortImports(fileContent: string): string {
  const lines = fileContent.split('\n');
  const importLines = lines.filter(line => line.startsWith('import'));
  const otherLines = lines.filter(line => !line.startsWith('import'));

  // Sort imports alphabetically
  const sortedImports = importLines.sort((a, b) => a.localeCompare(b));

  // Combine sorted imports with the rest of the file content
  return [...sortedImports, '', ...otherLines].join('\n');
}

// Format imports for a single file
function formatImports(filePath: string): void {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const sortedContent = sortImports(fileContent);
  fs.writeFileSync(filePath, sortedContent);
  console.log(`Sorted imports in ${filePath}`);
}

// Process a directory or a single file
function processPath(targetPath: string): void {
  const absoluteTargetPath = path.resolve(targetPath);
  if (fs.statSync(absoluteTargetPath).isDirectory()) {
    const files = fs.readdirSync(absoluteTargetPath);
    files.forEach(file => {
      const fullPath = path.join(absoluteTargetPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        processPath(fullPath);  // Recurse through subdirectories
      } else if (fullPath.endsWith('.ts')) {
        formatImports(fullPath);
      }
    });
  } else if (absoluteTargetPath.endsWith('.ts')) {
    formatImports(absoluteTargetPath);
  } else {
    console.error('Error: The file is not a TypeScript (.ts) file.');
  }
}

// Read the path from command-line arguments
const targetPath = process.argv[2];
if (!targetPath) {
  console.error('Error: Please provide a path to a file or folder.');
  process.exit(1);
}

// Start processing the provided path
processPath(targetPath);
