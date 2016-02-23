ContainerUpdate = class ContainerUpdate extends React.Component {
  getMeteorData() {
    let handle = Meteor.subscribe('containers.single', this.props.id);

    return {
      loading: !handle.ready(),
      container: Container.findOne(this.props.id)
    };
  }

  handleSubmit = (data) => {
    let formData = {
      name: data.name,
      items: data.items
    }
    
    Meteor.call('container.update', this.props.id, formData, (err, res) => {
      //console.log(err, res);
      if (!err) {
        FlashMessages.sendSuccess('Container updated successfully!');
      }
    });
  };

  render() {
    return (<ContainerUpdateForm container={this.data.container} handleSubmit={this.handleSubmit}/>)
  }
};

reactMixin(ContainerUpdate.prototype, ReactMeteorData);
