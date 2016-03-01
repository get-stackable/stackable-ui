ContactFieldsPreview = class ContactFieldsPreview extends React.Component {
    static propTypes = {
        items: React.PropTypes.array.isRequired
    };

    loadPreviewFields() {
        let items = _.sortBy(this.props.items, 'listing_order');

        return items.map((schema) => {
            return (
                <div className="field" key={schema._id}>
                    <label style={{'color':'#34383c','fontWeight':'400'}}>{schema.name}</label>
                    {schema.type === 'text' ?
                        <TextInput
                            value=""
                            onChange={() => console.log('on change...')}/> : ''}
                    {schema.type === 'number' ?
                        <NumberInput
                            value=""
                            onChange={() => console.log('on change...')}/> : ''}
                    {schema.type === 'textArea' ?
                        <MarkdownEditor
                            text=""
                            onChange={() => console.log('on change...')}
                            className="mardown-editor-container"
                            options={{toolbar: {diffTop: -55}}}/> : ''}
                    {schema.type === 'boolean' ?
                        <BooleanInput
                            name="test-boolean"
                            value=""
                            onChange={() => console.log('on change...')}/> : ''}
                    {schema.type === 'json' ?
                        <JsonInput
                            name="test-json"
                            value=""
                            onChange={() => console.log('on change...')}/> : ''}
                    {schema.type === 'enom' ?
                        <EnomInput
                            name="test-enom"
                            value=""
                            onChange={() => console.log('on change...')}/> : ''}
                    {schema.type === 'image' ?
                        <FileInput
                            file={null}
                            onUpload={() => console.log('on upload...')}/> : ''}
                    {schema.type === 'relation' ?
                        <RelationInput
                            relations={schema.relations}
                            value=""
                            onChange={() => console.log('on change...')} /> : ''}
                </div>
            )
        });
    }

    render() {
        return (
            <div className="items-preview">
                <div className="ui medium header">
                    Container Preview
                </div>
                <div className="ui form">
                    {this.loadPreviewFields()}
                </div>
            </div>
        )
    }
};
