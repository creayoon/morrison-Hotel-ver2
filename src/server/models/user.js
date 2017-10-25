export default class {
	constructor(name, social, image) {
		this.name = name;		  // string, requried
		this.social = social;	// string
		this.image = image;		// string(url)

		this.validate();
    // required가 
	}

	validate() {
		// type check
		if (typeof this.name !== 'string') throw new Error('name is not a String');
    
    // if (typeof this.social !== 'string') throw new Error('social is not a String');
    // Err: social is not a String -> Test script exited with non-zero status code.

    // if (typeof this.social !== 'string' && typeof this.social !== undefined) 
      // throw new Error('social is not a String'); 
      // Err: Unexpected use of undefined -> lint error! test failed!
    
    // if (typeof this.social !== 'string') 
      // throw new Error('social is not a String'); // eslint-disable-line no-undefined

    if (typeof this.social !== 'string' && typeof this.social !== undefined) 
      throw new Error('social is not a String'); // eslint-disable-line no-undefined

    if (typeof this.image !== 'string') throw new Error('image is not a String');

    console.log('here:::', this.social, typeof this.social); // undefined undefined

		if (!this.name) throw new Error('name is null');
	}

}
