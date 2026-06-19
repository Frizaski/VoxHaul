const fs = require('fs');
const path = './app/data/dummyProducts.ts';
let content = fs.readFileSync(path, 'utf8');

const variantDefs = `
const sizesA = ['S', 'M', 'L'];
const sizesB = ['M', 'L', 'XL', '2XL'];
const sizesC = ['XS', 'S', 'M'];
const sizesD = ['All Size'];

const colorsA = [{ name: 'Black', hex: '#1a1a1a' }, { name: 'White', hex: '#fcfcfc' }];
const colorsB = [{ name: 'Navy', hex: '#1c2841' }, { name: 'Olive Green', hex: '#4b5320' }];
const colorsC = [{ name: 'Brown', hex: '#5c4033' }, { name: 'Sand', hex: '#d2b48c' }];
const colorsD = [{ name: 'Red Corduroy', hex: '#8a3324' }, { name: 'Denim Blue', hex: '#1560bd' }];
const colorsE = [{ name: 'Neon Yellow', hex: '#ccff00' }, { name: 'Neon Green', hex: '#39ff14' }];
`;

content = content.replace(
  /const defaultSizes = \[[\s\S]*?\]\n/,
  variantDefs + '\n'
);
content = content.replace(
  /const defaultColors = \[[\s\S]*?\]\n/,
  ''
);

const colorsList = ['colorsA', 'colorsB', 'colorsC', 'colorsD', 'colorsE'];
const sizesList = ['sizesA', 'sizesB', 'sizesC', 'sizesD'];

let colorIndex = 0;
let sizeIndex = 0;

content = content.replace(/colors: defaultColors,/g, () => {
  const c = colorsList[colorIndex % colorsList.length];
  colorIndex++;
  return `colors: ${c},`;
});

content = content.replace(/sizes: defaultSizes,/g, () => {
  const s = sizesList[sizeIndex % sizesList.length];
  sizeIndex++;
  return `sizes: ${s},`;
});

fs.writeFileSync(path, content);
console.log('dummyProducts.ts updated with variants!');
