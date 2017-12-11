export default class {
  constructor(defaultPrice, roomNumber, roomType, facility, roomSize, bedSize, availableGuest, acceptChild, blueprint, image) { // eslint-disable-line max-len, max-params
    this.defaultPrice = defaultPrice;				// Number
    this.roomNumber = roomNumber; 					// Number
    this.roomType = roomType; 							// String
    this.facility = facility; 							// object (Array)
    this.roomSize = roomSize; 							// String
    this.bedSize = bedSize; 								// String
    this.availableGuest = availableGuest; 	// Number
    this.acceptChild = acceptChild; 				// Number
    this.blueprint = blueprint; 						// String
    this.image = image; 										// object (Array)
    this.roomName = this.roomType + ' ' + this.roomNumber; // string

    this.validate();
  }

  // required property chk
  validate() {
    // type check
    if (typeof this.defaultPrice !== 'number') throw new Error('defaultPrice is not a number');

    if (!this.defaultPrice) throw new Error('defaultPrice is null');
  }

}
