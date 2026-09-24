const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('seowonAPI',{
  listMedia:()=>ipcRenderer.invoke('list-media'),
  mediaUrl:(p)=>ipcRenderer.invoke('media-url',p)
});
