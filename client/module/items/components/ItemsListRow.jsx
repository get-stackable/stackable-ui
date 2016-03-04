ItemsListRow = class ItemsListRow extends React.Component {
    static propTypes = {
        item: React.PropTypes.object.isRequired,
        app: React.PropTypes.object.isRequired
    };

    deleteItem () {
        alertify.confirm('Do you want to delete this item?', 'Deleting this item will delete it permanently!',
            () => {
                Meteor.call('item.delete', this.props.item._id, (err) => {
                    if (!err) {
                        FlashMessages.sendSuccess('Item deleted successfully!');
                    }
                });
            },
            () => {
                //cancel
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
                    <a href={StackableApi.getItem(this.props.app.publicKey, this.props.item._id)} target="_blank" title="Get container items API URL">
                        <i className="share icon"></i>
                    </a>
                </td>
                <td>
                    <a
                        className="mini ui button"
                        href={FlowRouter.path('itemUpdate', {id: this.props.item._id})}>
                        view
                    </a>
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
