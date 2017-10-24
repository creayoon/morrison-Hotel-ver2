export default class TopicController {
  static get(req, res, cb) {
  	let header = { token: 12345 }
  	let text = 'Hello world!';

  	let data = { header: header, text: text }

    res.send(data);
    cb();
  }
}


// function test (a:Number, b:String) {
// 	const obj = {num: a, str: b};
// 	const tempNum = 1;
// 	const tempString = 'hello';

// 	//...

// 	return tempNum + tempSring;
// }