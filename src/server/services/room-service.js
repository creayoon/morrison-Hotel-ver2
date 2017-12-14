import Room from '../models/room';
import { MongoDB } from '../database/mongo';

export default class RoomService {
	static addRoom(roomInfo) { // eslint-disable-line no-unused-vars
		const room = new Room(roomInfo.id, roomInfo.name, roomInfo.social, roomInfo.image);

		// insert: input data count
		return MongoDB.insert('room', room)
			.then(result => {
				if (result.insertedCount > 0) {
					return result;
				}
				throw new Error('result count less then 0');
			});
	}

	static getRoom(id, res) { // eslint-disable-line no-unused-vars
		return MongoDB.read('room', { id: id })
				.then(result => {
					console.log('read result:::', result);
					if (result.length > 0) {
						return result;
					}
					throw new Error('result count less then 0');
				})
	}

	static getAllRoom(roomInfo, res) { // eslint-disable-line no-unused-vars
		return MongoDB.read('room', {})
		.then(result => {
			console.log('read result:::', result);
			if (result.length > 0) {
				return result;
			}
			throw new Error('result count less then 0');
		})
	}

	static updateRoom(roomInfo, res) { // eslint-disable-line no-unused-vars
		 
		const room = new Room(roomInfo.id, roomInfo.name, roomInfo.social, roomInfo.image);

		// insert: input data count
		// update(query, update, options)
		return MongoDB.update('room', room)
			.then(result => {
				if (result.modifiedCount > 0) {
					return result;
				}
				throw new Error('result count less then 0');
			})
			.catch(err => { throw err });
	}

	static deleteRoom(roomId, res) { // eslint-disable-line no-unused-vars
		return MongoDB.delete('room', { id: roomId })
		.then(result => {
			console.log('read result:::', result);
			if (result.deletedCount > 0) {
				return result;
			}
			throw new Error('result count less then 0');
		})
	}

}
