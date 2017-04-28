var Base = new (require('./BaseController'))();

Base.router.get('/', function(req, res, next) {
  res.send('Hello');
});

Base.router.get('/hello', function(req, res, next) {
  res.send('Hello');
});

module.exports = Base.router;
