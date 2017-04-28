var config  = require('../config/config');
var sql     = require('mssql');

module.exports = function() {
    var self    = this;
    this.sql    = sql;
    this.config = config;
}

//module.exports.prototype = {
//    config : config
//}

