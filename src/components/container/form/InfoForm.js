import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Yup from 'yup';

// this form is use for both purpose( create and update)
// Our inner form component which receives our form's state and updater methods as props
const InfoForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  handleReset,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="ui form">
      <div className="field">
        <label htmlFor="name">
          Field Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="type field name here, eg: Title, Description, Featured Image, Is Active"
            onChange={handleChange}
            onBlur={handleSubmit}
            value={values.name}
          />
          {touched.name &&
            errors.name && (
              <div className="ui pointing red basic label">{errors.name}</div>
            )}
        </label>
      </div>
      <div className="field">
        <label htmlFor="description">
          Field Description
          <input
            type="text"
            name="description"
            id="description"
            placeholder="type field description here"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          />
        </label>
      </div>
      <div className="field">
        <div className="ui checkbox">
          <input
            type="checkbox"
            name="isDisabled"
            checked={values.isDisabled}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label> Field Disabled</label>
        </div>
      </div>
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
    name: '',
    description: '',
    isDisabled: false,
  }),
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Item name is required!'),
    description: Yup.string(),
    isDisabled: Yup.boolean(),
  }),
  // Submission handler
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('INFO FORM submit', values);
    props.submit(values);
    setSubmitting(false);
  },
})(InfoForm);

InfoForm.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    isDisabled: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    name: PropTypes.bool,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
