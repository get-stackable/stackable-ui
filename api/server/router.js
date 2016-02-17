JsonRoutes.setResponseHeaders({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  'Access-Control-Allow-Headers': 'Content-Type'
});

JsonRoutes.add("get", "/entries/:id", function (req, res, next) {
  var id = req.params.id;

  JsonRoutes.sendResult(res, {
    data: Entry.findOne({_id: id}, {fields: {'_id':1, 'data':1, 'contentType':1}})
  });
});
