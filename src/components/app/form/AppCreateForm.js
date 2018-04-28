import React from 'react';
import { withFormik } from 'formik';

// Our inner form component which receives our form's state and updater methods as props
const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="ui form">
      <div className="field">
        <label htmlFor="name">Stack Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
      </div>
      <div className="field">
        <label>Stack Description</label>
        <input
          type="text"
          name="description"
          placeholder="Stack Description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
        />
      </div>
      <button className="ui primary button" type="submit" disabled={isSubmitting}>
              Create!
      </button>
    </div>
  </form>

);

// Wrap our form with the using withFormik HoC
export default withFormik({
  // Transform outer props into form values
  mapPropsToValues: () => ({ name: '', description: '' }),
  // Add a custom validation function (this can be async too!)
  validate: (values) => {},
  // Submission handler
  handleSubmit: (
    values,
    {
      props,
      setSubmitting,
    },
  ) => {
    console.log('submit', values);
    // props.submit(values);
    setSubmitting(false);
  },
})(InnerForm);
