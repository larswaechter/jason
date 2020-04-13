import { create } from 'axios';

export class AxiosService {
	constructor(url) {
		this.axios = create();
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

	sendRequest(request) {
		const { url, method, params, data, headers } = request;
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
				case 'plain':
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
				validateStatus: () => true, // Prevent error throwing
				transformRequest: this.transformRequest
			})
			.then((res) => res);
	}
}
