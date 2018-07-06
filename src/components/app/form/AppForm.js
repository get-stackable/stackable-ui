import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { isUndefined } from 'lodash';
import { ApolloConsumer } from 'react-apollo';

// this form is use for both purpose( create and update)
// Our inner form component which receives our form's state and updater methods as props
const AppForm = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  type,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="ui form">
      <div className="field">
        <label htmlFor="name">
          Stack Name
          <input
            type="text"
            name="name"
            placeholder="Stack Name"
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
      <ApolloConsumer>
        {client => (
          <button
            className="ui primary button"
            type="submit"
            disabled={isSubmitting}
            onClick={() => {
              client.writeData({
                data: {
                  stack: { __typename: 'Stack', modelVisible: false },
                },
              });
            }}
          >
            {type === 'create' && ' Create!'}
            {type === 'update' && ' Update!'}
            {type === 'clone' && ' Clone!'}
          </button>
        )}
      </ApolloConsumer>
    </div>
  </form>
);

// Wrap our form with the using withFormik HoC
export default withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({
    name: !isUndefined(props.app) ? props.app.name : '',
    description: !isUndefined(props.app) ? props.app.description : '',
  }),
  // Add a custom validation function (this can be async too!)
  validate: () => {},
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
  type: PropTypes.string.isRequired,
};
