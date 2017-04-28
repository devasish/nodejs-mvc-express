var express = require('express');
var io = require('../lib/io');
module.exports = function() {
    Object.assign(this, new (require('../lib/loader')));
    this.router = express.Router();
    this.io = io;
}

