export default class {
	constructor(guestName, guestNumber, room, date, price, options) {
		this.guestName = guestName;					// string
		this.guestNumber = guestNumber;				// number
		this.room = room;							// Array
		this.date = date;							// string
		this.price = price;							// number
		this.options = options;						// array

		this.validate();
	}

	validate() {
		// type check
		if (typeof this.roomNumber !== 'string') throw new Error('roomNumber is not a string');
		if (typeof this.guestNumber !== 'number') throw new Error('guestNumber is not a number');
		if (typeof this.room !== 'array') throw new Error('room is not a array');
		if (typeof this.date !== 'string') throw new Error('date is not a string');
		if (typeof this.price !== 'number') throw new Error('price is not a number');
		if (typeof this.options !== 'array') throw new Error('options is not a array');
		
		// 모든 정보가 required인것 같음
		// required info chk
		if (!this.guestName) throw new Error('guestName is null');
		if (!this.price) throw new Error('price is null');
	}

}
