const fs = require('fs');
const os = require('os');
const path = require('path');

const imageExt = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']);
const videoExt = new Set(['.mp4', '.webm', '.mov', '.m4v', '.avi']);

function sourceFolder() {
  const home = os.homedir();
  const candidates = [
    path.join(home, 'OneDrive', '문서', '카카오톡 받은 파일', '게임공유'),
    path.join(home, 'OneDrive', 'Documents', '카카오톡 받은 파일', '게임공유'),
    path.join(home, 'Documents', '카카오톡 받은 파일', '게임공유'),
    path.join(home, '문서', '카카오톡 받은 파일', '게임공유')
  ];
  return candidates.find((p) => fs.existsSync(p));
}

const root = path.join(__dirname, '..');
const dest = path.join(root, 'media');
fs.mkdirSync(dest, { recursive: true });

const folder = sourceFolder();
if (!folder) {
  console.error('게임공유 폴더를 찾지 못했습니다.');
  process.exit(1);
}

const files = fs.readdirSync(folder, { withFileTypes: true })
  .filter((d) => d.isFile())
  .map((d) => {
    const ext = path.extname(d.name).toLowerCase();
    if (imageExt.has(ext)) return { name: d.name, type: 'image' };
    if (videoExt.has(ext)) return { name: d.name, type: 'video' };
    return null;
  })
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name, 'ko'));

for (const file of files) {
  const from = path.join(folder, file.name);
  const to = path.join(dest, file.name);
  if (!fs.existsSync(to) || fs.statSync(to).size !== fs.statSync(from).size) {
    fs.copyFileSync(from, to);
    console.log('copy', file.name);
  }
}

const manifest = files.map((file) => ({
  type: file.type,
  name: file.name,
  path: 'media/' + file.name
}));
fs.writeFileSync(path.join(dest, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('manifest', manifest.length, 'files');
