const { app, BrowserWindow } = require('electron/main')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    icon: path.join(__dirname, 'fav.ico'),
    show: false,
    width: 800,
    height: 750,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: 'rgb(80, 6, 6)',
      symbolColor: '#fcb2b2'
    },
    webPreferences:{
      preload: path.join(__dirname, 'preload.js')
    },
  })
  win.on('ready-to-show', win.show)
  win.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})