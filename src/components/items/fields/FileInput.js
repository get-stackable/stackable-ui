import React from 'react';
import Dropzone from 'react-dropzone';

const dropZoneStyle = {
  position: 'relative',
  width: 'none',
  height: 'none',
  borderWidth: 'none',
  borderColor: 'none',
  borderStyle: 'none',
  borderRadius: 'none',
};

const icon = {
  float: 'right',
  fontSize: ' 2rem',
  margin: '0rem 2rem',
};

class FileInput extends React.Component {
  constructor() {
    super();
    this.state = { files: [] };
  }

  onDrop(files) {
    this.setState({
      files,
    });
  }

  render() {
    return (
      <section>
        <Dropzone onDrop={files => this.onDrop(files)} style={dropZoneStyle}>
          <button className="ui button" style={{ width: '100%' }}>
            Upload
          </button>
        </Dropzone>
        <br />
        <aside>
          {this.state.files.map(f => (
            <div className="ui segment" key={f.name}>
              <p>
                {f.name} - {f.size} bytes
                <a style={icon}>
                  <i className="close icon" />
                </a>
                <a style={icon}>
                  <i className="eye icon" />
                </a>
              </p>
            </div>
          ))}
        </aside>
        <b />
      </section>
    );
  }
}

export default FileInput;
