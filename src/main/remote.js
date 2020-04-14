const { app, dialog } = require('electron');
const { join } = require('path');
const { readFile, writeFile } = require('fs');

/**
 * Export request to 'Downloads' directory
 */
exports.exportRequest = ({ request }, cb) => {
	const downloadPath = app.getPath('downloads');
	const fileName = 'jason_' + request.metadata.uuid + '.json';

	writeFile(join(downloadPath, fileName), JSON.stringify(request, null, 2), (err) => {
		cb(err);
	});
};

/**
 * Import request from JSON
 */
exports.importRequest = (cb) => {
	dialog.showOpenDialog({ filters: [{ name: 'JSON', extensions: ['json'] }] }).then((res) => {
		const { canceled, filePaths } = res;
		if (canceled || !filePaths) {
			return;
		}

		readFile(filePaths[0], 'utf-8', (err, request) => {
			cb(err, JSON.parse(request));
		});
	});
};
