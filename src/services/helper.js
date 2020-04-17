import beautify from 'js-beautify';

class HelperService {
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

export default HelperService;
