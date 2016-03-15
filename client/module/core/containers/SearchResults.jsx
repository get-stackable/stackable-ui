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
            <div>
                <PageHeading>
                    Search Results for {this.props.query}
                </PageHeading>
                <div className="ui grid full-height" style={{'marginLeft': '0'}}>
                    <div className="sixteen wide column" style={{'paddingLeft': '0'}}>
                        <div className="content-wrapper">
                            <div className="ui grid">
                                <div className="sixteen wide column padding35">
                                    {this.data.items.length === 0 ?
                                        <div className="ui segment">
                                            <p>No items found.</p>
                                        </div>
                                    :
                                        <table className="ui celled table" style={{'marginTop': '35px'}}>
                                            <thead>
                                            <tr>
                                                <th>Item Name</th>
                                                <th>Container</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.data.items.map((item) => {
                                                return (
                                                    <tr key={item.getId()}>
                                                        <td>
                                                            <a href={FlowRouter.path('itemUpdate', {id: item.getId()})}>
                                                                {item.getFirstField()}
                                                            </a>
                                                        </td>
                                                        <td>
                                                            <a href={FlowRouter.path('itemContainerView', {containerId: item.containerId})}>
                                                                {titleize(item.container)}
                                                            </a>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

reactMixin(SearchResults.prototype, ReactMeteorData);
