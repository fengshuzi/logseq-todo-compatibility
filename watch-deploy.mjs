import { watch } from 'fs';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

// 定义目标目录
const VAULTS = [
  {
    name: 'Pro',
    path: join(
      homedir(),
      'Library/Mobile Documents/iCloud~md~obsidian/Documents/漂泊者及其影子/.obsidian-pro/plugins/logseq-todo-compatibility'
    )
  },
  {
    name: 'Mobile',
    path: join(
      homedir(),
      'Library/Mobile Documents/iCloud~md~obsidian/Documents/漂泊者及其影子/.obsidian-mobile/plugins/logseq-todo-compatibility'
    )
  }
];

// 需要监听的文件
const FILES_TO_WATCH = ['main.js', 'manifest.json', 'styles.css'];

// 创建目标目录
VAULTS.forEach(vault => {
  if (!existsSync(vault.path)) {
    mkdirSync(vault.path, { recursive: true });
  }
});

console.log('👀 开始监听文件变化...\n');
console.log('监听文件:', FILES_TO_WATCH.join(', '));
console.log('目标 vaults:');
VAULTS.forEach(vault => console.log(`  - ${vault.name}: ${vault.path}`));
console.log('\n按 Ctrl+C 停止\n');

// 防抖函数
let deployTimeout;
function debouncedDeploy(filename) {
  clearTimeout(deployTimeout);
  deployTimeout = setTimeout(() => {
    deployFile(filename);
  }, 100);
}

// 部署单个文件
function deployFile(filename) {
  const timestamp = new Date().toLocaleTimeString('zh-CN');
  console.log(`\n[${timestamp}] 📦 检测到 ${filename} 变化，正在部署...`);
  
  VAULTS.forEach(vault => {
    try {
      if (existsSync(filename)) {
        copyFileSync(filename, join(vault.path, filename));
        console.log(`  ✓ 已更新到 ${vault.name} vault`);
      }
    } catch (error) {
      console.error(`  ❌ 更新到 ${vault.name} vault 失败:`, error.message);
    }
  });
  
  console.log('✅ 部署完成！');
}

// 监听每个文件
FILES_TO_WATCH.forEach(filename => {
  if (existsSync(filename)) {
    // 初始部署
    deployFile(filename);
    
    // 监听变化
    watch(filename, (eventType) => {
      if (eventType === 'change') {
        debouncedDeploy(filename);
      }
    });
  } else {
    console.log(`⚠️  警告: ${filename} 不存在，跳过监听`);
  }
});

// 保持进程运行
process.on('SIGINT', () => {
  console.log('\n\n🛑 停止监听');
  process.exit(0);
});
