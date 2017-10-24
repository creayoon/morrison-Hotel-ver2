// import mongoMock from 'mongo-mock';
import test from 'tape';
import {MongoDB/*, MongoClient*/} from '../../../server/database/mongo';


const collection = 'testCollection';

const dataAlice = {
	name: 'Alice',
	age: '1'
};

// const dataUser = {
// 	social: '',
// 	image: '',
// 	name: ''
// }

// instance add later

test('MongoDB insert one', t => {
	MongoDB.insert((err) => {
		if (err) {
			t.fail();
		}
		t.end();
	}, collection, dataAlice);
});

