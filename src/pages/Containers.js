import React from 'react';

import Layout from '../components/core/Layout';
import SearchContainersForm from '../components/container/SearchContainersForm';
import ContainersList from '../components/container/ContainersList';

class Containers extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     query: null,
  //   };
  // }

  // getMeteorData() {
  //   const handle = Meteor.subscribe('containers.all', this.props.appId);

  //   let find = {};
  //   if (!_.isNull(this.state.query)) {
  //     let queryRegex = '.*' + this.state.query + '.*';
  //     find = {
  //       $or: [{ name: { $regex: queryRegex, $options: 'i' } }],
  //     };
  //   }

  //   return {
  //     loading: !handle.ready(),
  //     containers: Container.find(find, { sort: { createdAt: -1 } }).fetch(),
  //     app: Application.findOne(this.props.appId),
  //   };
  // }

  // componentDidMount() {
  //   this.setActiveApp();
  // }

  // componentDidUpdate() {
  //   this.setActiveApp();
  // }

  // setActiveApp() {
  //   if (!_.isUndefined(this.data.app)) {
  //     Session.set('active.app', {
  //       id: this.data.app._id,
  //       name: this.data.app.name,
  //     });
  //   }
  // }

  render() {
    // if (this.data.loading) {
    //   return <Loading active={true} />;
    // }

    return (
      <Layout>
        <div className="ui grid full-height" style={{ marginLeft: '0' }}>
          <div className="two wide column side-sub-menu">
            <div className="ui left vertical menu">
              <h3 className="ui header item">
                {/* {this.data.app.name}'s */}
                Containers
              </h3>
              <a className="ui orange button item">+ create container</a>
              <div className="item" />
            </div>
          </div>
          <div className="fourteen wide column" style={{ paddingLeft: '0' }}>
            <div className="content-wrapper">
              <div className="ui grid">
                <div className="sixteen wide column">
                  <SearchContainersForm />
                </div>
                <div className="sixteen wide column padding35">
                  <ContainersList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default Containers;
