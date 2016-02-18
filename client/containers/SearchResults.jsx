class SearchResultsInner extends React.Component {
    static defaultProps = {
        query: null,
        items: []
    }

    static propTypes = {
        query: React.PropTypes.string.isRequired,
        items: React.PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            currentCount: SiteSettings.limit
        };
    }

    renderItems() {
        return this.props.users.map((item) => {
            return (
                <li>test</li>
            )
        });
    }

    render () {
        return (
            <div className="ui grid">
                <ul>
                    {this.renderItems()}
                </ul>
            </div>
        )
    }
}

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
            items: Item.find({}, this.state.currentCount)
        }
    }

    render() {
        return (
            <SearchResultsInner
                query={this.props.query}
                items={this.data.items} />
        )
    }
};

reactMixin(SearchResults.prototype, ReactMeteorData);
