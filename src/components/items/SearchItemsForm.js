import React from 'react';
// import PropTypes from 'prop-types';

class SearchItemsForm extends React.Component {

// TODO:    
//  PropTypes = {
//       containers:PropTypes.array.isRequired,
//       doSearch: PropTypes.func.isRequired
//   };

//   constructor(props) {
//       super(props);

//       this.state = {
//           query: null
//       };
//   }

//   componentDidMount() {
//       $('.ui.dropdown.refine')
//           .dropdown('set text', FlowRouter.getQueryParam('containerId'))
//           .dropdown({
//               onChange(text) {
//                   FlowRouter.setQueryParams({containerId: text});
//               }
//           });
//   }

//   onChange(inputName, e) {
//       const change = {};
//       change[inputName] = e.target.value;
//       this.setState(change);
//   };

//   doSearch = (e) => {
//       const ENTER = 13;

//       if (e.keyCode == ENTER) {
//           this.props.doSearch(this.state.query.length > 0 ? this.state.query : null);
//       }
//   };

  render() {
      return (
        <div className="ui search big">
          <div className="ui icon input">
            <input
              type="text"
              name="query"
              placeholder="Search items..."
              value={this.state.query}
            //   onChange={this.onChange.bind(this, 'query')}
              onKeyUp={this.doSearch}
            />
            <i className="search icon" />
          </div>
          <div className="results" />
          <div className="ui dropdown refine">
            <div className="text">refine results</div>
            <i className="dropdown icon" />
            <div className="menu">
              {this.props.containers.map((container) => (
                <div key={container.id} className="item" data-value={container.id}>{container.name}</div>
             ))}
            </div>
          </div>
        </div>
      )
  }
};

export default SearchItemsForm;
