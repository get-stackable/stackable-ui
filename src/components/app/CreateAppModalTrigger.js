import React from 'react';


class CreateAppModalTrigger extends React.Component {
  constructor(props) {
    super(props);

    this.loadModal(props);
  }

  componentWillUpdate(nextProps) {
    this.loadModal(nextProps);
  }

  // loadModal(props) {
  //   $('#app-create-modal')
  //     .modal({
  //       detachable: false,
  //       onHidden() {
  //         Session.set('app.create.modal', false);
  //       },
  //     })
  //     .modal(props.modalVisible ? 'show' : 'hide');
  // }

  render() {
    return <div />;
  }
}

export default CreateAppModalTrigger;
