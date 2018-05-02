import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

// this form is use for both purpose( create and update)
// Our inner form component which receives our form's state and updater methods as props
const AppUpdateUserForm = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="ui right floated menu">
      <div className="ui form item">
        <div className="field">
          <input
            type="text"
            id="email"
            placeholder="User email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
        </div>
      </div>

      <div className="item">
        <button className="ui button" type="submit" disabled={isSubmitting}>
          add user
        </button>
      </div>
    </div>
  </form>
);

// Wrap our form with the using withFormik HoC
export default withFormik({
  // Transform outer props into form values
  mapPropsToValues: () => ({
    email: '',
  }),
  // Add a custom validation function (this can be async too!)
  validate: values => {},
  // Submission handler
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('submit', values);
    props.submit(values);
    setSubmitting(false);
  },
})(AppUpdateUserForm);

AppUpdateUserForm.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
