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
    // Test script exited with non-zero status code.

    // if (typeof this.social !== 'string' || typeof this.social !== undefined) 
      // throw new Error('social is not a String'); // Unexpected use of undefined 
    if (typeof this.image !== 'string') throw new Error('image is not a String');

    // console.log('here:::', this.social, typeof this.social);

		if (!this.name) throw new Error('name is null');
	}

}
