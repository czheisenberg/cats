const fs = require('fs');
let content = fs.readFileSync('./src/data/cats.json', 'utf8');
content = content.replace(/\u201c/g, '"').replace(/\u201d/g, '"');
fs.writeFileSync('./src/data/cats.json', content);
try {
  const data = JSON.parse(content);
  console.log('修复成功！猫咪数量:', data.cats.length, '地区数量:', data.regions.length);
} catch(e) {
  console.log('仍然有错误:', e.message);
}
