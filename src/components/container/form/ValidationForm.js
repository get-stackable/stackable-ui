import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

// this form is use for both purpose( create and update)
// Our inner form component which receives our form's state and updater methods as props
const ValidationForm = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="ui form">
      <div className="field">
        <div className="ui checkbox">
          <input
            type="checkbox"
            name="isRequired"
            // checked={this.state.isRequired}
            // onChange={e => this.setState({ isRequired: e.target.checked })}
          />
          <label>Field Required</label>
        </div>
      </div>

      {/* {customValidationsFields} */}

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
})(ValidationForm);

ValidationForm.propTypes = {
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
