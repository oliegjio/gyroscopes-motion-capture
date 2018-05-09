"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron = require("electron");
var path = require("path");
var url = require("url");
var app = electron.app;
var mainWindow;
function createWindow() {
    mainWindow = new electron.BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'views', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.webContents.openDevTools();
    mainWindow.maximize();
    mainWindow.setMenu(null);
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
