import React from 'react';
// import PropTypes from 'prop-types';


class Loading extends React.Component {
  // propTypes: {
  //     active: React.PropTypes.bool.isRequired
  // },

  render() {
    return (
        <div className={classNames('ui inverted dimmer', {active: this.props.active})}>{/*eslint-disable-line*/}
          <div className="ui medium loader" />
        </div>
    );
  }
}

export default Loading;
