// generateImageImports.mjs
import fs from 'fs';
import path from 'path';

// Function to convert a string to camel case with underscores
function toCamelCaseWithUnderscores(str) {
  return str.replace(/-([a-z])/g, (_, match) => `_${match.toUpperCase()}`);
}

// Function to convert numbers at the beginning of a string to words
function convertNumbersToWords(str) {
  return str.replace(/^\d+/, (match) => {
    const numberWords = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    return numberWords[Number(match)];
  });
}

const imageDir = 'src/assets/jokers'; // Use an empty string for the current directory
const outputDir = 'src/assets/jokers'; // Specify the output directory
const outputFile = path.join(outputDir, 'index.ts'); // Use .ts extension

const imageFiles = fs
  .readdirSync(imageDir)
  .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))
  .map((file) => {
    const fileNameWithoutExtension = path.basename(file, path.extname(file));
    const convertedName = convertNumbersToWords(fileNameWithoutExtension);
    const camelCaseName = toCamelCaseWithUnderscores(convertedName);
    return `import ${camelCaseName} from './${file}';`;
  });

const content = imageFiles.join('\n');

fs.writeFileSync(outputFile, content);
