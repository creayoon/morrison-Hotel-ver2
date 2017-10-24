export default class {
	constructor(name, social, image) {
		this.name = name;		  // string, requried
		this.social = social;	// string
		this.image = image;		// string(url)

		this.validate();
	}

	validate() {
		// type check
		if (typeof this.name !== 'string') throw new Error('name is not a String');
		if (typeof this.social !== 'string') throw new Error('social is not a String');
		if (typeof this.image !== 'string') throw new Error('image is not a String');

		if (!this.name) throw new Error('name is null');
	}

}
