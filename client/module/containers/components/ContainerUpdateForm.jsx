var fieldTypes = [
  {
    title: 'Text Field',
    value: 'text'
  }, {
    title: 'Text Editor',
    value: 'textArea'
  }, {
    title: 'Number',
    value: 'number'
  }, {
    title: 'Boolean',
    value: 'boolean'
  }, {
    title: 'Json',
    value: 'json'
  }, {
    title: 'Enom (Select)',
    value: 'enom'
  }
];

ContainerUpdateForm = class ContainerUpdateForm extends React.Component {
  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    container: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      items: [],
      itemModalVisible: false,
      activeItemInModal: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isUndefined(nextProps.container)) {
      this.setState({name: nextProps.container.name, items: nextProps.container.items});
    }
  }

  openItemModal = (item) => {
    this.setState({itemModalVisible: true, activeItemInModal: item});
  };

  updateItem (item) {
    let items = this.state.items;

    //find in array
    let index = lodash.findIndex(items, {_id: item._id});
    if (index == '-1') {
      //new item
      items.push(item);
    } else {
      //update item
      items[index] = item;
    }

    this.setState({items});
  };

  render() {
    return (
      <div className="ui grid full-height" style={{
        'marginLeft': '0'
      }}>
        <div className="two wide column side-sub-menu">
          <div className="ui left vertical menu">
            <h3 className="ui header item">
              Containers
            </h3>
            <a className="ui orange button item">
              Containers Tools
            </a>
            <a className="ui button item">
              Create Containers
            </a>
            <a className="ui button item">
              Edit Containers
            </a>
            <div className="item">
              <small>With great power comes with great responsibility</small>
            </div>
          </div>
        </div>
        <div className="fourteen wide column" style={{
          'paddingLeft': '0'
        }}>
          <div className="content-wrapper" style={{
            'padding': '25px 35px !important'
          }}>
            <div className="ui two column grid">
              <div className="column">
                <div className="ui form">
                  <div className="field">
                    <label className="hidden">Type container name here</label>
                    <input type="text" name="name" placeholder="Type container name here"/>
                  </div>
                </div>
              </div>
              <div className="column">
                <button className="ui right labeled icon button" onClick={this.props.handleSubmit.bind(this, this.state)}>
                  <i className="save icon"></i>
                  Save
                </button>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui stackable tabs menu">
              {fieldTypes.map((item) => {
                return <a key={item.value} className="item" onClick={this.openItemModal.bind(this, {type: item.value})}>{item.title}</a>
              })}
            </div>
            <div className="ui divider"></div>
            <table className="ui basic celled table">
              <tbody>
                {this.state.items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {item.name}
                      </td>
                      <td>
                        {item.type}
                      </td>
                      <td>
                        <a onClick={this.openItemModal.bind(this, item)}>validations</a>
                      </td>
                      <td>
                        <a onClick={this.openItemModal.bind(this, item)}>configure</a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <ContainerItemModal
          visible={this.state.itemModalVisible}
          item={this.state.activeItemInModal}
          toggleModal={() => this.setState({itemModalVisible: false})}
          update={(item) => this.updateItem(item)}/>
      </div>
    )
  }
}
