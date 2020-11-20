// Modules to control application life and create native browser window
const _ = require("lodash")
const { app, BrowserWindow } = require('electron')
const path = require('path')
const SerialHelper = require('./SerialHelper');

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.maximize();
  mainWindow.loadFile('./static/index.html');
  const options = {
    baudRate: 115200,
    delimiter: [0xff, 0xff],
    messageLength: 5
  };

  SerialHelper.init(options,
    _.throttle(message => {
      const data = SerialHelper.parseMessage(message);
      mainWindow.webContents.send("data", data);
    }, 20)
  );
}

app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
