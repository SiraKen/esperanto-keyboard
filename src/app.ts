const { app, BrowserWindow, Menu, Tray, nativeTheme } = require("electron");
const fs = require("fs");

require("electron-reload")(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`),
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile(`${__dirname}/src/html/index.html`);
};

let tray = null;

const createTray = () => {
  if (nativeTheme.shouldUseDarkColors) {
    tray = new Tray(`${__dirname}/src/assets/icon.png`);
  } else {
    tray = new Tray(`${__dirname}/src/assets/icon.png`);
  }

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show",
      click: () => {
        console.log("Hello");
      },
    },
    {
      label: "Quit",
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);
};

app.whenReady().then(() => {
  createTray();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
