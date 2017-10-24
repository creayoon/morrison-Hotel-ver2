export default class {
	constructor(roomNumber, roomType, facility, roomSize, bedSize, availableGuest, acceptChild, blueprint, image, defaultPrice) { // eslint-disable-line max-len, max-params
		this.roomNumber = roomNumber; 					// Number 
		this.roomType = roomType; 							// String
		this.facility = facility; 							// object (Array)
		this.roomSize = roomSize; 							// String
		this.bedSize = bedSize; 								// String
		this.availableGuest = availableGuest; 	// Number 
		this.acceptChild = acceptChild; 				// Number 
		this.blueprint = blueprint; 						// String
		this.image = image; 										// object (Array)
		this.defaultPrice = defaultPrice;				// Number 

		this.validate();
	}

	validate() {
		// type check
		if (typeof this.roomNumber !== 'number') throw new Error('roomNumber is not a number');
		if (typeof this.roomType !== 'string') throw new Error('roomType is not a String');
		if (typeof this.facility !== 'object') throw new Error('facility is not a object');
		if (typeof this.roomSize !== 'string') throw new Error('roomSize is not a String');
		if (typeof this.bedSize !== 'string') throw new Error('bedSize is not a String');
		if (typeof this.availableGuest !== 'number') throw new Error('availableGuest is not a number');
		if (typeof this.acceptChild !== 'number') throw new Error('acceptChild is not a number');
		if (typeof this.blueprint !== 'string') throw new Error('blueprint is not a String');
		if (typeof this.image !== 'object') throw new Error('image is not a object');
		if (typeof this.defaultPrice !== 'number') throw new Error('defaultPrice is not a number');

		// required info chk
		if (!this.defaultPrice) throw new Error('defaultPrice is null');
	}

}