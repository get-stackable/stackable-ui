SearchContainersForm = class SearchContainersForm extends React.Component {
    static propTypes = {
        doSearch: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            query: null
        };
    }

    componentDidMount() {
        //$('.ui.dropdown.refine').dropdown();
    }

    onChange(inputName, e) {
        let change = {};
        change[inputName] = e.target.value;
        this.setState(change);
    };

    doSearch = (e) => {
        let ENTER = 13;

        if (e.keyCode == ENTER) {
            this.props.doSearch(this.state.query.length > 0 ? this.state.query : null);
        }
    };

    render() {
        return (
            <div className="ui search big">
                <div className="ui icon input">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search containers..."
                        value={this.state.query}
                        onChange={this.onChange.bind(this, 'query')}
                        onKeyUp={this.doSearch} />
                    <i className="search icon"></i>
                </div>
                <div className="results"></div>
                {/*<div className="ui dropdown refine">
                    <div className="text">refine results</div>
                    <i className="dropdown icon"></i>
                    <div className="menu">
                        <div className="item">container 1</div>
                        <div className="item">container 2</div>
                        <div className="item">container 3</div>
                    </div>
                </div>*/}
            </div>
        )
    }
};
