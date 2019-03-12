import React, { Component } from 'react';
import Modal from '../Modal';
// import deleteStream from '../actions';
import { fetchStream } from '../../actions';
import history from '../../history';
import { connect } from 'react-redux';


class StreamDelete extends Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  renderActions(){
    return(
        <React.Fragment>
          <button className="ui primary button">Delete</button>
          <button className="ui red button">Cancel</button>
        </React.Fragment>
    );
  }

  renderContent(){
    if(!this.props.stream){
      return 'Are you sure you want to delete this stream?'
    }
    return (
        `Are you sure you want to delete stream: ${this.props.stream.title}?`
    )
  }

  render(){

    return(
        <Modal
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={()=> history.push('/')}
        />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  return {
        stream: state.streams[ownProps.match.params.id]
      }

};

export default connect(mapStateToProps, { fetchStream })(StreamDelete);