"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron = require("electron");
var path = require("path");
var url = require("url");
var app = electron.app;
var mainWindow;
var createWindow = function () {
    mainWindow = new electron.BrowserWindow({ width: 800, height: 600 });
    mainWindow.setMenu(null);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'views', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
};
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
