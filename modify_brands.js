const fs = require('fs');
const path = './app/data/dummyProducts.ts';
let content = fs.readFileSync(path, 'utf8');

const brands = ['Lokal', 'Internasional'];
let i = 0;
content = content.replace(/brand:\s*'(VOXHAUL|ADIDAS)'/g, (match) => {
  const chosenBrand = brands[i % 2];
  i++;
  return `brand: '${chosenBrand}'`;
});

fs.writeFileSync(path, content);
console.log('dummyProducts.ts brands updated!');
