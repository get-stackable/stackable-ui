import React from 'react';

export default class PageHeading extends React.Component {
  render() {
    return (
      <div className="ui large header page heading">{this.props.children}</div>
    );
  }
}
