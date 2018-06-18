// import React from 'react';
// import { ReactDOM } from 'react-dom';

// import {
//   MediumEditor,
//   Placeholder,
//   FileDragging,
//   AnchorForm,
//   AutoLink,
// } from 'medium-editor';

// class MarkdownEditor extends React.Component {
//   // https://github.com/yabwe/medium-editor
//   static defaultProps = {
//     isRequired: false,
//     validations: {},
//     tag: 'div',
//     options: {
//       toolbar: { diffTop: -55 },
//       extensions: {
//         placeholder: new Placeholder(),
//         fileDragging: new FileDragging(),
//         anchor: new AnchorForm(),
//         autoLink: new AutoLink(),
//       },
//       placeholder: {
//         text: 'start typing, you can style content by selecting it!',
//       },
//     },
//   };

//   // static propTypes = {
//   //   onChange: React.PropTypes.func.isRequired,
//   //   text: React.PropTypes.string,
//   //   isRequired: React.PropTypes.bool,
//   //   validations: React.PropTypes.object,
//   // };

//   constructor(props) {
//     super(props);

//     this.state = {
//       text: props.text,
//     };
//   }

//   createMediumConfig() {
//     // build and return your medium config properties
//   }

//   componentDidMount() {
//     const _this = this;

//     const dom = ReactDOM.findDOMNode(this);

//     this.medium = new MediumEditor(dom, this.props.options);
//     this.medium.subscribe('editableInput', e => {
//       _this._updated = true;
//       _this.change(dom.innerHTML);
//     });
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.text !== this.state.text && !this._updated) {
//       this.setState({ text: nextProps.text });
//     }

//     if (this._updated) this._updated = false;
//   }

//   componentWillUnmount() {
//     this.medium.destroy();
//   }

//   change(text) {
//     if (this.props.onChange) this.props.onChange(text, this.medium);
//   }

//   render() {
//     const tag = this.props.tag;
//     const props = blacklist(
//       this.props,
//       'tag',
//       'contentEditable',
//       'dangerouslySetInnerHTML',
//     );

//     assign(props, {
//       contentEditable: true,
//       dangerouslySetInnerHTML: { __html: this.state.text },
//     });

//     return React.createElement(tag, props);
//   }
// }

// export default MarkdownEditor;
