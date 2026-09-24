const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

app.commandLine.appendSwitch('enable-features', 'PlatformHEVCDecoderSupport');

function mediaFolder() {
  const home = app.getPath('home');
  const candidates = [
    path.join(home, 'OneDrive', '문서', '카카오톡 받은 파일', '게임공유'),
    path.join(home, 'OneDrive', 'Documents', '카카오톡 받은 파일', '게임공유'),
    path.join(home, 'Documents', '카카오톡 받은 파일', '게임공유'),
    path.join(home, '문서', '카카오톡 받은 파일', '게임공유')
  ];
  return candidates.find(p => fs.existsSync(p)) || candidates[0];
}

function listMedia() {
  const folder = mediaFolder();
  if (!fs.existsSync(folder)) return [];
  const imageExt = new Set(['.jpg','.jpeg','.png','.gif','.webp','.bmp']);
  const videoExt = new Set(['.mp4','.webm','.mov','.m4v','.avi']);
  return fs.readdirSync(folder, {withFileTypes:true})
    .filter(d => d.isFile())
    .map(d => {
      const full = path.join(folder,d.name);
      const ext = path.extname(d.name).toLowerCase();
      if (imageExt.has(ext)) return {name:d.name,type:'image',path:full};
      if (videoExt.has(ext)) return {name:d.name,type:'video',path:full};
      return null;
    })
    .filter(Boolean)
    .sort((a,b)=>a.name.localeCompare(b.name,'ko'));
}

function createWindow(){
  const win=new BrowserWindow({
    width:1280,height:800,
    title:'서원 게임 No1. 추석 불꽃놀이',
    autoHideMenuBar:true,
    webPreferences:{
      preload:path.join(__dirname,'preload.js'),
      contextIsolation:true,
      nodeIntegration:false
    }
  });
  win.loadFile('index.html');
  win.webContents.on('console-message', (_event, level, message) => {
    console.log('[renderer]', message);
  });
  win.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12') win.webContents.toggleDevTools();
  });
}

ipcMain.handle('list-media',()=>listMedia());
ipcMain.handle('media-url',(_e,filePath)=>{
  // file:// URL generation safe for spaces and Korean names
  return require('url').pathToFileURL(filePath).href;
});

app.whenReady().then(()=>{
  createWindow();
  app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow()});
});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
