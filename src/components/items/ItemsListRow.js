import React from 'react';
import PropTypes from 'prop-types';
import alertify from 'alertify.js';
import { Link } from 'react-router-dom';

import StackableApi from '../../utils/StackableApi';

class ItemsListRow extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired
  };

  deleteItem () {
      alertify.confirm('Do you want to delete this item?', 'Deleting this item will delete it permanently!',
          () => {
              // TODO:
              // Meteor.call('item.delete', this.props.item._id, (err) => {
              //     if (!err) {
              //         FlashMessages.sendSuccess('Item deleted successfully!');
              //     }
              // });
          },
          () => {
              // cancel
          });
  };

  render() {
      return (
        <tr>
          <td>
            <Link to={{
            pathname: '/item/update',
            state: { id: this.props.item.getId() }
          }}
            >
              {this.props.item.getFirstField()}
            </Link>
          </td>
          <td>
            <a href={StackableApi.getItem(this.props.app.publicKey, this.props.item.getId())} target="_blank" title="Get container items API URL">
              <i className="share icon" />
            </a>
          </td>
          <td>
            <Link
              to={{
                pathname: '/item/update',
                state: { id: this.props.item.getId() }
              }}
              className="mini ui button"
            >
                      view
            </Link>
            <a
              className="mini negative ui button"
              onClick={() => this.deleteItem()}
            >
                      delete
            </a>
          </td>
        </tr>
      )
  }
};

export default ItemsListRow;
