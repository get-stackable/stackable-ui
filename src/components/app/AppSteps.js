import React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import PageHeading from '../core/PageHeading';

class AppSteps extends React.Component {
  //   static propTypes = {
  //       app: React.PropTypes.object.isRequired
  //   };

  constructor(props) {
    super(props);

    this.state = {
      itemStepDisabled: true,
    };
  }

  render() {
    const { id } = this.props;
    return (
      <div>
        <PageHeading>Well Done!</PageHeading>
        <div className="ui grid padding35 app view">
          <div className="ten wide centered column">
            <div className="ui items">
              <div className="item">
                <div className="ui small image">
                  <img src="/images/icon-container.png" alt="icon-container" />
                </div>
                <div className="middle aligned content">
                  <div className="header">Create your first container</div>
                  <div className="description">
                    <p>
                      Containers hold your items, tell us what kind of items you
                      want to store by creating your container
                    </p>
                  </div>
                </div>
                <div className="extra">
                  <Link to={{ pathname: `/containers/${id}` }}>
                    <button className="ui right floated green button">
                      + create new container
                    </button>
                  </Link>
                </div>
              </div>
              <div
                className={classNames('item', {
                  disabled: this.state.itemStepDisabled,
                })}
              >
                <div className="ui small image">
                  <img src="/images/icon-items.png" alt="icon-items" />
                </div>
                <div className="middle aligned content">
                  <div className="header">Add items to your container</div>
                  <div className="description">
                    <p>
                      These might be blog posts, products or data driving your
                      mobile app
                    </p>
                  </div>
                </div>
                <div className="extra">
                  <div className="ui right floated green button">
                    + create new item
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppSteps;
