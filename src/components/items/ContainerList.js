import React from 'react';

const ContainerList = () =>
  this.props.allContainers.map(container => {
    const isActive = container.id === this.props.container.id;
    return (
      <a
        className={classNames('item', { active: isActive })}
        key={container.id}
        onClick={() =>
          FlowRouter.go('itemContainerView', { containerId: container.id })
        }
      >
        <i className="circle icon" />
        <div className="content">
          {container.isSingleItem
            ? titleize(container.name)
            : titleize(pluralize(container.name))}
        </div>
      </a>
    );
  });

export default ContainerList;
