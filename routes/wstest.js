const express = require('express');
const router = express.Router();

/* GET WS test page. */
router.get('/', function(req, res, next) {
  res.render('wstest', { title: 'Web Socket Test' });
});

module.exports = router;
