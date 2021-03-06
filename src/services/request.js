import { v4 as uuid } from 'uuid';

class RequestService {
	static validateContext = (context) => {
		if (!context.url) {
			return { isValid: false, msg: 'No URL provided!' };
		}

		return { isValid: true, msg: '' };
	};

	static createRequest = (request = {}) => ({
		metadata: RequestService.createEmptyMetadata(request.metadata),
		context: RequestService.createEmptyContext(request.context),
		response: RequestService.createEmptyResponse(request.response)
	});

	static createEmptyMetadata = (metadata = {}) => ({
		uuid: metadata.uuid || uuid(),
		title: metadata.title || 'Untitled request',
		createdAt: metadata.createdAt || Date.now(),
		completed: metadata.completed || false,
		saved: metadata.saved || false,
		unsavedChanges: false
	});

	static createEmptyContext = (context = {}) => ({
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
}

export default RequestService;
