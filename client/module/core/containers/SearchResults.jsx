SearchResults = class SearchResults extends React.Component {
    static defaultProps = {
        query: null
    };

    static propTypes = {
        query: React.PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            currentCount: SiteSettings.limit
        };
    }

    getMeteorData() {
        //let find = {};
        //
        //if (!_.isNull(this.props.query)) {
        //    let queryRegex = ".*" + this.props.query + ".*";
        //    find = {
        //        $or: [
        //            {"data": {$regex: queryRegex, $options: 'i'}}
        //        ]
        //    };
        //}

        return {
            //items: //Item.find(find, this.state.currentCount).fetch()
            items: Item.find().fetch()
        }
    }

    render() {
        return (
            <div className="ui grid full-height" style={{'marginLeft': '0'}}>
                <div className="sixteen wide column" style={{'paddingLeft': '0'}}>
                    <div className="content-wrapper">
                        <div className="ui grid">
                            <div className="sixteen wide column padding35">
                                <table className="ui celled table" style={{'marginTop': '35px'}}>
                                    <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.data.items.map((item) => {
                                        let dataKeys = _.keys(item.data);
                                        return (
                                            <tr key={item._id}>
                                                <td>
                                                    <a href={FlowRouter.path('itemUpdate', {type: item.container, id: item._id})}>
                                                        {item.data[dataKeys[0]]}
                                                    </a>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <a
                                                        className="mini negative ui button"
                                                        onClick={() => this.deleteItem(item._id)}>
                                                        delete
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

reactMixin(SearchResults.prototype, ReactMeteorData);
