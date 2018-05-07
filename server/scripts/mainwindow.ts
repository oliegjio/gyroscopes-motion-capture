import * as electron from 'electron'
import * as path from 'path'
import * as url from 'url'

const app = electron.app
let mainWindow: electron.BrowserWindow

let createWindow = () => {
  mainWindow = new electron.BrowserWindow({width: 800, height: 600})
  mainWindow.setMenu(null)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '..', 'views', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
