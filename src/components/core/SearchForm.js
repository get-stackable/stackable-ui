import React from 'react';

export default class SearchForm extends React.Component {
    // TODO:
//   constructor(props) {
//       super(props);

//       this.state = {
//           query: FlowRouter.getParam('query') || ''
//       };
//   }

//   onChange(inputName, e) {
//       const change = {};
//       change[inputName] = e.target.value;
//       this.setState(change);
//   };

//   doSearch = (e) => {
//       const ENTER = 13;

//       // trackEvent('Did Search');

//       // only search if search term is more then 2 chars
//       if (this.state.query.length > 2 && e.keyCode == ENTER) {
//           FlowRouter.go('/search/:query', {query: this.state.query});
//       }
//   };

  render() {
      return (
        <div className="ui search">
          <div className="ui icon input">
            <input
              type="text"
              name="query"
              placeholder="Search all stacks..."
            //   value={this.state.query}
            //   onChange={this.onChange.bind(this, 'query')}
            //   onKeyUp={this.doSearch}
            />
            <i className="search icon" />
          </div>
          <div className="results" />
        </div>
      )
  }
};
