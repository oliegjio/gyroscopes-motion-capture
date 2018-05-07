import *  as electron from 'electron'
import * as path from 'path'
import * as url from 'url'

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow 

function createWindow() {
    mainWindow = new BrowserWindow

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname , 'index.html')
    }))
}