import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends Component{


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
    this.props.createStream(formValues)
  };



  render(){
    return (
      <div>
        <h3>Create Stream</h3>
        <StreamForm onSubmit={this.onSubmit}/>
      </div>
    )
  }
};


export default connect(null, { createStream })(StreamCreate);