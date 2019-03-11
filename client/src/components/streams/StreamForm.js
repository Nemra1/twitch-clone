import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';


class StreamForm extends Component{


  renderError = ({ error, touched }) => {
    if(error && touched){
      return (
          <div className="ui error message">
            <div className="error">
              {error}
            </div>
          </div>
      )
    }
  };

  renderInput = (formProps) => {
    const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`;
    return (
        <div className={className}>
          <label>{formProps.label}</label>
          <input {...formProps.input} autoComplete="off"/>
          {this.renderError(formProps.meta)}
        </div>
    )
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues)
  };



  render(){
    return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
          <Field name="title" component={this.renderInput} label="Enter Title" />
          <Field name="description" component={this.renderInput} label="Enter Description"/>
          <button className="ui button primary">SUBMIT</button>
        </form>
    )
  }
};


const validate = (formValues) => {
  const errors = {};
  if(!formValues.title){
    errors.title = "You must create title"
  }
  if(!formValues.description) {
    errors.description = "You must create description"
  }
  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate: validate
})(StreamForm);

