'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _standupServer = require('../controllers/standup.server.controller');

var _standupServer2 = _interopRequireDefault(_standupServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET /standup/  */
router.get('/', function (req, res) {
  return _standupServer2.default.list(req, res);
});

/* POST /standup/ filter by member name - hame page */
router.post('/', function (req, res) {
  return _standupServer2.default.filterByMember(req, res);
});

/* GET New Note page /standup/newnote  */
router.get('/newnote', function (req, res) {

  return _standupServer2.default.getNote(req, res);
});

/* POST New Note page /standup/newnote  */
router.post('/newnote', function (req, res) {
  console.log(req.body);
  return _standupServer2.default.create(req, res);
});

exports.default = router;