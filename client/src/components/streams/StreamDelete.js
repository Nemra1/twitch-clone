import React, { Component } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { deleteStream, fetchStream } from "../../actions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class StreamDelete extends Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  renderActions(){
    const id = this.props.match.params.id
    return(
        <React.Fragment>
          <button onClick={() => this.props.deleteStream(id)} className="ui red button">Delete</button>
          <Link to='/' className="ui primary button">Cancel</Link>
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

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);