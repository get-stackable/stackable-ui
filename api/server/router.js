JsonRoutes.setResponseHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
});

let allowedFields = {'_id': 1, 'data': 1, 'contentType': 1};

JsonRoutes.add("get", "/api/entries/:type/:id", function (req, res, next) {
    let data = {'success': false};
    let domain = Domain.findOne({authKey: req.query.auth_key});

    if (domain) {
        let query = {
            _id: req.params.id,
            contentType: req.params.type,
            domainId: domain._id
        };
        data = Entry.findOne(query, {fields: allowedFields});
    }

    JsonRoutes.sendResult(res, {data});
});

JsonRoutes.add("get", "/api/entries/:type", function (req, res, next) {
    let data = [];
    let domain = Domain.findOne({authKey: req.query.auth_key});

    if (domain) {
        let query = {
            contentType: req.params.type,
            domainId: domain._id
        };
        data = Entry.find(query, {fields: allowedFields}).fetch();
    }

    JsonRoutes.sendResult(res, {data});
});
