// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { writeFile } = require('fs');

const { create } = require('axios');

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	const tmp = create();

	tmp.get('https://jsonplaceholder.typicode.com/users').then((res) => {
		console.log(res);
	});

	mainWindow.setMenuBarVisibility(false);

	// and load the index.html of the app.
	mainWindow.loadURL('http://localhost:3000');

	mainWindow.maximize();

	mainWindow.dark;

	ipcMain.on('export-request', (event, { request }) => {
		const downloadPath = app.getPath('downloads');
		const fileName = 'jason_' + request.metadata.uuid + '.json';

		writeFile(path.join(downloadPath, fileName), JSON.stringify(request, null, 2), (err) => {
			return event.sender.send(`export-request-response-${request.metadata.uuid}`, {
				success: err ? false : true
			});
		});
	});

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
