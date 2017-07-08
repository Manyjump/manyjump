const express = require('express');
const path = require('path');
const SocketServer = require('ws').Server;
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

/* GET WS test page. */
router.get('/ws', function(req, res, next) {
  res.render('wstest', { title: 'Web Socket Test' });
});

module.exports = router;
