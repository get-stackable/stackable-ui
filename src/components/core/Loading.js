import React from 'react';
import classNames from 'classnames';

export default () => (
  <div className={classNames('ui inverted dimmer', {active: this.props.active})}>
    <div className="ui medium loader" />
  </div>
);
