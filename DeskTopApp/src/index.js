const { app, BrowserWindow } = require('electron');
const path = require('path');
const { io } = require('socket.io-client');
var robot = require("robotjs");
var socket = io("http://192.168.1.105:9000")
let IP_elec = Math.random().toString().slice(2,11);
socket.emit("join-message",IP_elec );
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
   show:false
  });
  
  // and load the index.html of the app.
  await mainWindow.loadURL(`http://localhost:1234/server/?IP=${IP_elec}`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
};
socket.on("start-conn",(data)=>{
  const mainWindow = new BrowserWindow({
    width: 500,
    height:700,
    show:false
   
  });
  
  // and load the index.html of the app.
  mainWindow.loadURL(`http://localhost:1234/server/ServerOnActivePage?IP=${IP_elec}`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
})
socket.on("mouse-move",(data)=>{
  var obj = JSON.parse(data);
  var x = obj.x;
  var y = obj.y;

  robot.moveMouse(x, y);
})
socket.on("touch", async function(data){
  var obj = JSON.parse(data);
  var x = obj.x;
  var y = obj.y;

  await robot.moveMouse(x, y);
  robot.mouseClick();
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
