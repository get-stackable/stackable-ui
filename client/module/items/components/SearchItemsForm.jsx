SearchItemsForm = class SearchItemsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };
    }

    componentDidMount() {
        $('.ui.dropdown.refine').dropdown();
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
            console.log('do search', this.state.query);
        }
    };

    render() {
        return (
            <div className="ui search big">
                <div className="ui icon input">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search all items..."
                        value={this.state.query}
                        onChange={this.onChange.bind(this, 'query')}
                        onKeyUp={this.doSearch} />
                    <i className="search icon"></i>
                </div>
                <div className="results"></div>
                <div className="ui dropdown refine">
                    <div className="text">refine results</div>
                    <i className="dropdown icon"></i>
                    <div className="menu">
                        <div className="item">container 1</div>
                        <div className="item">container 2</div>
                        <div className="item">container 3</div>
                    </div>
                </div>
            </div>
        )
    }
};
