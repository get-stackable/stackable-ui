import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

// this form is use for both purpose( create and update)
// Our inner form component which receives our form's state and updater methods as props
const AppForm = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="ui form">
      <div className="field">
        <label htmlFor="name">
          Stack Name
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
        </label>
        {/* {touched.name && errors.name && <div>{errors.name}</div>} */}
      </div>
      <div className="field">
        <label htmlFor="name">
          Stack Description
          <input
            type="text"
            name="description"
            placeholder="Stack Description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          />
        </label>
        {/* {touched.description &&
          errors.description && <div>{errors.description}</div>} */}
      </div>
      <button
        className="ui primary button"
        type="submit"
        disabled={isSubmitting}
      >
        Create!
      </button>
    </div>
  </form>
);

// Wrap our form with the using withFormik HoC
export default withFormik({
  // Transform outer props into form values
  mapPropsToValues: app => ({
    name: app.name || '',
    description: app.description || '',
  }),
  // Add a custom validation function (this can be async too!)
  validate: values => {},
  // Submission handler
  handleSubmit: (values, { props, setSubmitting }) => {
    // console.log('submit', values);
    props.submit(values);
    setSubmitting(false);
  },
})(AppForm);

AppForm.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
