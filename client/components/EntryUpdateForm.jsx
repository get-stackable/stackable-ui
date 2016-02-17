EntryUpdateForm = class EntryUpdateForm extends React.Component {
    static defaultProps = {
        entry: {}
    };

    static propTypes = {
        entry: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
      let stateData = {};
      nextProps.entry.dataSchema.map((schema) => {
        stateData[schema.title] = nextProps.entry.data[schema.title];
      });
      this.setState(stateData);
    }

    onChange = (inputName, e) => {
        let change = {};
        change[inputName] = !_.isUndefined(e.target) ? e.target.value : e;
        this.setState(change);
    };

    loadFields() {
      if (_.isUndefined(this.props.entry.dataSchema)) {
        return;
      }

      return this.props.entry.dataSchema.map((schema, index) => {
        return (
          <div key={index}>
              <label>{schema.title}</label>
              <input
                type="text"
                value={this.state[schema.title]}
                onChange={this.onChange.bind(this, schema.title)} />
          </div>
        )
      });
    }

    handleSubmit = () => {
        Meteor.call('entry.update', this.props.entry._id, this.state, (err, res) => {
            //console.log(err, res);
        });
    };

    render() {
        return (
            <div>
                {this.loadFields()}
                <div>
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        )
    }
};
