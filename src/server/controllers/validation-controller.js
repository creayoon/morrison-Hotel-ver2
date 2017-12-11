export default class ValidController {
	// chk type
	static stringCheck(essentialFields, body) {
		check(essentialFields, body, 'string');
	}

	// chk logic
	check(essentialFields, body, type) {
		return new Promise((resolve, reject) => {
			const isValid = essentialFields
					.map(fieldName => {
						console.log('fieldName:::', fieldName)
						console.log('body:::', body)
	
						if (!body.hasOwnProperty(fieldName)) return false;
						if (typeof body[fieldName] !== type) return false;
						return true;
					})
					.reduce((a, b) => a & b);
			if (!isValid) {
				reject(new Error('is not valid:::::::'));
			} else {
				resolve(isValid);
			}
		});
	}
}

