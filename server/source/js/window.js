"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron = require("electron");
var path = require("path");
var url = require("url");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow;
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html')
    }));
}
