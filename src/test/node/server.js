import test from 'tape';
import startServer from '../../server';

test('application server', t => {
  let server;
  const onServer = () => {
    t.ok(server, 'should expose server instance');
    // ?
    server.close(t.end);
  };

  // 여기서 startServer() 실행할 때 왜 server변수에 할당?
  server = startServer(onServer);
});



/* 
test([name], [opts], cb)

t.ok(value, msg)
t.end(err)

*/

