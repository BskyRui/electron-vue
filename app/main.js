// cross-env
// concurrently
// wait-on

const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'dev';

let mainWindow = null;

const createWindow = () => {
  // create main window
  mainWindow = new BrowserWindow(
    {
      width: 1024,
      height: 768,
      webPreferences: {
        nodeIntegration: true // render process use node env
      }
    }
  );

  // mainWindow.loadFile
  const urlLocation = isDev ? 'http://localhost:8080' : `file://${path.join(__dirname, './build/index.html')}`;

  mainWindow.loadURL(urlLocation);

  // open dev mode
  mainWindow.webContents.openDevTools();

  // destroy
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
