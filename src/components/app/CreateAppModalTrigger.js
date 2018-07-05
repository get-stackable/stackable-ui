/* global $:true */
import React from 'react';

class CreateAppModalTrigger extends React.Component {
  constructor(props) {
    super(props);

    this.loadModal(props);
  }

  componentWillUpdate(nextProps) {
    this.loadModal(nextProps);
  }

  loadModal(props) {
    $('#app-create-modal')
      .modal({
        detachable: false,
        onHidden() {},
      })
      .modal(props.modelVisible === true ? 'show' : 'hide');
  }

  render() {
    return <div />;
  }
}

export default CreateAppModalTrigger;
