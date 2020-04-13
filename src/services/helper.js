import beautify from 'js-beautify';
import { v4 as uuid } from 'uuid';

export class Helper {
	static validateRequest = (request) => {
		if (!request.url) {
			return { isValid: false, msg: 'No URL provided!' };
		}

		return { isValid: true, msg: '' };
	};

	static createEmptyMetadata = (metadata = {}) => {
		return {
			uuid: uuid(),
			title: metadata.title || 'Untitled request',
			createdAt: metadata.createdAt || Date.now(),
			completed: metadata.completed || false
		};
	};

	static createEmptyRequest = (request = {}) => {
		return {
			url: request.url || '',
			method: request.method || 'get',
			headers: request.headers || {
				'Cache-Control': {
					value: 'no-cache',
					description: 'Prevent cached reponses for duplicated requests'
				},
				Connection: {
					value: 'keep-alive',
					description: 'Keep connection open'
				}
			},
			params: request.params || {},
			data: request.data || { type: 'none', value: undefined },
			timeout: request.timeout >= 0 ? request.timeout : 0
		};
	};

	static createEmptyResponse = (response = {}) => {
		return {
			startTime: response.startTime || undefined,
			endTime: response.endTime || undefined,
			duration: response.duration || undefined,
			result: response.result || undefined,
			error: response.error || undefined
		};
	};

	static prettyPrint = (code, language) => {
		switch (language) {
			case 'json':
				return JSON.stringify(code, null, 2);
			case 'html':
				return beautify.html_beautify(code);
			case 'xml':
				return beautify.html_beautify(code);
			default:
				return code;
		}
	};
}
