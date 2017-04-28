var phpjs = require('phpjs')
module.exports = function(){
    this.util = phpjs;
    this.loadModel = function(modelName, db) {
        var ModelObj    = require('../models/' + modelName);
        ModelObj.db     = db;
        ModelObj.util   = phpjs;
        
        return ModelObj;
    }
    
    this.loadController = function(controllerName) {
        return require('../controllers/' + controllerName);
    }
}

