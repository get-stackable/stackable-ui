JsonRoutes.setResponseHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
});

let allowedFields = {'_id': 1, 'data': 1, 'contentType': 1};

JsonRoutes.add("get", "/api/items/:type/:id", function (req, res, next) {
    let data = {'success': false};
    let app = App.findOne({authKey: req.query.auth_key});

    if (app) {
        let query = {
            _id: req.params.id,
            container: req.params.type,
            appId: app._id
        };
        data = Item.findOne(query, {fields: allowedFields});
    }

    JsonRoutes.sendResult(res, {data});
});

JsonRoutes.add("get", "/api/items/:type", function (req, res, next) {
    let data = [];
    let domain = App.findOne({authKey: req.query.auth_key});

    if (domain) {
        let query = {
            contentType: req.params.type,
            appId: domain._id
        };
        data = Item.find(query, {fields: allowedFields}).fetch();
    }

    JsonRoutes.sendResult(res, {data});
});
