const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    minWidth: 400,
    height: 400,
    minHeight: 200,
    title: "UD Calculator",
    icon: "./AppIcon.ico",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  });

  //ipc handlers
  ipcMain.handle("version-ch", () => app.getVersion())
  
    //window over mode
  ipcMain.handle("toggle-window-over-mode-enable", () => {
    win.setAlwaysOnTop(true, 'floating', 1);
  })
  ipcMain.handle("toggle-window-over-mode-disable", () => {
    win.setAlwaysOnTop(false);
  })
    //external links
  ipcMain.handle("open-external-link-latest-release", () => {
    shell.openExternal('https://github.com/UrazDuray/udcalculator/releases/tag/1.1.0')
  })

  win.setAlwaysOnTop(false);

  win.loadFile('index.html');
  
  //toolbarı kapa
  win.removeMenu()
  
  // DevTools'u aç.
  // win.webContents.openDevTools()
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});