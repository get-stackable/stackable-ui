import React from 'react';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import config from '../../utils/config';
import Header from './Header';
import Sidebar from './Sidebar';

class Layout extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          isDesktop: true
      };
  }

  componentDidMount() {
    //   Session.setDefault('active.app', {});
    //   Session.setDefault('app.modal', false);
    //   Session.setDefault('app.create.modal', false);

      window.addEventListener('resize', this.handleResize);
      this.checkDesktop();

    //   Smooch.init({ appToken: '101mfmxkapg9rc28mi907efeh' });
  }

  checkDesktop() {
      if (window.innerWidth < 1200) {
          this.setState({isDesktop: false});
      } else {
          this.setState({isDesktop: true});
      }
  }

  handleResize() {
      this.checkDesktop();
  };

  render() {
      const {children}=this.props;

      return (
        <div className="full-height">
          <Helmet title={config.siteName} />
          <Header />
          <div className="main container">
            <div className="ui grid full-height">
              <div className={classNames('column sidebar', {'one wide': this.state.isDesktop, 'two wide': !this.state.isDesktop})}>
                <Sidebar />
              </div>
              <div className={classNames('column main-right-container', {'fifteen wide': this.state.isDesktop, 'fourteen wide': !this.state.isDesktop})}>
                {children}
              </div>
            </div>
          </div>
        </div>
      )
  }
};

export default Layout;
