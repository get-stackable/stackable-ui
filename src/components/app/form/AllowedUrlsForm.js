import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

// this form is use for both purpose( create and update)
// Our inner form component which receives our form's state and updater methods as props
const AllowedUrlsForm = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="field">
      <label htmlFor="allowedUrls">
        Allowed Urls
        <textarea
          rows="3"
          id="allowedUrls"
          value={values.allowedUrls}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </label>
    </div>
    <button className="ui button" type="submit" disabled={isSubmitting}>
      <i className="save icon" />
      Update
    </button>
  </form>
);

// Wrap our form with the using withFormik HoC
export default withFormik({
  // Transform outer props into form values
  mapPropsToValues: () => ({
    allowedUrls: '',
  }),
  // Add a custom validation function (this can be async too!)
  validate: values => {},
  // Submission handler
  handleSubmit: (values, { props, setSubmitting }) => {
    props.submit(values);
    setSubmitting(false);
  },
})(AllowedUrlsForm);

AllowedUrlsForm.propTypes = {
  values: PropTypes.shape({
    allowedUrls: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
