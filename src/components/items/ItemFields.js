import React from 'react';

class ItemFields extends from React.Component {
  render(){
    let containerItems = _.sortBy(this.props.container.items, 'listing_order');

        return containerItems.map((schema) => {
            //console.log(schema);

            //if field is disabled
            if (schema.isDisabled) {
                return;
            }

            let field = null;
            if (schema.type === 'text') {
                field = <TextInput
                    name={schema.slug}
                    value={this.state[schema.slug]}
                    onChange={this.onChange.bind(this, schema.slug)}/>;
            } else if (schema.type === 'number') {
                field = <NumberInput
                    name={schema.slug}
                    value={this.state[schema.slug]}
                    onChange={this.onChange.bind(this, schema.slug)}/>;
            } else if (schema.type === 'textArea') {
                //todo do validation
                field = <MarkdownEditor
                    text={this.state[schema.slug]}
                    onChange={this.onChange.bind(this, schema.slug)}
                    className="mardown-editor-container"
                    isRequired={schema.isRequired}
                    validations={schema.validations}/>;
            } else if (schema.type === 'boolean') {
                field = <BooleanInput
                    name={schema.name}
                    value={this.state[schema.slug]}
                    onChange={this.onChange.bind(this, schema.slug)}/>;
            } else if (schema.type === 'json') {
                field = <JsonInput
                    name={schema.slug}
                    value={this.state[schema.slug]}
                    onChange={this.onChange.bind(this, schema.slug)}/>;
            } else if (schema.type === 'enom') {
                //todo do isRequired
                field = <EnomInput
                    name={schema.slug}
                    value={this.state[schema.slug]}
                    onChange={this.onChange.bind(this, schema.slug)}
                    options={!_.isUndefined(schema.validations.options) ? schema.validations.options : ''}/>;
            } else if (schema.type === 'image') {
                //todo do validation
                field = <FileInput
                    name={schema.slug}
                    file={!_.isUndefined(this.state[schema.slug]) && !_.isNull(this.state[schema.slug]) ? this.state[schema.slug].url : null}
                    onUpload={(err, res) => this.onFileUpload(err, res, schema.slug)}
                    isRequired={schema.isRequired}
                    validations={schema.validations}/>;
            } else if (schema.type === 'relation') {
                //todo do isRequired
                field = <RelationInput
                    name={schema.slug}
                    relations={schema.relations}
                    value={this.state[schema.slug]}
                    onChange={(data) => this.onChange(schema.slug, data)}
                    isRequired={schema.isRequired} />;
            }

    return(
                <div className="field" key={schema._id}>
                    <label style={{'color':'#34383c','fontWeight':'400'}}>
                        {titleize(schema.name)}
                        {schema.isRequired ? <span className="red">*</span> : '' }
                    </label>
                    {field}
                    <p className="field-description">{schema.description}</p>
                </div>
    )
  }
}