import * as electron from 'electron'
import * as path from 'path'
import * as url from 'url'

const app = electron.app

let mainWindow: electron.BrowserWindow

function createWindow() {
    mainWindow = new electron.BrowserWindow({width: 800, height: 600})

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'views', 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.webContents.openDevTools()
    mainWindow.maximize()
    mainWindow.setMenu(null)

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})