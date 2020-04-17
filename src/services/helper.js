import beautify from 'js-beautify';
import { v4 as uuid } from 'uuid';

export class Helper {
	static validateRequestContext = (context) => {
		if (!context.url) {
			return { isValid: false, msg: 'No URL provided!' };
		}

		return { isValid: true, msg: '' };
	};

	static createRequest = (request = {}) => ({
		metadata: Helper.createEmptyMetadata(request.metadata),
		context: Helper.CreateEmptyContext(request.context),
		response: Helper.createEmptyResponse(request.response)
	});

	static createEmptyMetadata = (metadata = {}) => ({
		uuid: uuid(),
		title: metadata.title || 'Untitled request',
		createdAt: metadata.createdAt || Date.now(),
		completed: metadata.completed || false
	});

	static CreateEmptyContext = (context = {}) => ({
		url: context.url || '',
		method: context.method || 'get',
		headers: context.headers || {
			'Cache-Control': {
				value: 'no-cache',
				description: 'Prevent cached reponses for duplicated requests'
			},
			Connection: {
				value: 'keep-alive',
				description: 'Keep connection open'
			}
		},
		params: context.params || {},
		data: context.data || { type: 'none', value: null },
		timeout: context.timeout >= 0 ? context.timeout : 0
	});

	static createEmptyResponse = (response = {}) => ({
		startTime: response.startTime || undefined,
		endTime: response.endTime || undefined,
		duration: response.duration || undefined,
		result: response.result || undefined,
		error: response.error || undefined,
		autoShow: true
	});

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
