import React from 'react';

const AllItems = () => {
  if (this.props.allItems.length === 0) {
    return (
      <div className="item">
        <div className="content">No items found.</div>
      </div>
    );
  }

  return this.props.allItems.map(item => {
    const isActive =
      !_.isUndefined(this.props.item) && item._id === this.props.item._id;
    return (
      <div className={classNames('item', { active: isActive })} key={item._id}>
        <div className="right floated content">
          {/* <div className="ui button">Add</div> */}
        </div>
        <div className="content">
          <a
            className="header"
            onClick={() => FlowRouter.go('itemUpdate', { id: item.getId() })}
            {item.getFirstField()}>
          </a>
          <div className="description">created {item.relDate()}</div>
        </div>
      </div>
    );
  });
};

const ItemList = () => (
  <div className="three wide column items-list">
    <a
      className="ui primary tiny right floated labeled icon button"
      style={{ marginRight: '10px' }}
      // href={FlowRouter.path('itemCreate', {
      //   containerId: this.props.container._id,
      // })}
    >
      <i className="plus icon" />
      create {pluralize(this.props.container.name.toLowerCase(), 1)}
    </a>
    <div
      className="ui middle aligned divided link list"
      style={{ marginTop: '40px' }}
    >
      {this.renderAllItems()}
    </div>
  </div>
);

export default ItemList;
