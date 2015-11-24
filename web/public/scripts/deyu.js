
var CommentBox = React.createClass({
  
  // loadCommentsFromServer: function() {
  //   $.ajax({
  //     url: this.props.url,
  //     dataType: 'json',
  //     cache: false,
  //     success: function(data) {
  //       this.setState({data: data});
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       console.error(this.props.url, status, err.toString());
  //     }.bind(this)
  //   });
  // },
  handleCommentSubmit: function(comment) {
    $.ajax({
      url: this.props.url + 'push',
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        console.log('success');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
  },
  componentDidMount: function() {
  },
  render: function() {
    return (
      <div className="commentBox">
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var to = this.refs.to.value.trim();
    var message = this.refs.message.value.trim();
    if (!to || !message) {
      return;
    }
    this.props.onCommentSubmit({userId: to, message: message});
    this.refs.to.value = '';
    this.refs.message.value = '';
    return;
  },
  render: function() {
    return (
      <div className="commentForm">
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="To" ref="to" />
        <input type="text" placeholder="Say something..." ref="message" />
        <input type="submit" value="Post" />
      </form>
      </div>
    );
  }
});
ReactDOM.render(
  <CommentBox url="http://104.155.238.153:3000/"/>,
  document.getElementById('content')
);