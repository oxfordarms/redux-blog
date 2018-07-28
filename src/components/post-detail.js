import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }
  
  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if(!post){
      return <div>Loading...</div>
    }

    return (
      <div>
        <div className="text-xs-right">
          <Link to="/" className="btn btn-primary">Back to List</Link>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete Post
          </button>
        </div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) { // 1st arg is state, 2nd arg is this.props
  return { post: posts[ownProps.match.params.id] };
}
export default connect(mapStateToProps, { fetchPost, deletePost })(PostDetail);