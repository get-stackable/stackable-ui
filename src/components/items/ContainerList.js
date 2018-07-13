import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const containersQuery = gql`
  query($appId: ID!) {
    allContainers(appId: $appId) {
      id
      name
      isSingleItem
    }
  }
`;

class ContainerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerId: this.props.containerId,
    };
  }
  render() {
    const { containerId } = this.state;
    return (
      <Query
        query={containersQuery}
        variables={{ appId: '5b41d6ca25a78576e6e64e82' }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :</p>;
          return (
            <React.Fragment>
              {data.allContainers.map(container => (
                <a
                  className={`item ${containerId === container.id && 'active'}`}
                  onClick={() => this.setState({ containerId: container.id })}
                  key={container.id}
                >
                  <i className="circle icon" />
                  <div className="content">{container.name}</div>
                </a>
              ))}
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

// const ContainerList = () =>
//   this.props.allContainers.map(container => {
//     const isActive = container.id === this.props.container.id;
//     return (
//       <a
//         className={classNames('item', { active: isActive })}
//         key={container.id}
//         // onClick={() =>
//         //   FlowRouter.go('itemContainerView', { containerId: container.id })
//         // }
//       >
//         <i className="circle icon" />
//         <div className="content">
//           {container.isSingleItem
//             ? titleize(container.name)
//             : titleize(pluralize(container.name))}
//         </div>
//       </a>
//     );
//   });

export default ContainerList;
