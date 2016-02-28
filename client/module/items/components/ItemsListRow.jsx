ItemsListRow = class ItemsListRow extends React.Component {
    static propTypes = {
        item: React.PropTypes.object.isRequired
    };

    deleteItem () {
        Meteor.call('item.delete', this.props.item._id, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('Item deleted successfully!');
            }
        });
    };

    render() {
        let dataKeys = _.keys(this.props.item.data);

        return (
            <tr>
                <td>
                    <a href={FlowRouter.path('itemUpdate', {id: this.props.item._id})}>
                        {this.props.item.data[dataKeys[0]]}
                    </a>
                </td>
                <td>
                    -
                </td>
                <td>
                    {/* <ConfirmModal
                        buttonText="delete"
                        buttonClass="mini negative ui button"
                        modalTitle="Do you want to delete this item?"
                        modalDescription={`All the data in this item will be deleted!`}
                        accepted={() => this.deleteItem()}/>*/}
                    <a
                        className="mini negative ui button"
                        onClick={() => this.deleteItem()}>
                        delete
                    </a>
                </td>
            </tr>
        )
    }
};
