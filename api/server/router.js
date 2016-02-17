JsonRoutes.setResponseHeaders({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  'Access-Control-Allow-Headers': 'Content-Type'
});

JsonRoutes.add("get", "/entries/:type", function (req, res, next) {
  var type = req.params.type;

  JsonRoutes.sendResult(res, {
    data: Entry.find({contentType: type}, {fields: {'_id':1, 'data':1, 'contentType':1}}).fetch()
  });
});
