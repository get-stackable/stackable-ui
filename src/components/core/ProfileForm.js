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
}) => (
  <div className="ui form">
    <div className="field">
      <label>First Name</label>
      <input type="text" name="firstName" placeholder="First Name" />
    </div>
    <div className="field">
      <label>Last Name</label>
      <input type="text" name="lastName" placeholder="First Name" />
    </div>
    <div className="field">
      <label>Location</label>
      <input type="text" name="location" placeholder="Location" />
    </div>
    <div className="field">
      <label>About You</label>
      <textarea rows="3" name="about" placeholder="About You" />
    </div>
    {/* <div className="ui divider"></div>
  <div className="field">
      <label>Email</label>
      <input
          type="text"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={(e) => this.setState({email: e.target.value})} />
  </div> */}
    <button className="ui green button" type="submit">
      Submit
    </button>
  </div>
);

// Wrap our form with the using withFormik HoC
export default withFormik({
  // Transform outer props into form values
  mapPropsToValues: () => ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }),
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
    console.log('submit', values);
    props.submit(values);
    setSubmitting(false);
  },
})(InnerForm);
