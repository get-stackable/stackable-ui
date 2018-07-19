import React from 'react';
import * as filestack from 'filestack-js';

class ReactFilestack extends React.Component {
  handleOpen() {
    const options = {
      maxFiles: 20,
      uploadInBackground: false,
      onOpen: () => console.log('opened!'),
      onUploadDone: res => console.log(res),
    };
    const client = filestack.init('AHjPxoUVWSSWxcFhe6kvrz');
    client.picker(options).open();
  }
  render() {
    return (
      <div>
        <input type="file" onClick={this.handleOpen} />
      </div>
    );
  }
}

export default ReactFilestack;
