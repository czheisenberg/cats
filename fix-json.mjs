import fs from 'fs';

let rawContent = fs.readFileSync('./src/data/cats.json', 'utf8');

// 先把「」换回"（如果有的话）
rawContent = rawContent.replace(/「/g, '"').replace(/」/g, '"');

// 策略：找到所有的字符串值，对内部的引号进行转义
// 更简单的方法：使用一个简单的JSON修复器逻辑
// 我们知道问题是：字符串值内部的"没有转义

// 让我们用一个更聪明的方法：
// 找到所有匹配 "key": "value" 的模式，然后对value内部的引号转义

// 实际上，让我们直接用一个npm包的思路：逐字符处理，跟踪状态
let fixed = '';
let i = 0;
let inString = false;
let escapeNext = false;

while (i < rawContent.length) {
  const c = rawContent[i];
  
  if (escapeNext) {
    fixed += c;
    escapeNext = false;
    i++;
    continue;
  }
  
  if (c === '\\') {
    fixed += c;
    escapeNext = true;
    i++;
    continue;
  }
  
  if (c === '"') {
    if (!inString) {
      // 进入字符串
      inString = true;
      fixed += c;
    } else {
      // 检查是否是字符串结束
      // 向前看，跳过空白，看下一个有效字符
      let j = i + 1;
      while (j < rawContent.length && /\s/.test(rawContent[j])) j++;
      const nextChar = rawContent[j];
      
      // 如果下一个字符是 : , } ] 中的一个，说明这是字符串结束
      if (nextChar === ':' || nextChar === ',' || nextChar === '}' || nextChar === ']') {
        inString = false;
        fixed += c;
      } else {
        // 这是字符串内部的引号，需要转义
        fixed += '\\"';
      }
    }
  } else {
    fixed += c;
  }
  
  i++;
}

try {
  const data = JSON.parse(fixed);
  fs.writeFileSync('./src/data/cats.json', fixed);
  console.log('修复成功！猫咪数量:', data.cats.length, '地区数量:', data.regions.length);
} catch(e) {
  console.log('第一次修复后仍然有错误:', e.message);
  const pos = parseInt(e.message.match(/position (\d+)/)?.[1] || 0);
  console.log('位置', pos, '附近:', fixed.substring(Math.max(0, pos-40), pos+40));
  
  // 如果还有错误，打印更多信息
  console.log('\n尝试进一步调试...');
}
