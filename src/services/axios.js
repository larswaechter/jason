import { create } from 'axios';

export class AxiosService {
	constructor(url) {
		this.axios = create();
	}

	transformRequest(data, headers) {
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

	fetchData(request) {
		const { url, method, params, data, headers } = request;

		const paramsPrepared = {};
		for (let param in params) {
			paramsPrepared[param] = params[param].value;
		}

		const headersPrepared = {};
		for (let header in headers) {
			headersPrepared[header] = headers[header].value;
		}

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
			.then((res) => {
				return res;
			});
	}
}
