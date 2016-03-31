let setItemSchema = function (db) {
    let isHTML = function (str) {
        var a = document.createElement('div');
        a.innerHTML = str;
        for (var c = a.childNodes, i = c.length; i--; ) {
            if (c[i].nodeType == 1) return true;
        }

        return false;
    };

    return Astro.Class({
        name: 'Item',
        collection: db,
        fields: {
            container: 'string',
            containerId: 'string',
            appId: 'string',
            data: {
                type: 'object',
                default: function () {
                    return {};
                }
            },
            dataArchive: {
                type: 'object',
                default: function () {
                    return {};
                }
            },
            ownerId: 'string',
            publishedAt: 'date',
            tags: {
                type: 'array',
                default: function () {
                    return [];
                }
            }
        },
        behaviors: {
            timestamp: {
                hasCreatedField: true,
                createdFieldName: 'createdAt',
                hasUpdatedField: true,
                updatedFieldName: 'updatedAt'
            }
        },
        events: {
            'beforeSave': function(e) {
                //store tags
                this.set('tags', _.values(this.data));
            }
        },
        methods: {
            getId: function () {
                return _.isUndefined(this._id._str) ? this._id : this._id.valueOf();
            },
            getFirstField: function () {
                let data = null;
                _.each(this.data, (value, key) => {
                    if (!_.isUndefined(value)
                        && !_.isNull(value)
                        && value.length !== 0
                        && _.isString(value)
                        && !isHTML(value)
                        && _.isNull(data)) {
                        data = value;
                    }
                });

                return !_.isNull(data) ? data : `Item ${this._id.valueOf()}`;
            },
            relDate: function () {
                return moment(this.createdAt).fromNow()
            }
        }
    });
};

//For paid user
ItemsPaid = new Mongo.Collection("items", {idGeneration: 'MONGO'});

ItemPaid = setItemSchema(ItemsPaid);

//For free user
if (Meteor.isServer) {
    let data = {idGeneration: 'MONGO'};
    if (typeof(process.env.FREE_MONGO_URL) !== 'undefined') {
        data['_driver'] = new MongoInternals.RemoteCollectionDriver(process.env.FREE_MONGO_URL);
    }

    ItemsFree = new Mongo.Collection("items_free", data);
}

if (Meteor.isClient) {
    ItemsFree = new Mongo.Collection("items_free", {idGeneration: 'MONGO'});
}

ItemFree = setItemSchema(ItemsFree);
