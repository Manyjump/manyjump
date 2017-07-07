var express = require('express');
const SocketServer = require('ws').Server;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET WS test page. */
router.get('/ws', function(req, res, next) {
  res.render('wstest', { title: 'Web Socket Test' });
});

module.exports = router;
