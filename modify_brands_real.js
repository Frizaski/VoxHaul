const fs = require('fs');
const path = './app/data/dummyProducts.ts';
let content = fs.readFileSync(path, 'utf8');

const localBrands = ['Erigo', 'Sejauh Mata Memandang', 'Sepatu Compass', 'Buttonscarves', 'Executive'];
const intlBrands = ['Uniqlo', 'Zara', 'Nike', 'Levis', 'Ralph Lauren'];

let localIndex = 0;
let intlIndex = 0;

content = content.replace(/brand:\s*'Lokal'/g, () => {
  const brand = localBrands[localIndex % localBrands.length];
  localIndex++;
  return `brand: '${brand}'`;
});

content = content.replace(/brand:\s*'Internasional'/g, () => {
  const brand = intlBrands[intlIndex % intlBrands.length];
  intlIndex++;
  return `brand: '${brand}'`;
});

fs.writeFileSync(path, content);
console.log('Brands reverted to real names!');
