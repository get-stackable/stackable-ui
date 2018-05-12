import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

// this form is use for both purpose( create and update)
// Our inner form component which receives our form's state and updater methods as props
const RelationForm = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="ui form">
      <div className="fields">
        <label>Relation Name</label>
        {/* {this.props.siblingContainers.map(container => ( */}
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="relation_id"
              // value={container.id}
              // checked={
              //   container.id === this.state.relations.relation_id
              //     ? 'checked'
              //     : false
              // }
              // onChange={e =>
              //   this.setState({
              //     relations: { relation_id: e.target.value },
              //   })
              // }
            />
            <label>container.name</label>
          </div>
        </div>
        {/* ))} */}
      </div>

      {/* {this.renderRelationFields()} */}
      <div className="ui divider" />
      <button
        className="ui primary button"
        type="submit"
        // onClick={this.handleSubmit}
      >
        Submit
      </button>
    </div>
  </form>
);

// Wrap our form with the using withFormik HoC
export default withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({
    itemName: '',
    description: '',
    isDisabled: false,
  }),
  // Add a custom validation function (this can be async too!)
  validate: () => {},
  // Submission handler
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('submit', values);
    // props.submit(values);
    setSubmitting(false);
  },
})(RelationForm);

RelationForm.propTypes = {
  values: PropTypes.shape({
    itemName: PropTypes.string,
    description: PropTypes.string,
    isDisabled: PropTypes.bool,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
