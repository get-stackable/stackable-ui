let Items = new Mongo.Collection("items", {idGeneration: 'MONGO'});

Item = Astro.Class({
    name: 'Item',
    collection: Items,
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
                if (value.length !== 0 && _.isNull(data)) {
                    data = value;
                }
            });

            return !_.isNull(data) ? data : 'Item Update';
        }
    }
});
