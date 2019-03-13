import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions/index';

class StreamList extends Component {

  componentDidMount(){
    this.props.fetchStreams()
  }

  renderCreate(){
    if(this.props.isSignedIn){
      return (
          <div style={{textAlign: 'right'}}>
            <Link to="/streams/new" className="ui primary button">
              Create Stream
            </Link>
          </div>
      )
    }
  }

  renderAdmin(stream){
    if(stream.userId === this.props.currentUserId){
      return (
          <div className="right floated content">
            <Link to={`streams/edit/${stream.id}`} className="ui blue button">Edit</Link>
            <Link to={`streams/delete/${stream.id}`} className="ui red button">Delete</Link>
          </div>
      )
    }
  }

  renderList(){
    return this.props.streams.map( stream => {
      return(
          <div className="item" key={stream.id}>
            {this.renderAdmin(stream)}
              <i className="large middle aligned icon camera"></i>
              <div className="content">
                <div className="header">
                  <Link to={`streams/${stream.id}`}>
                    {stream.title}
                  </Link>
                </div>
                <div className="desciption">
                  {stream.description}
                </div>
              </div>
          </div>
      )
    })
  };


  render(){
    return(
        <div>
          <h2>Streams</h2>
          <div className="ui celled list">{this.renderList()}</div>
          {this.renderCreate()}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
};

export default connect(mapStateToProps, { fetchStreams }) (StreamList);