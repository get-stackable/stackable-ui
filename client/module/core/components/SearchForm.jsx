SearchForm = class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: FlowRouter.getParam('query') || ''
        };
    }

    onChange(inputName, e) {
        let change = {};
        change[inputName] = e.target.value;
        this.setState(change);
    };

    doSearch = (e) => {
        let ENTER = 13;

        //only search if search term is more then 2 chars
        if (this.state.query.length > 2 && e.keyCode == ENTER) {
            FlowRouter.go('/search/:query', {query: this.state.query});
        }
    };

    render() {
        return (
            <div className="ui search">
                <div className="ui icon input">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search in all stacks..."
                        value={this.state.query}
                        onChange={this.onChange.bind(this, 'query')}
                        onKeyUp={this.doSearch} />
                    <i className="search icon"></i>
                </div>
                <div className="results"></div>
            </div>
        )
    }
};
