const { create } = require('axios');
const { stringify } = require('circular-json');

class AxiosService {
	constructor() {
		this.axios = create();
		this.axios.interceptors.response.use(this.interceptResponse);
	}

	interceptResponse(response) {
		const { headers } = response;
		const [mime] = headers['content-type'].split(';');

		let extension = '';

		switch (mime) {
			case 'application/json':
				extension = 'json';
				break;
			case 'text/html':
				extension = 'html';
				break;
			default:
				extension = 'txt';
				break;
		}

		return { ...response, extension };
	}

	// Transform request body data
	transformRequest(data) {
		const { type, value } = data;

		if (!value) {
			return '';
		}

		switch (type) {
			case 'empty':
				return '';
			case 'form':
				const form = new FormData();
				const pairs = value.split('\n');
				for (let pair of pairs) {
					const [key, value] = pair.split('=');
					if (key && value) {
						form.append(key, value);
					}
				}
				return form;
			default:
				return value;
		}
	}

	sendRequest(context) {
		const { url, method, params, data, headers } = context;
		const { type, value } = data;

		const paramsPrepared = {};
		for (let param in params) {
			paramsPrepared[param] = params[param].value;
		}

		const headersPrepared = {};
		for (let header in headers) {
			headersPrepared[header] = headers[header].value;
		}

		// Set Content-Type header if not provided by user
		if (type !== 'empty' && !headersPrepared['Content-Type'] && value) {
			switch (type) {
				case 'form':
					headersPrepared['Content-Type'] = 'multipart/form-data;boundary="boundary"';
					break;
				case 'json':
					headersPrepared['Content-Type'] = 'application/json';
					break;
				default:
					headersPrepared['Content-Type'] = 'text/plain; charset=UTF-8';
					break;
			}
		}

		// Send request
		return this.axios
			.request({
				method,
				url,
				params: paramsPrepared,
				data,
				headers: headersPrepared,
				validateStatus: () => true, // Prevent 500 status error throwing
				transformRequest: this.transformRequest
			})
			.then((res) => JSON.parse(stringify(res)));
	}
}

module.exports = AxiosService;
