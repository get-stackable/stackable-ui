import React from 'react';

// import Loading from '../components/core/Loading';
import AppSteps from '../components/app/AppSteps';
import Layout from '../components/core/Layout';

class AppView extends React.Component {
  // TODO:
  // getMeteorData() {
  //     let handle = Meteor.subscribe('containers.all', this.props.id);

  //     let data = {
  //         loading: true
  //     };

  //     if (handle.ready()) {
  //         let containers = Container.find({appId: this.props.id}, {sort: {createdAt: -1}}).fetch();

  //         if (containers.length !== 0) {
  //             FlowRouter.go('containersList', {appId: this.props.id});
  //             return;
  //         }

  //         data['app'] = Application.findOne(this.props.id);
  //         data['containers'] = containers;
  //         data['loading'] = false;
  //     }

  //     return data;
  // }

  // componentDidMount() {
  //     this.setActiveApp();
  // }

  // componentDidUpdate() {
  //     this.setActiveApp();
  // }

  // setActiveApp() {
  //     if (!_.isUndefined(this.data.app)) {
  //         Session.set('active.app', {
  //             id: this.data.app._id,
  //             name: this.data.app.name
  //         });
  //     }
  // }

  render() {
    return (
      <Layout>
        <AppSteps />
      </Layout>
    );
  }
}

export default AppView;
