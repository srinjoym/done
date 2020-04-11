const {app, BrowserWindow, nativeImage, Tray} = require("electron")
const path = require("path")
const url = require("url")
const isDev = require("electron-is-dev")
const Positioner = require('electron-positioner')
const { ipcMain, Notification } = require('electron')

let mainWindow = null
let tray = null

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 325,
    height: 375,
    show: false,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
}

const setupMenubar = () => {
  const icon = nativeImage.createFromPath(path.join(__dirname, './iconTemplate.png'))
  icon.setTemplateImage(true)
  tray = new Tray(icon)

  // Add a click handler so that when the user clicks on the menubar icon, it shows
  // our popup window
  tray.on('click', function(event) {
    toggleWindow()
  })
}

const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    showWindow()
  }
}

const showWindow = () => {
  const positioner = new Positioner(mainWindow);
  const trayBounds = tray.getBounds()

  const windowPos = mainWindow.getBounds()
  let x, y = 0
  if (process.platform === 'darwin') {
    x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowPos.width / 2))
    y = Math.round(trayBounds.y + trayBounds.height)

    mainWindow.setPosition(x, y, false)
  } else {
    positioner.move('trayBottomCenter', trayBounds)
  }

  mainWindow.show()
  mainWindow.focus()
}

app.on("ready", () => {
  setupMenubar()
  createWindow()

  ipcMain.on("sendNotification", () => {
    const notification = new Notification({
      title: 'Focus session ended',
      body: 'Let\'s take a break!',
      timeoutType: 'never',
    })
    notification.show()

    notification.on("click", () => {
      showWindow()
    })
  })

  ipcMain.on("updateMenuIcon", (event, text) => {
    tray.setTitle(text)
  })
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
