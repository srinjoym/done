const electron = require("electron")
const {app, BrowserWindow} = electron
const path = require("path")
const url = require("url")
const isDev = require("electron-is-dev")

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 750,
    minHeight: 300,
    minWidth: 300,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
}

app.on("ready", () => {
  createWindow()
})

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow()
  }
})