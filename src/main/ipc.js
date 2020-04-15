const { ipcMain } = require('electron');

ipcMain.on('save-request', (event, request) => {
	return event.sender.send('save-request-response', request);
});
