export default class {
  constructor(name, social, image) {
    this.name = name;		  // string, requried
    this.social = social;	// string
    this.image = image;		// string(url)

    this.validate();
  }

  // required property chk
  validate() {
    // type check
    if (typeof this.name !== 'string') throw new Error('name is not a String');

    if (!this.name) throw new Error('name is null');
    // if (this.name === '') throw new Error('name is empty');
  }

}
