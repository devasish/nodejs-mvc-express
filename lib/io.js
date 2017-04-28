module.exports = {
    status : {
        OK : 1,
        ERR : 0
    },
    response : function(res, params) {
        var responseObj = {};
        responseObj.httpStatus      = typeof params.httpStatus !== 'undefined'  ? params.httpStatus : 200;
        responseObj.apiStatus       = typeof params.status !== 'undefined'      ? params.status : this.status.OK;
        responseObj.apiStatusMsg    = typeof params.message !== 'undefined'     ? params.message : responseObj.status;
        responseObj.data            = typeof params.data !== 'undefined'        ? params.data : [];
        
        res.send(JSON.stringify(responseObj));
    }
}


