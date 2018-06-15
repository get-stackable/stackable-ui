import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

// import TextFieldValidations from './TextFieldValidations';
// import EnomFieldValidations from './EnomFieldValidations';

// const CustomValidationsFields = ({ validations, type }) => (
//   <React.Fragment>
//     {type === 'enom' ? (
//       <EnomFieldValidations values={validations} />
//     ) : (
//       <TextFieldValidations
//         value={this.state.validations}
//         showType={this.state.type === 'text'}
//       />
//     )}
//   </React.Fragment>
// );

// this form is use for both purpose( create and update)
// Our inner form component which receives our form's state and updater methods as props
const ValidationForm = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  customValidationsFields,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="ui form">
      <div className="field">
        <div className="ui checkbox">
          <input
            type="checkbox"
            name="isRequired"
            checked={values.isRequired}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="isRequired">Field Required</label>
        </div>
      </div>

      {customValidationsFields}

      <div className="ui divider" />
      <button
        className="ui primary button"
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </div>
  </form>
);

// Wrap our form with the using withFormik HoC
export default withFormik({
  // Transform outer props into form values
  mapPropsToValues: () => ({
    isRequired: false,
  }),
  // Add a custom validation function (this can be async too!)
  validate: () => {},
  // Submission handler
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('Validation submit', values);
    props.submit(values);
    setSubmitting(false);
  },
})(ValidationForm);

ValidationForm.propTypes = {
  values: PropTypes.shape({
    isRequired: PropTypes.bool,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  customValidationsFields: PropTypes.element.isRequired,
};
