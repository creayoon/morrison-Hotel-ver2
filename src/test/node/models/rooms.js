import test from 'tape';
import RoomModel from '../../../server/models/room';


// RoomModel test
test('RoomModel with valid argument test', t => {
  try {
    var room1 = new RoomModel();
    t.fail();
  } catch (err) {
    t.skip('success');
  }
  t.end();
});


test('RoomModel with valid argument test', t => {
  const expected = {
    roomNumber: '201',
    roomType: 'Deluxe',
    facility: ['labtop', 'television']
    roomSize: '33m',
    bedSize : 'Queen',
    availableGuest: 4,
    acceptChild: 2,
    blueprint: 'http://some.blueprint.here.com',
    image: 'http://some.image.here.com',
    defaultPrice: 280000
  };

  const room = new RoomModel(280000);
  t.equal(expected.defaultPrice, room.defaultPrice, 'should be same price');
  t.end();
});
