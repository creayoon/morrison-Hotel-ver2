export default class {
	constructor(room, breakfast, dinner, citypass, price, date) { // eslint-disable-line max-params
		this.room = room;								// string (objectId)
		this.breakfast = breakfast;			// Boolean
		this.dinner = dinner;						// Boolean
		this.citypass = citypass;				// Boolean
		this.price = price;							// Number
		this.date = date;								// String (Date)

		this.validate();
	} 

	validate() {
		// type check
		if (typeof this.roomNumber !== 'string') throw new Error('roomNumber is not a string');
		if (typeof this.breakfast !== 'boolean') throw new Error('breakfast is not a boolean');
		if (typeof this.dinner !== 'boolean') throw new Error('dinner is not a boolean');
		if (typeof this.citypass !== 'boolean') throw new Error('citypass is not a boolean');
		if (typeof this.price !== 'number') throw new Error('price is not a number');
		if (typeof this.date !== 'string') throw new Error('date is not a string');
		
		// 모든 정보가 required인것 같음
		// required info chk
		if (!this.price) throw new Error('price is null');
		if (!this.date) throw new Error('date is null');
	}

}
