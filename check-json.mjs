import fs from 'fs';
let content = fs.readFileSync('./src/data/cats.json', 'utf8');
console.log('位置680-720的内容:');
console.log(content.substring(680, 720));
console.log('---');
console.log('字符码:', content.charCodeAt(695), content.charCodeAt(696), content.charCodeAt(697), content.charCodeAt(698));
