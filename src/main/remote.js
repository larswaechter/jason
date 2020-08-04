const { app, dialog } = require('electron');
const { join } = require('path');
const { readFile, writeFile } = require('fs');

const Axios = require('./axios');
const axiosInstance = new Axios();

/**
 * Send HTTP request
 *
 * @param {Object} context
 */
exports.sendRequest = (context) => axiosInstance.sendRequest(context);

/**
 * Export request to 'Downloads' directory
 *
 * @param {Object} request
 */
exports.exportRequest = (request) =>
	new Promise((resolve, reject) => {
		const { metadata } = request;
		const { title, uuid } = metadata;

		const downloadPath = app.getPath('downloads');
		const fileName = 'jason_' + title.replace(' ', '_') + '_' + uuid + '.json';

		writeFile(join(downloadPath, fileName), JSON.stringify(request, null, 2), (err) => {
			if (err) return reject(err);
			return resolve();
		});
	});

/**
 * Import request from JSON file via Dialog
 */
exports.importRequest = () =>
	new Promise((resolve, reject) => {
		dialog.showOpenDialog({ filters: [{ name: 'JSON', extensions: ['json'] }] }).then((res) => {
			const { canceled, filePaths } = res;
			if (canceled || !filePaths) {
				return;
			}

			readFile(filePaths[0], 'utf-8', (err, request) => {
				if (err) return reject(err);
				return resolve(JSON.parse(request));
			});
		});
	});

/**
 * Export response body to 'Downloads' directory
 *
 * @param {Object} request
 * @param {Object} responsePrettified
 */
exports.exportResponseBody = (request, responsePrettified) =>
	new Promise((resolve, reject) => {
		const { metadata, response } = request;
		const { title, uuid } = metadata;
		const { result } = response;
		const { extension } = result;

		const downloadPath = app.getPath('downloads');
		const fileName = 'jason_response_' + title.replace(' ', '_') + '_' + uuid + '.' + extension;

		writeFile(join(downloadPath, fileName), responsePrettified, (err) => {
			if (err) return reject(err);
			return resolve();
		});
	});
