export default class {
  constructor(id, name, social, image) {
    this.id = id;
    this.name = name;		  // string, requried
    this.social = social;	// string
    this.image = image;		// string(url)

    this.validate();
  }

  // required property chk
  validate() {
    // type check
    if (typeof this.id !== 'string') throw new Error('id is not a String');

    if (!this.id) throw new Error('id is null');
    // if (this.id === '') throw new Error('id is empty');
  }

}
