import React from 'react';
import { withFormik } from 'formik';

// Our inner form component which receives our form's state and updater methods as props
const InnerForm = ({
  values,
  // errors,
  // touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  loading,
}) => (
  <form onSubmit={handleSubmit} className="ui large form">
    <div className="ui segment" style={{ padding: '1rem 5rem' }}>
      <div className="at-input required field">
        <label style={{ float: 'left' }}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
      </div>
      <div className="field">
        <label style={{ float: 'left' }}>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
      </div>
      <div className="ui grid">
        <div className="eight wide column">
          <a href="#" className="at-link at-signup">
            Reset password
          </a>
        </div>
        <div className=" eight wide column">
          <button
            className={`at-btn ui ${loading &&
              'loading'} right floated large orange button`}
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </form>
);

// Wrap our form with the using withFormik HoC
export default withFormik({
  // Transform outer props into form values
  mapPropsToValues: () => ({ email: '', password: '' }),
  // Add a custom validation function (this can be async too!)
  validate: values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  },
  // Submission handler
  handleSubmit: (values, { props, setSubmitting }) => {
    // console.log('submit', values);
    props.submit(values);
    setSubmitting(false);
  },
})(InnerForm);
