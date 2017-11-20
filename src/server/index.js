import express from 'express';
import config from 'config';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'winston';
import apiRoutes from './api-routes';
// import { MongoDB } from './database/mongo';

// swagger


// cb is optional
export default (cb) => {
  const app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json({limit: 1024}));
  app.use((req, res, next) => { // Log requests
    logger.info(`Request - ${req.method} - PATH : ${req.originalUrl} - ${new Date()}`);
    next();
  });
	
  app.use('/javascripts', express.static(path.join(__dirname, '../../dist-client/javascripts')));
	app.use('/api', apiRoutes);
	
  // swagger default path
  app.use('/api/swagger.json', function(req, res) {
		res.json(require('./api/swagger.json'));
  });
  
  // swagger-ui
	app.use('/swagger-ui', express.static(path.join(__dirname, '../../node_modules/swagger-ui-dist')));
	app.use('/swagger', (req, res) => {
		res.redirect('/swagger-ui?url=/api/swagger.json');
	});

  // swagger-editor
	app.use('/swagger-editor', express.static(path.join(__dirname, '../../node_modules/swagger-editor-dist')));
	app.use('/editor', (req, res) => {
		res.redirect('/swagger-editor?url=/api/swagger.json');
	});

  app.get('*', (req, res) => {
    if (!res.headersSent) // eslint-disable-line curly
      res.sendFile(path.join(__dirname, '../../dist-client/index.html'));
  });

  // global error catcher, need four arguments
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    /* eslint-disable no-console */
    console.error('Error on request %s %s', req.method, req.url);
    console.error(err.stack);
    /* eslint-enable */
    res.status(500).send('Server error');
  });

  // MongoDB.insert((err) => {
  //   if (err) console.log(err);
  //   else console.log('-----success');
  // }, 'book', {name: 'alice'}, {name: 'bob'});

  process.on('uncaughtException', evt => {
    console.log('uncaughtException: ', evt); // eslint-disable-line no-console
  });

  const port = process.env.PORT || config.port;
  const server = app.listen(port, cb ? cb : () => {
    console.log(`Listening on port ${port}`); // eslint-disable-line no-console
  });
  return server;
};
