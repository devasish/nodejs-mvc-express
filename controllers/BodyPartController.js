var Base = new (require('./BaseController'))();

Base.router.get('/', function (req, res, next) {
    var params = req.query;
    var Model = Base.loadModel('BodyPartModel', req.db);
    Model.getList(params, function (err, data) {
        if (err) {
            Base.io.response(res, {
               status : Base.io.status.ERR,
               message : err
           });
        }
        else {
            Base.io.response(res, {
                data: data
            });
        }
        
    });
});


Base.router.get('/getBodyPart', function (req, res, next) {
    var params = req.query;

   var Model = Base.loadModel('BodyPartModel', req.db);
    Model.getBodyPart(params, function (err, data) {
        if (err) {
            Base.io.response(res, {
               status : Base.io.status.ERR,
               message : err
           });
        }
        else {
            Base.io.response(res, {
                data: data
            });
        }
        
    });
});

Base.router.get('/bodyPartDtls', function (req, res, next) {

    var params = {};
    if (typeof req.query.bodyPartId != 'undefined' && parseInt(req.query.bodyPartId, 10) > 0) {
        params.bodyPartId = parseInt(req.query.bodyPartId, 10);
    }
    else  {
        Base.io.response(res, {
            status : Base.io.status.ERR,
            message : "Invalid Id"
        });
        return;
    }

   var Model = Base.loadModel('BodyPartModel', req.db);
    Model.getbodyPartDtls(params.bodyPartId, function (err, data) {
        if (err) {
            Base.io.response(res, {
               status : Base.io.status.ERR,
               message : err
           });
        }
        else {
            Base.io.response(res, {
                data: data
            });
        }
        
    });
});

Base.router.get('/symptom/:bodyPartId', function(req, res, next) {
    var params = {};
    if (typeof req.params.bodyPartId != 'undefined' && parseInt(req.params.bodyPartId, 10) > 0) {
        params.bodyPartId = parseInt(req.params.bodyPartId, 10);
    }
    else  {
        Base.io.response(res, {
            status : Base.io.status.ERR,
            message : "Invalid Id"
        });
        return;
    }
    
   var Model = Base.loadModel('BodyPartModel', req.db);
   Model.getSymptoms(params.bodyPartId, {}, function(err, data) {
       if (err) {
           Base.io.response(res, {
               status : Base.io.status.ERR,
               message : err,
           });
       }
       else {
           Base.io.response(res, {data : data});
       }
        
   });
   
});

module.exports = Base.router;
